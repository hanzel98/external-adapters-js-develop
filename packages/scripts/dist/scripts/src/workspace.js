"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspacePackages = exports.PUBLIC_ADAPTER_TYPES = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-var-requires */
const fs_1 = require("fs");
const path_1 = require("path");
const s = tslib_1.__importStar(require("shelljs"));
/**
 * Types of adapters that are publically consumed
 */
exports.PUBLIC_ADAPTER_TYPES = ['composites', 'sources', 'examples', 'targets'];
const scope = '@chainlink/';
function getWorkspacePackages(additionalTypes = []) {
    const adapterTypes = exports.PUBLIC_ADAPTER_TYPES.concat(additionalTypes);
    return s
        .exec('yarn workspaces list --json', { silent: true })
        .split('\n')
        .filter(Boolean)
        .map((v) => JSON.parse(v))
        .map(({ location, name }) => {
        const pkg = getJsonFile(path_1.join(location, 'package.json'));
        return {
            location,
            name,
            descopedName: name.replace(scope, ''),
            type: location.split('/')[1],
            version: pkg.version,
        };
    })
        .filter((v) => adapterTypes.includes(v.type))
        .map((p) => {
        let tsconf;
        try {
            tsconf = getJsonFile(path_1.join(p.location, 'tsconfig.json'));
        }
        catch {
            warnLog(`${path_1.join(p.location, 'tsconfig.json')} does not exist`);
        }
        let environment;
        try {
            environment = getJsonFile(path_1.join(p.location, 'schemas/env.json'));
        }
        catch {
            warnLog(`${path_1.join(p.location, 'schemas/env.json')} does not exist`);
        }
        return { ...p, tsconf, environment };
    });
}
exports.getWorkspacePackages = getWorkspacePackages;
function getJsonFile(path) {
    return JSON.parse(fs_1.readFileSync(path, 'utf-8'));
}
/**
 * TODO: Use a proper debugging library like `debug`
 * @param str The string to log
 */
function warnLog(str) {
    if (process.env.DEBUG) {
        console.warn(str);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3dvcmtzcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsdURBQXVEO0FBQ3ZELDJCQUFpQztBQUNqQywrQkFBMkI7QUFDM0IsbURBQTRCO0FBZTVCOztHQUVHO0FBQ1UsUUFBQSxvQkFBb0IsR0FBRyxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQ3BGLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQTtBQUczQixTQUFnQixvQkFBb0IsQ0FBQyxrQkFBNEIsRUFBRTtJQUNqRSxNQUFNLFlBQVksR0FBRyw0QkFBb0IsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDakUsT0FBTyxDQUFDO1NBQ0wsSUFBSSxDQUFDLDZCQUE2QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO1NBQ3JELEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ2YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBb0IsRUFBRSxFQUFFO1FBQzVDLE1BQU0sR0FBRyxHQUF3QixXQUFXLENBQUMsV0FBSSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFBO1FBRTVFLE9BQU87WUFDTCxRQUFRO1lBQ1IsSUFBSTtZQUNKLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDckMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTztTQUNyQixDQUFBO0lBQ0gsQ0FBQyxDQUFDO1NBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNULElBQUksTUFBNEIsQ0FBQTtRQUNoQyxJQUFJO1lBQ0YsTUFBTSxHQUFHLFdBQVcsQ0FBQyxXQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFBO1NBQ3hEO1FBQUMsTUFBTTtZQUNOLE9BQU8sQ0FBQyxHQUFHLFdBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1NBQy9EO1FBRUQsSUFBSSxXQUErQyxDQUFBO1FBQ25ELElBQUk7WUFDRixXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQTtTQUNoRTtRQUFDLE1BQU07WUFDTixPQUFPLENBQUMsR0FBRyxXQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1NBQ2xFO1FBRUQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQTtJQUN0QyxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFwQ0Qsb0RBb0NDO0FBQ0QsU0FBUyxXQUFXLENBQUMsSUFBWTtJQUMvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtBQUNoRCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxPQUFPLENBQUMsR0FBVztJQUMxQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDbEI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlcyAqL1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCdcbmltcG9ydCAqIGFzIHMgZnJvbSAnc2hlbGxqcydcbmludGVyZmFjZSBUc0NvbmZpZyB7XG4gIHJlZmVyZW5jZXM6IHsgcGF0aDogc3RyaW5nIH1bXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZVBhY2thZ2Uge1xuICB0c2NvbmY6IFRzQ29uZmlnIHwgdW5kZWZpbmVkXG4gIGxvY2F0aW9uOiBzdHJpbmdcbiAgbmFtZTogc3RyaW5nXG4gIGRlc2NvcGVkTmFtZTogc3RyaW5nXG4gIHR5cGU6IHN0cmluZ1xuICBlbnZpcm9ubWVudDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB8IHVuZGVmaW5lZFxuICB2ZXJzaW9uOiBzdHJpbmdcbn1cblxuLyoqXG4gKiBUeXBlcyBvZiBhZGFwdGVycyB0aGF0IGFyZSBwdWJsaWNhbGx5IGNvbnN1bWVkXG4gKi9cbmV4cG9ydCBjb25zdCBQVUJMSUNfQURBUFRFUl9UWVBFUyA9IFsnY29tcG9zaXRlcycsICdzb3VyY2VzJywgJ2V4YW1wbGVzJywgJ3RhcmdldHMnXVxuY29uc3Qgc2NvcGUgPSAnQGNoYWlubGluay8nXG5cbmV4cG9ydCB0eXBlIFdvcmtzcGFjZVBhY2thZ2VzID0gUmV0dXJuVHlwZTx0eXBlb2YgZ2V0V29ya3NwYWNlUGFja2FnZXM+XG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ya3NwYWNlUGFja2FnZXMoYWRkaXRpb25hbFR5cGVzOiBzdHJpbmdbXSA9IFtdKTogV29ya3NwYWNlUGFja2FnZVtdIHtcbiAgY29uc3QgYWRhcHRlclR5cGVzID0gUFVCTElDX0FEQVBURVJfVFlQRVMuY29uY2F0KGFkZGl0aW9uYWxUeXBlcylcbiAgcmV0dXJuIHNcbiAgICAuZXhlYygneWFybiB3b3Jrc3BhY2VzIGxpc3QgLS1qc29uJywgeyBzaWxlbnQ6IHRydWUgfSlcbiAgICAuc3BsaXQoJ1xcbicpXG4gICAgLmZpbHRlcihCb29sZWFuKVxuICAgIC5tYXAoKHYpID0+IEpTT04ucGFyc2UodikpXG4gICAgLm1hcCgoeyBsb2NhdGlvbiwgbmFtZSB9OiBXb3Jrc3BhY2VQYWNrYWdlKSA9PiB7XG4gICAgICBjb25zdCBwa2c6IHsgdmVyc2lvbjogc3RyaW5nIH0gPSBnZXRKc29uRmlsZShqb2luKGxvY2F0aW9uLCAncGFja2FnZS5qc29uJykpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxvY2F0aW9uLFxuICAgICAgICBuYW1lLFxuICAgICAgICBkZXNjb3BlZE5hbWU6IG5hbWUucmVwbGFjZShzY29wZSwgJycpLFxuICAgICAgICB0eXBlOiBsb2NhdGlvbi5zcGxpdCgnLycpWzFdLFxuICAgICAgICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcbiAgICAgIH1cbiAgICB9KVxuICAgIC5maWx0ZXIoKHYpID0+IGFkYXB0ZXJUeXBlcy5pbmNsdWRlcyh2LnR5cGUpKVxuICAgIC5tYXAoKHApID0+IHtcbiAgICAgIGxldCB0c2NvbmY6IFRzQ29uZmlnIHwgdW5kZWZpbmVkXG4gICAgICB0cnkge1xuICAgICAgICB0c2NvbmYgPSBnZXRKc29uRmlsZShqb2luKHAubG9jYXRpb24sICd0c2NvbmZpZy5qc29uJykpXG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgd2FybkxvZyhgJHtqb2luKHAubG9jYXRpb24sICd0c2NvbmZpZy5qc29uJyl9IGRvZXMgbm90IGV4aXN0YClcbiAgICAgIH1cblxuICAgICAgbGV0IGVudmlyb25tZW50OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgdW5kZWZpbmVkXG4gICAgICB0cnkge1xuICAgICAgICBlbnZpcm9ubWVudCA9IGdldEpzb25GaWxlKGpvaW4ocC5sb2NhdGlvbiwgJ3NjaGVtYXMvZW52Lmpzb24nKSlcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICB3YXJuTG9nKGAke2pvaW4ocC5sb2NhdGlvbiwgJ3NjaGVtYXMvZW52Lmpzb24nKX0gZG9lcyBub3QgZXhpc3RgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geyAuLi5wLCB0c2NvbmYsIGVudmlyb25tZW50IH1cbiAgICB9KVxufVxuZnVuY3Rpb24gZ2V0SnNvbkZpbGUocGF0aDogc3RyaW5nKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhwYXRoLCAndXRmLTgnKSlcbn1cblxuLyoqXG4gKiBUT0RPOiBVc2UgYSBwcm9wZXIgZGVidWdnaW5nIGxpYnJhcnkgbGlrZSBgZGVidWdgXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gbG9nXG4gKi9cbmZ1bmN0aW9uIHdhcm5Mb2coc3RyOiBzdHJpbmcpIHtcbiAgaWYgKHByb2Nlc3MuZW52LkRFQlVHKSB7XG4gICAgY29uc29sZS53YXJuKHN0cilcbiAgfVxufVxuIl19