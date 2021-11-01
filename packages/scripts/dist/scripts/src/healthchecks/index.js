"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const fs_1 = require("fs");
const path_1 = require("path");
const workspace_1 = require("../workspace");
const failed = require('./staging.failed.json');
const success = require('./staging.success.json');
async function main() {
    const pkgs = workspace_1.getWorkspacePackages();
    const merged = [...failed, ...success];
    for (const pkg of pkgs) {
        const strippedName = pkg.descopedName.replace('-adapter', '');
        const matchingNames = [
            pkg.descopedName,
            strippedName,
            strippedName + 'gas',
            strippedName.replace('-', ''),
            strippedName.replace('gasprice', 'gas'),
            strippedName.replace('-', '').replace('gasprice', 'gas'),
            strippedName.replace('.', '').replace('gasprice', 'gas'),
            strippedName.replace('.', ''),
        ];
        switch (pkg.type) {
            case 'sources': {
                let matchingReq;
                for (const name of matchingNames) {
                    matchingReq = merged.find((c) => c.name === name);
                    if (matchingReq)
                        break;
                }
                if (!matchingReq) {
                    console.warn(`could not find matching source adapter for ${matchingNames[1]}`);
                    break;
                }
                if (!merged.find((c) => c.name === matchingNames[1])) {
                    console.warn(`the adapter with a service name of ${matchingReq?.name || matchingReq?.serviceName} does not align with the package name of ${matchingNames[1]}`);
                }
                writePayload(pkg, matchingReq);
                break;
            }
            case 'composites': {
                let matchingReq;
                const stripEndingWord = (str) => str.split('-').slice(0, -1).join('-');
                for (const name of matchingNames) {
                    matchingReq = merged.find((c) => stripEndingWord(c.name) === name);
                    if (matchingReq)
                        break;
                }
                if (!matchingReq) {
                    console.warn(`could not find matching composite adapter for ${matchingNames[1]}`);
                    break;
                }
                if (!merged.find((c) => stripEndingWord(c.name) === matchingNames[1])) {
                    console.warn(`the adapter with a service name of ${stripEndingWord(matchingReq?.name || matchingReq?.serviceName)} does not align with the package name of ${matchingNames[1]}`);
                }
                writePayload(pkg, matchingReq);
                break;
            }
            case 'targets': {
                break;
            }
        }
    }
}
main();
function writePayload(pkg, matchingReq) {
    fs_1.writeFileSync(path_1.join(pkg.location, 'test-payload.json'), JSON.stringify({
        request: matchingReq.requestParams,
    }, null, 1));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvaGVhbHRoY2hlY2tzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXVEO0FBQ3ZELDJCQUFrQztBQUNsQywrQkFBMkI7QUFDM0IsNENBQXFFO0FBQ3JFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQy9DLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO0FBRWpELEtBQUssVUFBVSxJQUFJO0lBQ2pCLE1BQU0sSUFBSSxHQUFHLGdDQUFvQixFQUFFLENBQUE7SUFDbkMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFBO0lBQ3RDLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ3RCLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUM3RCxNQUFNLGFBQWEsR0FBRztZQUNwQixHQUFHLENBQUMsWUFBWTtZQUNoQixZQUFZO1lBQ1osWUFBWSxHQUFHLEtBQUs7WUFDcEIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQzdCLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztZQUN2QyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztZQUN4RCxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztZQUN4RCxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7U0FDOUIsQ0FBQTtRQUVELFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRTtZQUNoQixLQUFLLFNBQVMsQ0FBQyxDQUFDO2dCQUNkLElBQUksV0FBVyxDQUFBO2dCQUNmLEtBQUssTUFBTSxJQUFJLElBQUksYUFBYSxFQUFFO29CQUNoQyxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQTtvQkFDakQsSUFBSSxXQUFXO3dCQUFFLE1BQUs7aUJBQ3ZCO2dCQUNELElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsOENBQThDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQzlFLE1BQUs7aUJBQ047Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQ1Ysc0NBQ0UsV0FBVyxFQUFFLElBQUksSUFBSSxXQUFXLEVBQUUsV0FDcEMsNENBQTRDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUMvRCxDQUFBO2lCQUNGO2dCQUNELFlBQVksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUE7Z0JBRTlCLE1BQUs7YUFDTjtZQUNELEtBQUssWUFBWSxDQUFDLENBQUM7Z0JBQ2pCLElBQUksV0FBVyxDQUFBO2dCQUNmLE1BQU0sZUFBZSxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzlFLEtBQUssTUFBTSxJQUFJLElBQUksYUFBYSxFQUFFO29CQUNoQyxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQTtvQkFDbEUsSUFBSSxXQUFXO3dCQUFFLE1BQUs7aUJBQ3ZCO2dCQUNELElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsaURBQWlELGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQ2pGLE1BQUs7aUJBQ047Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3JFLE9BQU8sQ0FBQyxJQUFJLENBQ1Ysc0NBQXNDLGVBQWUsQ0FDbkQsV0FBVyxFQUFFLElBQUksSUFBSSxXQUFXLEVBQUUsV0FBVyxDQUM5Qyw0Q0FBNEMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ2hFLENBQUE7aUJBQ0Y7Z0JBQ0QsWUFBWSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQTtnQkFFOUIsTUFBSzthQUNOO1lBQ0QsS0FBSyxTQUFTLENBQUMsQ0FBQztnQkFDZCxNQUFLO2FBQ047U0FDRjtLQUNGO0FBQ0gsQ0FBQztBQUVELElBQUksRUFBRSxDQUFBO0FBSU4sU0FBUyxZQUFZLENBQUMsR0FBcUIsRUFBRSxXQUE0QjtJQUN2RSxrQkFBYSxDQUNYLFdBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLG1CQUFtQixDQUFDLEVBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQ1o7UUFDRSxPQUFPLEVBQUUsV0FBVyxDQUFDLGFBQWE7S0FDbkMsRUFDRCxJQUFJLEVBQ0osQ0FBQyxDQUNGLENBQ0YsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzICovXG5pbXBvcnQgeyB3cml0ZUZpbGVTeW5jIH0gZnJvbSAnZnMnXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGdldFdvcmtzcGFjZVBhY2thZ2VzLCBXb3Jrc3BhY2VQYWNrYWdlIH0gZnJvbSAnLi4vd29ya3NwYWNlJ1xuY29uc3QgZmFpbGVkID0gcmVxdWlyZSgnLi9zdGFnaW5nLmZhaWxlZC5qc29uJylcbmNvbnN0IHN1Y2Nlc3MgPSByZXF1aXJlKCcuL3N0YWdpbmcuc3VjY2Vzcy5qc29uJylcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QgcGtncyA9IGdldFdvcmtzcGFjZVBhY2thZ2VzKClcbiAgY29uc3QgbWVyZ2VkID0gWy4uLmZhaWxlZCwgLi4uc3VjY2Vzc11cbiAgZm9yIChjb25zdCBwa2cgb2YgcGtncykge1xuICAgIGNvbnN0IHN0cmlwcGVkTmFtZSA9IHBrZy5kZXNjb3BlZE5hbWUucmVwbGFjZSgnLWFkYXB0ZXInLCAnJylcbiAgICBjb25zdCBtYXRjaGluZ05hbWVzID0gW1xuICAgICAgcGtnLmRlc2NvcGVkTmFtZSxcbiAgICAgIHN0cmlwcGVkTmFtZSxcbiAgICAgIHN0cmlwcGVkTmFtZSArICdnYXMnLFxuICAgICAgc3RyaXBwZWROYW1lLnJlcGxhY2UoJy0nLCAnJyksXG4gICAgICBzdHJpcHBlZE5hbWUucmVwbGFjZSgnZ2FzcHJpY2UnLCAnZ2FzJyksXG4gICAgICBzdHJpcHBlZE5hbWUucmVwbGFjZSgnLScsICcnKS5yZXBsYWNlKCdnYXNwcmljZScsICdnYXMnKSxcbiAgICAgIHN0cmlwcGVkTmFtZS5yZXBsYWNlKCcuJywgJycpLnJlcGxhY2UoJ2dhc3ByaWNlJywgJ2dhcycpLFxuICAgICAgc3RyaXBwZWROYW1lLnJlcGxhY2UoJy4nLCAnJyksXG4gICAgXVxuXG4gICAgc3dpdGNoIChwa2cudHlwZSkge1xuICAgICAgY2FzZSAnc291cmNlcyc6IHtcbiAgICAgICAgbGV0IG1hdGNoaW5nUmVxXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBtYXRjaGluZ05hbWVzKSB7XG4gICAgICAgICAgbWF0Y2hpbmdSZXEgPSBtZXJnZWQuZmluZCgoYykgPT4gYy5uYW1lID09PSBuYW1lKVxuICAgICAgICAgIGlmIChtYXRjaGluZ1JlcSkgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdGNoaW5nUmVxKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBjb3VsZCBub3QgZmluZCBtYXRjaGluZyBzb3VyY2UgYWRhcHRlciBmb3IgJHttYXRjaGluZ05hbWVzWzFdfWApXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lcmdlZC5maW5kKChjKSA9PiBjLm5hbWUgPT09IG1hdGNoaW5nTmFtZXNbMV0pKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYHRoZSBhZGFwdGVyIHdpdGggYSBzZXJ2aWNlIG5hbWUgb2YgJHtcbiAgICAgICAgICAgICAgbWF0Y2hpbmdSZXE/Lm5hbWUgfHwgbWF0Y2hpbmdSZXE/LnNlcnZpY2VOYW1lXG4gICAgICAgICAgICB9IGRvZXMgbm90IGFsaWduIHdpdGggdGhlIHBhY2thZ2UgbmFtZSBvZiAke21hdGNoaW5nTmFtZXNbMV19YCxcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgd3JpdGVQYXlsb2FkKHBrZywgbWF0Y2hpbmdSZXEpXG5cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2NvbXBvc2l0ZXMnOiB7XG4gICAgICAgIGxldCBtYXRjaGluZ1JlcVxuICAgICAgICBjb25zdCBzdHJpcEVuZGluZ1dvcmQgPSAoc3RyOiBzdHJpbmcpID0+IHN0ci5zcGxpdCgnLScpLnNsaWNlKDAsIC0xKS5qb2luKCctJylcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIG1hdGNoaW5nTmFtZXMpIHtcbiAgICAgICAgICBtYXRjaGluZ1JlcSA9IG1lcmdlZC5maW5kKChjKSA9PiBzdHJpcEVuZGluZ1dvcmQoYy5uYW1lKSA9PT0gbmFtZSlcbiAgICAgICAgICBpZiAobWF0Y2hpbmdSZXEpIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtYXRjaGluZ1JlcSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgY291bGQgbm90IGZpbmQgbWF0Y2hpbmcgY29tcG9zaXRlIGFkYXB0ZXIgZm9yICR7bWF0Y2hpbmdOYW1lc1sxXX1gKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXJnZWQuZmluZCgoYykgPT4gc3RyaXBFbmRpbmdXb3JkKGMubmFtZSkgPT09IG1hdGNoaW5nTmFtZXNbMV0pKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYHRoZSBhZGFwdGVyIHdpdGggYSBzZXJ2aWNlIG5hbWUgb2YgJHtzdHJpcEVuZGluZ1dvcmQoXG4gICAgICAgICAgICAgIG1hdGNoaW5nUmVxPy5uYW1lIHx8IG1hdGNoaW5nUmVxPy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgICAgICl9IGRvZXMgbm90IGFsaWduIHdpdGggdGhlIHBhY2thZ2UgbmFtZSBvZiAke21hdGNoaW5nTmFtZXNbMV19YCxcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgd3JpdGVQYXlsb2FkKHBrZywgbWF0Y2hpbmdSZXEpXG5cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3RhcmdldHMnOiB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1haW4oKVxuXG50eXBlIE1hdGNoaW5nUmVxdWVzdCA9ICh0eXBlb2YgZmFpbGVkIHwgdHlwZW9mIHN1Y2Nlc3MpW251bWJlcl1cblxuZnVuY3Rpb24gd3JpdGVQYXlsb2FkKHBrZzogV29ya3NwYWNlUGFja2FnZSwgbWF0Y2hpbmdSZXE6IE1hdGNoaW5nUmVxdWVzdCkge1xuICB3cml0ZUZpbGVTeW5jKFxuICAgIGpvaW4ocGtnLmxvY2F0aW9uLCAndGVzdC1wYXlsb2FkLmpzb24nKSxcbiAgICBKU09OLnN0cmluZ2lmeShcbiAgICAgIHtcbiAgICAgICAgcmVxdWVzdDogbWF0Y2hpbmdSZXEucmVxdWVzdFBhcmFtcyxcbiAgICAgIH0sXG4gICAgICBudWxsLFxuICAgICAgMSxcbiAgICApLFxuICApXG59XG4iXX0=