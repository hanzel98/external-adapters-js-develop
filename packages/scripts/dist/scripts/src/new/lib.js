"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-var-requires */
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const path = tslib_1.__importStar(require("path"));
const shell = tslib_1.__importStar(require("shelljs"));
const workspace_1 = require("../workspace");
const { red, blue } = chalk_1.default;
const { log } = console;
const ADAPTER_TYPES = ['composite', 'source'];
function writeJson(data) {
    const files = Object.keys(data);
    // write to each file
    files.forEach((f) => {
        let contents = data[f];
        if (f.includes('.json')) {
            contents = JSON.stringify(contents, null, 2);
        }
        shell.ShellString(contents).to(f);
    });
    // resolve workspace and format modified files
    shell.exec(`yarn && yarn prettier --write ${files.join(' ')}`);
}
function checks() {
    const type = process.argv[2];
    if (!type)
        throw red.bold('Missing first argument: type');
    if (!ADAPTER_TYPES.includes(type))
        throw red.bold(`Type must be one of: ${ADAPTER_TYPES.join(', ')}`);
    const n = process.argv[3];
    if (!n)
        throw red.bold('Missing second argument: name');
    // check if jq is installed (jq used later to modify json files)
    const jq = shell.exec('command -v jq').toString();
    if (!jq)
        throw red.bold('jq is not installed');
    return { type, n };
}
function copyFiles(type, n) {
    // copying files
    shell.mkdir(`packages/${type}s/${n}`);
    shell.cp('-R', `packages/examples/${type}/*`, `packages/${type}s/${n}`);
    // editing adapter package.json
    shell
        .cat(`packages/${type}s/${n}/package.json`)
        .exec(`jq '.name = "@chainlink/${n}-adapter" | .description = "Chainlink ${n} adapter." | .keywords += ["${n}"]'`)
        .exec(`tee packages/${type}s/${n}/package.json`)
        .to(`packages/${type}s/${n}/package.json`);
    // changing README to use the adapter name instead of example
    const nCap = n[0].toUpperCase() + n.slice(1);
    shell.sed('-i', 'Example', nCap, `packages/${type}s/${n}/README.md`);
}
function tsconfGenerate(packages, filepath, slice = 0) {
    return packages.map((w) => {
        return { path: path.relative(filepath, w.location).slice(slice) }; //removes first '.'
    });
}
async function generate(type) {
    let writeData = {}; // data struct for writing
    // pull latest workspace data after files have been generated
    let currentWorkspace = workspace_1.getWorkspacePackages(['scripts', 'core']); //using this alphabetizes everything
    currentWorkspace = currentWorkspace.filter((w) => w.name !== '@chainlink/types'); //filter out package
    const adapterList = currentWorkspace.filter((w) => w.type === `${type}s`);
    // add to packages/tsconfig.json
    const tsconfigPath = 'packages/tsconfig.json';
    const tsconfig = JSON.parse(JSON.stringify(require(path.relative(__dirname, tsconfigPath))));
    console.log(tsconfig);
    tsconfig.references = tsconfGenerate(currentWorkspace, tsconfigPath, 1);
    writeData = { ...writeData, [tsconfigPath]: tsconfig };
    // add to ea legos package for source adapters
    if (type === 'source') {
        const legosPath = 'packages/core/legos';
        // update legos/tsconfig.json
        const legoTsconfigPath = `${legosPath}/tsconfig.json`;
        const legoTsconfig = JSON.parse(JSON.stringify(require(path.relative(__dirname, legoTsconfigPath))));
        legoTsconfig.references = tsconfGenerate(adapterList, legosPath);
        writeData = { ...writeData, [legoTsconfigPath]: legoTsconfig };
        // update legos/package.json
        const legoPackagePath = `${legosPath}/package.json`;
        const legoPackage = JSON.parse(JSON.stringify(require(path.relative(__dirname, legoPackagePath))));
        const otherPackages = Object.keys(legoPackage.dependencies)
            .filter((k) => !(k.includes('@chainlink') && k.includes('adapter')))
            .reduce((obj, key) => {
            return { ...obj, [key]: legoPackage.dependencies[key] };
        }, {}); // capture other dependencies (non-adapter)
        legoPackage.dependencies = adapterList.reduce((obj, adapter) => {
            return { ...obj, [adapter.name]: '*' };
        }, otherPackages);
        writeData = { ...writeData, [legoPackagePath]: legoPackage };
        // updating legos/src/sources.ts
        // (not using workspaces because some have custom/non-standardized naming structures)
        const legoSourcePath = `${legosPath}/src/sources.ts`;
        let output = shell.cat(legoSourcePath).split('\n');
        const index = output.indexOf('');
        const importEa = output.slice(0, index);
        const exportEa = output.slice(index).filter((e) => e !== '' && e !== '}' && !e.includes('{'));
        // checks adapter list for newly generated adapters and adds to the list if not already present
        adapterList.forEach((a) => {
            if (!importEa.join().includes(a.name)) {
                const name = a.name.replace('@chainlink/', '').replace('-adapter', '');
                const nameNoDash = name.replace(/-/g, '_'); // /g to apply to whole string not just first instance
                importEa.push(`import * as ${nameNoDash} from '@chainlink/${name}-adapter'`);
                exportEa.push(`  ${nameNoDash},`);
            }
        });
        output = [...importEa.sort(), '', 'export default {', ...exportEa.sort(), '}']; // create new file with alphabetically sorted EAs
        writeData = { ...writeData, [legoSourcePath]: output.join('\n') };
    }
    return writeData;
}
async function main() {
    log(blue.bold('Running input checks'));
    const inputs = checks();
    log(blue.bold(`Copying example ${inputs.type} adapter to ${inputs.type}/${inputs.n}`));
    copyFiles(inputs.type, inputs.n);
    log(blue.bold('Regenerating tsconfig and lego files'));
    const data = await generate(inputs.type);
    log(blue.bold('Resolving workspace and running prettier'));
    writeJson(data);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25ldy9saWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHVEQUF1RDtBQUN2RCwwREFBeUI7QUFDekIsbURBQTRCO0FBQzVCLHVEQUFnQztBQUNoQyw0Q0FBcUU7QUFDckUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxlQUFLLENBQUE7QUFDM0IsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQTtBQUV2QixNQUFNLGFBQWEsR0FBRyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQU83QyxTQUFTLFNBQVMsQ0FBQyxJQUFTO0lBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFL0IscUJBQXFCO0lBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNsQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEIsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZCLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDN0M7UUFDRCxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNuQyxDQUFDLENBQUMsQ0FBQTtJQUVGLDhDQUE4QztJQUM5QyxLQUFLLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNoRSxDQUFDO0FBRUQsU0FBUyxNQUFNO0lBQ2IsTUFBTSxJQUFJLEdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNwQyxJQUFJLENB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SSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUE7S0FDbEU7SUFDRCxPQUFPLFNBQVMsQ0FBQTtBQUNsQixDQUFDO0FBRU0sS0FBSyxVQUFVLElBQUk7SUFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFBO0lBQ3RDLE1BQU0sTUFBTSxHQUFXLE1BQU0sRUFBRSxDQUFBO0lBRS9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixNQUFNLENBQUMsSUFBSSxlQUFlLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN0RixTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxDQUFBO0lBQ3RELE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUV4QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLENBQUE7SUFDMUQsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2pCLENBQUM7QUFaRCxvQkFZQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXMgKi9cbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCAqIGFzIHNoZWxsIGZyb20gJ3NoZWxsanMnXG5pbXBvcnQgeyBnZXRXb3Jrc3BhY2VQYWNrYWdlcywgV29ya3NwYWNlUGFja2FnZSB9IGZyb20gJy4uL3dvcmtzcGFjZSdcbmNvbnN0IHsgcmVkLCBibHVlIH0gPSBjaGFsa1xuY29uc3QgeyBsb2cgfSA9IGNvbnNvbGVcblxuY29uc3QgQURBUFRFUl9UWVBFUyA9IFsnY29tcG9zaXRlJywgJ3NvdXJjZSddXG5cbmludGVyZmFjZSBJbnB1dHMge1xuICB0eXBlOiBzdHJpbmdcbiAgbjogc3RyaW5nXG59XG5cbmZ1bmN0aW9uIHdyaXRlSnNvbihkYXRhOiBhbnkpIHtcbiAgY29uc3QgZmlsZXMgPSBPYmplY3Qua2V5cyhkYXRhKVxuXG4gIC8vIHdyaXRlIHRvIGVhY2ggZmlsZVxuICBmaWxlcy5mb3JFYWNoKChmKSA9PiB7XG4gICAgbGV0IGNvbnRlbnRzID0gZGF0YVtmXVxuICAgIGlmIChmLmluY2x1ZGVzKCcuanNvbicpKSB7XG4gICAgICBjb250ZW50cyA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnRzLCBudWxsLCAyKVxuICAgIH1cbiAgICBzaGVsbC5TaGVsbFN0cmluZyhjb250ZW50cykudG8oZilcbiAgfSlcblxuICAvLyByZXNvbHZlIHdvcmtzcGFjZSBhbmQgZm9ybWF0IG1vZGlmaWVkIGZpbGVzXG4gIHNoZWxsLmV4ZWMoYHlhcm4gJiYgeWFybiBwcmV0dGllciAtLXdyaXRlICR7ZmlsZXMuam9pbignICcpfWApXG59XG5cbmZ1bmN0aW9uIGNoZWNrcygpOiBJbnB1dHMge1xuICBjb25zdCB0eXBlOiBzdHJpbmcgPSBwcm9jZXNzLmFyZ3ZbMl1cbiAgaWYgKCF0eXBlKSB0aHJvdyByZWQuYm9sZCgnTWlzc2luZyBmaXJzdCBhcmd1bWVudDogdHlwZScpXG4gIGlmICghQURBUFRFUl9UWVBFUy5pbmNsdWRlcyh0eXBlKSlcbiAgICB0aHJvdyByZWQuYm9sZChgVHlwZSBtdXN0IGJlIG9uZSBvZjogJHtBREFQVEVSX1RZUEVTLmpvaW4oJywgJyl9YClcblxuICBjb25zdCBuOiBzdHJpbmcgPSBwcm9jZXNzLmFyZ3ZbM11cbiAgaWYgKCFuKSB0aHJvdyByZWQuYm9sZCgnTWlzc2luZyBzZWNvbmQgYXJndW1lbnQ6IG5hbWUnKVxuXG4gIC8vIGNoZWNrIGlmIGpxIGlzIGluc3RhbGxlZCAoanEgdXNlZCBsYXRlciB0byBtb2RpZnkganNvbiBmaWxlcylcbiAgY29uc3QganE6IHN0cmluZyA9IHNoZWxsLmV4ZWMoJ2NvbW1hbmQgLXYganEnKS50b1N0cmluZygpXG4gIGlmICghanEpIHRocm93IHJlZC5ib2xkKCdqcSBpcyBub3QgaW5zdGFsbGVkJylcblxuICByZXR1cm4geyB0eXBlLCBuIH1cbn1cblxuZnVuY3Rpb24gY29weUZpbGVzKHR5cGU6IHN0cmluZywgbjogc3RyaW5nKSB7XG4gIC8vIGNvcHlpbmcgZmlsZXNcbiAgc2hlbGwubWtkaXIoYHBhY2thZ2VzLyR7dHlwZX1zLyR7bn1gKVxuICBzaGVsbC5jcCgnLVInLCBgcGFja2FnZXMvZXhhbXBsZXMvJHt0eXBlfS8qYCwgYHBhY2thZ2VzLyR7dHlwZX1zLyR7bn1gKVxuXG4gIC8vIGVkaXRpbmcgYWRhcHRlciBwYWNrYWdlLmpzb25cbiAgc2hlbGxcbiAgICAuY2F0KGBwYWNrYWdlcy8ke3R5cGV9cy8ke259L3BhY2thZ2UuanNvbmApXG4gICAgLmV4ZWMoXG4gICAgICBganEgJy5uYW1lID0gXCJAY2hhaW5saW5rLyR7bn0tYWRhcHRlclwiIHwgLmRlc2NyaXB0aW9uID0gXCJDaGFpbmxpbmsgJHtufSBhZGFwdGVyLlwiIHwgLmtleXdvcmRzICs9IFtcIiR7bn1cIl0nYCxcbiAgICApXG4gICAgLmV4ZWMoYHRlZSBwYWNrYWdlcy8ke3R5cGV9cy8ke259L3BhY2thZ2UuanNvbmApXG4gICAgLnRvKGBwYWNrYWdlcy8ke3R5cGV9cy8ke259L3BhY2thZ2UuanNvbmApXG5cbiAgLy8gY2hhbmdpbmcgUkVBRE1FIHRvIHVzZSB0aGUgYWRhcHRlciBuYW1lIGluc3RlYWQgb2YgZXhhbXBsZVxuICBjb25zdCBuQ2FwOiBzdHJpbmcgPSBuWzBdLnRvVXBwZXJDYXNlKCkgKyBuLnNsaWNlKDEpXG4gIHNoZWxsLnNlZCgnLWknLCAnRXhhbXBsZScsIG5DYXAsIGBwYWNrYWdlcy8ke3R5cGV9cy8ke259L1JFQURNRS5tZGApXG59XG5cbmZ1bmN0aW9uIHRzY29uZkdlbmVyYXRlKHBhY2thZ2VzOiBXb3Jrc3BhY2VQYWNrYWdlW10sIGZpbGVwYXRoOiBzdHJpbmcsIHNsaWNlID0gMCkge1xuICByZXR1cm4gcGFja2FnZXMubWFwKCh3OiBXb3Jrc3BhY2VQYWNrYWdlKSA9PiB7XG4gICAgcmV0dXJuIHsgcGF0aDogcGF0aC5yZWxhdGl2ZShmaWxlcGF0aCwgdy5sb2NhdGlvbikuc2xpY2Uoc2xpY2UpIH0gLy9yZW1vdmVzIGZpcnN0ICcuJ1xuICB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZSh0eXBlOiBzdHJpbmcpIHtcbiAgbGV0IHdyaXRlRGF0YSA9IHt9IC8vIGRhdGEgc3RydWN0IGZvciB3cml0aW5nXG5cbiAgLy8gcHVsbCBsYXRlc3Qgd29ya3NwYWNlIGRhdGEgYWZ0ZXIgZmlsZXMgaGF2ZSBiZWVuIGdlbmVyYXRlZFxuICBsZXQgY3VycmVudFdvcmtzcGFjZTogV29ya3NwYWNlUGFja2FnZVtdID0gZ2V0V29ya3NwYWNlUGFja2FnZXMoWydzY3JpcHRzJywgJ2NvcmUnXSkgLy91c2luZyB0aGlzIGFscGhhYmV0aXplcyBldmVyeXRoaW5nXG4gIGN1cnJlbnRXb3Jrc3BhY2UgPSBjdXJyZW50V29ya3NwYWNlLmZpbHRlcigodykgPT4gdy5uYW1lICE9PSAnQGNoYWlubGluay90eXBlcycpIC8vZmlsdGVyIG91dCBwYWNrYWdlXG4gIGNvbnN0IGFkYXB0ZXJMaXN0ID0gY3VycmVudFdvcmtzcGFjZS5maWx0ZXIoKHcpID0+IHcudHlwZSA9PT0gYCR7dHlwZX1zYClcblxuICAvLyBhZGQgdG8gcGFja2FnZXMvdHNjb25maWcuanNvblxuICBjb25zdCB0c2NvbmZpZ1BhdGggPSAncGFja2FnZXMvdHNjb25maWcuanNvbidcbiAgY29uc3QgdHNjb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcXVpcmUocGF0aC5yZWxhdGl2ZShfX2Rpcm5hbWUsIHRzY29uZmlnUGF0aCkpKSlcbiAgY29uc29sZS5sb2codHNjb25maWcpXG4gIHRzY29uZmlnLnJlZmVyZW5jZXMgPSB0c2NvbmZHZW5lcmF0ZShjdXJyZW50V29ya3NwYWNlLCB0c2NvbmZpZ1BhdGgsIDEpXG4gIHdyaXRlRGF0YSA9IHsgLi4ud3JpdGVEYXRhLCBbdHNjb25maWdQYXRoXTogdHNjb25maWcgfVxuXG4gIC8vIGFkZCB0byBlYSBsZWdvcyBwYWNrYWdlIGZvciBzb3VyY2UgYWRhcHRlcnNcbiAgaWYgKHR5cGUgPT09ICdzb3VyY2UnKSB7XG4gICAgY29uc3QgbGVnb3NQYXRoID0gJ3BhY2thZ2VzL2NvcmUvbGVnb3MnXG5cbiAgICAvLyB1cGRhdGUgbGVnb3MvdHNjb25maWcuanNvblxuICAgIGNvbnN0IGxlZ29Uc2NvbmZpZ1BhdGggPSBgJHtsZWdvc1BhdGh9L3RzY29uZmlnLmpzb25gXG4gICAgY29uc3QgbGVnb1RzY29uZmlnID0gSlNPTi5wYXJzZShcbiAgICAgIEpTT04uc3RyaW5naWZ5KHJlcXVpcmUocGF0aC5yZWxhdGl2ZShfX2Rpcm5hbWUsIGxlZ29Uc2NvbmZpZ1BhdGgpKSksXG4gICAgKVxuICAgIGxlZ29Uc2NvbmZpZy5yZWZlcmVuY2VzID0gdHNjb25mR2VuZXJhdGUoYWRhcHRlckxpc3QsIGxlZ29zUGF0aClcbiAgICB3cml0ZURhdGEgPSB7IC4uLndyaXRlRGF0YSwgW2xlZ29Uc2NvbmZpZ1BhdGhdOiBsZWdvVHNjb25maWcgfVxuXG4gICAgLy8gdXBkYXRlIGxlZ29zL3BhY2thZ2UuanNvblxuICAgIGNvbnN0IGxlZ29QYWNrYWdlUGF0aCA9IGAke2xlZ29zUGF0aH0vcGFja2FnZS5qc29uYFxuICAgIGNvbnN0IGxlZ29QYWNrYWdlID0gSlNPTi5wYXJzZShcbiAgICAgIEpTT04uc3RyaW5naWZ5KHJlcXVpcmUocGF0aC5yZWxhdGl2ZShfX2Rpcm5hbWUsIGxlZ29QYWNrYWdlUGF0aCkpKSxcbiAgICApXG4gICAgY29uc3Qgb3RoZXJQYWNrYWdlcyA9IE9iamVjdC5rZXlzKGxlZ29QYWNrYWdlLmRlcGVuZGVuY2llcylcbiAgICAgIC5maWx0ZXIoKGspID0+ICEoay5pbmNsdWRlcygnQGNoYWlubGluaycpICYmIGsuaW5jbHVkZXMoJ2FkYXB0ZXInKSkpXG4gICAgICAucmVkdWNlKChvYmosIGtleSkgPT4ge1xuICAgICAgICByZXR1cm4geyAuLi5vYmosIFtrZXldOiBsZWdvUGFja2FnZS5kZXBlbmRlbmNpZXNba2V5XSB9XG4gICAgICB9LCB7fSkgLy8gY2FwdHVyZSBvdGhlciBkZXBlbmRlbmNpZXMgKG5vbi1hZGFwdGVyKVxuICAgIGxlZ29QYWNrYWdlLmRlcGVuZGVuY2llcyA9IGFkYXB0ZXJMaXN0LnJlZHVjZSgob2JqLCBhZGFwdGVyKSA9PiB7XG4gICAgICByZXR1cm4geyAuLi5vYmosIFthZGFwdGVyLm5hbWVdOiAnKicgfVxuICAgIH0sIG90aGVyUGFja2FnZXMpXG4gICAgd3JpdGVEYXRhID0geyAuLi53cml0ZURhdGEsIFtsZWdvUGFja2FnZVBhdGhdOiBsZWdvUGFja2FnZSB9XG5cbiAgICAvLyB1cGRhdGluZyBsZWdvcy9zcmMvc291cmNlcy50c1xuICAgIC8vIChub3QgdXNpbmcgd29ya3NwYWNlcyBiZWNhdXNlIHNvbWUgaGF2ZSBjdXN0b20vbm9uLXN0YW5kYXJkaXplZCBuYW1pbmcgc3RydWN0dXJlcylcbiAgICBjb25zdCBsZWdvU291cmNlUGF0aCA9IGAke2xlZ29zUGF0aH0vc3JjL3NvdXJjZXMudHNgXG4gICAgbGV0IG91dHB1dCA9IHNoZWxsLmNhdChsZWdvU291cmNlUGF0aCkuc3BsaXQoJ1xcbicpXG4gICAgY29uc3QgaW5kZXggPSBvdXRwdXQuaW5kZXhPZignJylcbiAgICBjb25zdCBpbXBvcnRFYSA9IG91dHB1dC5zbGljZSgwLCBpbmRleClcbiAgICBjb25zdCBleHBvcnRFYSA9IG91dHB1dC5zbGljZShpbmRleCkuZmlsdGVyKChlKSA9PiBlICE9PSAnJyAmJiBlICE9PSAnfScgJiYgIWUuaW5jbHVkZXMoJ3snKSlcblxuICAgIC8vIGNoZWNrcyBhZGFwdGVyIGxpc3QgZm9yIG5ld2x5IGdlbmVyYXRlZCBhZGFwdGVycyBhbmQgYWRkcyB0byB0aGUgbGlzdCBpZiBub3QgYWxyZWFkeSBwcmVzZW50XG4gICAgYWRhcHRlckxpc3QuZm9yRWFjaCgoYSkgPT4ge1xuICAgICAgaWYgKCFpbXBvcnRFYS5qb2luKCkuaW5jbHVkZXMoYS5uYW1lKSkge1xuICAgICAgICBjb25zdCBuYW1lID0gYS5uYW1lLnJlcGxhY2UoJ0BjaGFpbmxpbmsvJywgJycpLnJlcGxhY2UoJy1hZGFwdGVyJywgJycpXG4gICAgICAgIGNvbnN0IG5hbWVOb0Rhc2ggPSBuYW1lLnJlcGxhY2UoLy0vZywgJ18nKSAvLyAvZyB0byBhcHBseSB0byB3aG9sZSBzdHJpbmcgbm90IGp1c3QgZmlyc3QgaW5zdGFuY2VcblxuICAgICAgICBpbXBvcnRFYS5wdXNoKGBpbXBvcnQgKiBhcyAke25hbWVOb0Rhc2h9IGZyb20gJ0BjaGFpbmxpbmsvJHtuYW1lfS1hZGFwdGVyJ2ApXG4gICAgICAgIGV4cG9ydEVhLnB1c2goYCAgJHtuYW1lTm9EYXNofSxgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvdXRwdXQgPSBbLi4uaW1wb3J0RWEuc29ydCgpLCAnJywgJ2V4cG9ydCBkZWZhdWx0IHsnLCAuLi5leHBvcnRFYS5zb3J0KCksICd9J10gLy8gY3JlYXRlIG5ldyBmaWxlIHdpdGggYWxwaGFiZXRpY2FsbHkgc29ydGVkIEVBc1xuICAgIHdyaXRlRGF0YSA9IHsgLi4ud3JpdGVEYXRhLCBbbGVnb1NvdXJjZVBhdGhdOiBvdXRwdXQuam9pbignXFxuJykgfVxuICB9XG4gIHJldHVybiB3cml0ZURhdGFcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIGxvZyhibHVlLmJvbGQoJ1J1bm5pbmcgaW5wdXQgY2hlY2tzJykpXG4gIGNvbnN0IGlucHV0czogSW5wdXRzID0gY2hlY2tzKClcblxuICBsb2coYmx1ZS5ib2xkKGBDb3B5aW5nIGV4YW1wbGUgJHtpbnB1dHMudHlwZX0gYWRhcHRlciB0byAke2lucHV0cy50eXBlfS8ke2lucHV0cy5ufWApKVxuICBjb3B5RmlsZXMoaW5wdXRzLnR5cGUsIGlucHV0cy5uKVxuXG4gIGxvZyhibHVlLmJvbGQoJ1JlZ2VuZXJhdGluZyB0c2NvbmZpZyBhbmQgbGVnbyBmaWxlcycpKVxuICBjb25zdCBkYXRhID0gYXdhaXQgZ2VuZXJhdGUoaW5wdXRzLnR5cGUpXG5cbiAgbG9nKGJsdWUuYm9sZCgnUmVzb2x2aW5nIHdvcmtzcGFjZSBhbmQgcnVubmluZyBwcmV0dGllcicpKVxuICB3cml0ZUpzb24oZGF0YSlcbn1cbiJdfQ==