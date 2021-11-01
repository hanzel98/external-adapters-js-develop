"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
describe('docker compose file generation', () => {
    const nullImageNameConfig = {
        prefix: '',
        branch: '',
        useLatest: false,
    };
    const dockerComposeOptions = {
        context: '.',
    };
    describe('image name generation', () => {
        it('should generate base dockerfile images with versions', async () => {
            const output = await lib_1.generateFileJSON(nullImageNameConfig, dockerComposeOptions);
            expect(output).toMatchSnapshot();
        });
        it('should generate base dockerfile images with latest', async () => {
            const output = await lib_1.generateFileJSON({ ...nullImageNameConfig, useLatest: true }, dockerComposeOptions);
            expect(output).toMatchSnapshot();
        });
        it('should generate aws ecr dockerfile images', async () => {
            const output = await lib_1.generateFileJSON({
                prefix: 'public.ecr.aws/chainlink-staging/adapters/',
                branch: 'develop',
                useLatest: false,
            }, dockerComposeOptions);
            expect(output).toMatchSnapshot();
        });
        it('should generate aws ecr dockerfile images with latest tag', async () => {
            const output = await lib_1.generateFileJSON({
                prefix: 'public.ecr.aws/chainlink-staging/adapters/',
                branch: 'develop',
                useLatest: true,
            }, dockerComposeOptions);
            expect(output).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZG9ja2VyLWJ1aWxkL2xpYi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTZFO0FBQzdFLFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsTUFBTSxtQkFBbUIsR0FBb0I7UUFDM0MsTUFBTSxFQUFFLEVBQUU7UUFDVixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxLQUFLO0tBQ2pCLENBQUE7SUFDRCxNQUFNLG9CQUFvQixHQUF1QjtRQUMvQyxPQUFPLEVBQUUsR0FBRztLQUNiLENBQUE7SUFDRCxRQUFRLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO1FBQ3JDLEVBQUUsQ0FBQyxzREFBc0QsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNwRSxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFnQixDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUE7WUFDaEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ2xFLE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQWdCLENBQ25DLEVBQUUsR0FBRyxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQzNDLG9CQUFvQixDQUNyQixDQUFBO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ3pELE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQWdCLENBQ25DO2dCQUNFLE1BQU0sRUFBRSw0Q0FBNEM7Z0JBQ3BELE1BQU0sRUFBRSxTQUFTO2dCQUNqQixTQUFTLEVBQUUsS0FBSzthQUNqQixFQUNELG9CQUFvQixDQUNyQixDQUFBO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLDJEQUEyRCxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ3pFLE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQWdCLENBQ25DO2dCQUNFLE1BQU0sRUFBRSw0Q0FBNEM7Z0JBQ3BELE1BQU0sRUFBRSxTQUFTO2dCQUNqQixTQUFTLEVBQUUsSUFBSTthQUNoQixFQUNELG9CQUFvQixDQUNyQixDQUFBO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2VGaWxlT3B0aW9ucywgZ2VuZXJhdGVGaWxlSlNPTiwgSW1hZ2VOYW1lQ29uZmlnIH0gZnJvbSAnLi9saWInXG5kZXNjcmliZSgnZG9ja2VyIGNvbXBvc2UgZmlsZSBnZW5lcmF0aW9uJywgKCkgPT4ge1xuICBjb25zdCBudWxsSW1hZ2VOYW1lQ29uZmlnOiBJbWFnZU5hbWVDb25maWcgPSB7XG4gICAgcHJlZml4OiAnJyxcbiAgICBicmFuY2g6ICcnLFxuICAgIHVzZUxhdGVzdDogZmFsc2UsXG4gIH1cbiAgY29uc3QgZG9ja2VyQ29tcG9zZU9wdGlvbnM6IENvbXBvc2VGaWxlT3B0aW9ucyA9IHtcbiAgICBjb250ZXh0OiAnLicsXG4gIH1cbiAgZGVzY3JpYmUoJ2ltYWdlIG5hbWUgZ2VuZXJhdGlvbicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIGdlbmVyYXRlIGJhc2UgZG9ja2VyZmlsZSBpbWFnZXMgd2l0aCB2ZXJzaW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IGdlbmVyYXRlRmlsZUpTT04obnVsbEltYWdlTmFtZUNvbmZpZywgZG9ja2VyQ29tcG9zZU9wdGlvbnMpXG4gICAgICBleHBlY3Qob3V0cHV0KS50b01hdGNoU25hcHNob3QoKVxuICAgIH0pXG4gICAgaXQoJ3Nob3VsZCBnZW5lcmF0ZSBiYXNlIGRvY2tlcmZpbGUgaW1hZ2VzIHdpdGggbGF0ZXN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgZ2VuZXJhdGVGaWxlSlNPTihcbiAgICAgICAgeyAuLi5udWxsSW1hZ2VOYW1lQ29uZmlnLCB1c2VMYXRlc3Q6IHRydWUgfSxcbiAgICAgICAgZG9ja2VyQ29tcG9zZU9wdGlvbnMsXG4gICAgICApXG4gICAgICBleHBlY3Qob3V0cHV0KS50b01hdGNoU25hcHNob3QoKVxuICAgIH0pXG4gICAgaXQoJ3Nob3VsZCBnZW5lcmF0ZSBhd3MgZWNyIGRvY2tlcmZpbGUgaW1hZ2VzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgZ2VuZXJhdGVGaWxlSlNPTihcbiAgICAgICAge1xuICAgICAgICAgIHByZWZpeDogJ3B1YmxpYy5lY3IuYXdzL2NoYWlubGluay1zdGFnaW5nL2FkYXB0ZXJzLycsXG4gICAgICAgICAgYnJhbmNoOiAnZGV2ZWxvcCcsXG4gICAgICAgICAgdXNlTGF0ZXN0OiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgZG9ja2VyQ29tcG9zZU9wdGlvbnMsXG4gICAgICApXG4gICAgICBleHBlY3Qob3V0cHV0KS50b01hdGNoU25hcHNob3QoKVxuICAgIH0pXG4gICAgaXQoJ3Nob3VsZCBnZW5lcmF0ZSBhd3MgZWNyIGRvY2tlcmZpbGUgaW1hZ2VzIHdpdGggbGF0ZXN0IHRhZycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IGdlbmVyYXRlRmlsZUpTT04oXG4gICAgICAgIHtcbiAgICAgICAgICBwcmVmaXg6ICdwdWJsaWMuZWNyLmF3cy9jaGFpbmxpbmstc3RhZ2luZy9hZGFwdGVycy8nLFxuICAgICAgICAgIGJyYW5jaDogJ2RldmVsb3AnLFxuICAgICAgICAgIHVzZUxhdGVzdDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZG9ja2VyQ29tcG9zZU9wdGlvbnMsXG4gICAgICApXG4gICAgICBleHBlY3Qob3V0cHV0KS50b01hdGNoU25hcHNob3QoKVxuICAgIH0pXG4gIH0pXG59KVxuIl19