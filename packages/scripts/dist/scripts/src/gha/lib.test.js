"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
describe('job matrix generation', () => {
    it('should generate a job matrix consumable by gha', async () => {
        expect(await lib_1.getJobMatrix()).toMatchSnapshot();
    });
    it('should generate a job matrix suitable for pushing to ecr', async () => {
        process.env.IMAGE_PREFIX = 'public.ecr.aws/chainlink-staging/adapters/';
        process.env.BRANCH = 'EAEE';
        expect(await lib_1.getJobMatrix()).toMatchSnapshot();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2hhL2xpYi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQW9DO0FBRXBDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7SUFDckMsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzlELE1BQU0sQ0FBQyxNQUFNLGtCQUFZLEVBQUUsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO0lBQ2hELENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLDBEQUEwRCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLDRDQUE0QyxDQUFBO1FBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUMzQixNQUFNLENBQUMsTUFBTSxrQkFBWSxFQUFFLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUNoRCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Sm9iTWF0cml4IH0gZnJvbSAnLi9saWInXG5cbmRlc2NyaWJlKCdqb2IgbWF0cml4IGdlbmVyYXRpb24nLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgZ2VuZXJhdGUgYSBqb2IgbWF0cml4IGNvbnN1bWFibGUgYnkgZ2hhJywgYXN5bmMgKCkgPT4ge1xuICAgIGV4cGVjdChhd2FpdCBnZXRKb2JNYXRyaXgoKSkudG9NYXRjaFNuYXBzaG90KClcbiAgfSlcbiAgaXQoJ3Nob3VsZCBnZW5lcmF0ZSBhIGpvYiBtYXRyaXggc3VpdGFibGUgZm9yIHB1c2hpbmcgdG8gZWNyJywgYXN5bmMgKCkgPT4ge1xuICAgIHByb2Nlc3MuZW52LklNQUdFX1BSRUZJWCA9ICdwdWJsaWMuZWNyLmF3cy9jaGFpbmxpbmstc3RhZ2luZy9hZGFwdGVycy8nXG4gICAgcHJvY2Vzcy5lbnYuQlJBTkNIID0gJ0VBRUUnXG4gICAgZXhwZWN0KGF3YWl0IGdldEpvYk1hdHJpeCgpKS50b01hdGNoU25hcHNob3QoKVxuICB9KVxufSlcbiJdfQ==