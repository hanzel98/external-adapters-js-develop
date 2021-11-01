"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.getUpcomingFriday4pmET = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const ethers_1 = require("ethers");
const luxon_1 = require("luxon");
const index_1 = require("./index");
const AggregatorV3Interface_json_1 = tslib_1.__importDefault(require("../abis/AggregatorV3Interface.json"));
class RoundManagement {
    constructor(phase, justRound) {
        this.phase = ethers_1.BigNumber.from(phase);
        this.justRound = ethers_1.BigNumber.from(justRound);
    }
    get id() {
        return this.phase.shl(64).or(this.justRound);
    }
    nextRound() {
        return new RoundManagement(this.phase, this.justRound.add(1));
    }
    prevRound() {
        return new RoundManagement(this.phase, this.justRound.sub(1));
    }
    static decode(roundId) {
        roundId = ethers_1.BigNumber.from(roundId);
        const phase = roundId.shr(64);
        const justRoundId = roundId.sub(phase.shl(64));
        return new RoundManagement(phase, justRoundId);
    }
}
async function getNextWeekResolutionTimestamp(contract) {
    const contractNextResolutionTime = await contract.nextResolutionTime();
    const now = luxon_1.DateTime.now().setZone('America/New_York').toSeconds();
    if (contractNextResolutionTime > now) {
        ea_bootstrap_1.Logger.warn(`Augur: Next resolution time is in the future`);
        return 0;
    }
    return getUpcomingFriday4pmET();
}
function getUpcomingFriday4pmET() {
    const nowEastern = luxon_1.DateTime.now().setZone('America/New_York');
    const thisWeek = nowEastern.set({ weekday: 5, hour: 16, minute: 0, second: 0, millisecond: 0 });
    const past = thisWeek.diff(nowEastern).milliseconds < 0;
    const when = past ? thisWeek.plus({ week: 1 }) : thisWeek;
    return when.toSeconds();
}
exports.getUpcomingFriday4pmET = getUpcomingFriday4pmET;
const pokeParams = {
    contractAddress: true,
};
async function execute(input, context, config) {
    const validator = new ea_bootstrap_1.Validator(input, pokeParams);
    if (validator.error)
        throw validator.error;
    const jobRunID = input.id;
    const contractAddress = validator.validated.data.contractAddress;
    const contract = new ethers_1.ethers.Contract(contractAddress, index_1.CRYPTO_ABI, config.wallet);
    await pokeMarkets(contract, context, config);
    return ea_bootstrap_1.Requester.success(jobRunID, {});
}
exports.execute = execute;
async function fetchResolutionRoundIds(resolutionTime, contract, _, config) {
    const coins = await contract.getCoins();
    return Promise.all(coins.map(async (coin, index) => {
        const aggregator = new ethers_1.ethers.Contract(coin.priceFeed, AggregatorV3Interface_json_1.default, config.wallet);
        // Here we are going to walk backward through rounds to make sure that
        // we pick the *first* update after the passed-in resolutionTime
        let roundData = await aggregator.latestRoundData();
        // If any of the coins can't be resolved, don't resolve any of them we
        // may want to change this
        if (roundData.updatedAt < resolutionTime) {
            throw Error(`Augur: cryptoMarkets - oracle update for ${coin.name} has not occured yet, resolutionTime is ${resolutionTime} but oracle was updated at ${roundData.updatedAt}`);
        }
        let round = RoundManagement.decode(roundData.roundId);
        while (roundData.updatedAt >= resolutionTime) {
            roundData = await aggregator.getRoundData(round.prevRound().id);
            round = RoundManagement.decode(roundData.roundId);
        }
        return {
            coinId: index + 1,
            roundId: round.nextRound().id, // next round because we iterated one past the desired round
        };
    }));
}
async function createAndResolveMarkets(roundDataForCoins, nextWeek, contract, _, config) {
    //     function createAndResolveMarkets(uint80[] calldata _roundIds, uint256 _nextResolutionTime) public {
    const roundIds = [0].concat(roundDataForCoins.map((x) => x.roundId));
    const nonce = await config.wallet.getTransactionCount();
    try {
        await contract.createAndResolveMarkets(roundIds, nextWeek, { nonce });
        ea_bootstrap_1.Logger.log(`Augur: createAndResolveMarkets -- success`);
    }
    catch (e) {
        ea_bootstrap_1.Logger.log(`Augur: createAndResolveMarkets -- failure`);
        ea_bootstrap_1.Logger.error(e);
    }
}
async function pokeMarkets(contract, context, config) {
    const resolutionTime = await contract.nextResolutionTime();
    const nextResolutionTime = await getNextWeekResolutionTimestamp(contract);
    if (nextResolutionTime > 0) {
        const roundIds = await fetchResolutionRoundIds(resolutionTime.toNumber(), contract, context, config);
        await createAndResolveMarkets(roundIds, nextResolutionTime, contract, context, config);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9rZU1hcmtldHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWV0aG9kcy9wb2tlTWFya2V0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQXNFO0FBRXRFLG1DQUF3RDtBQUN4RCxpQ0FBZ0M7QUFHaEMsbUNBQW9DO0FBQ3BDLDRHQUF5RTtBQUV6RSxNQUFNLGVBQWU7SUFJbkIsWUFBWSxLQUFtQixFQUFFLFNBQXVCO1FBQ3RELElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxrQkFBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBRUQsSUFBVyxFQUFFO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDL0QsQ0FBQztJQUVNLFNBQVM7UUFDZCxPQUFPLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFxQjtRQUNqQyxPQUFPLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDakMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUM3QixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtB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QUFtQixFQUFFLENBQUE7SUFFdkQsSUFBSTtRQUNGLE1BQU0sUUFBUSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ3JFLHFCQUFNLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7S0FDeEQ7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLHFCQUFNLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7UUFDdkQscUJBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDaEI7QUFDSCxDQUFDO0FBRUQsS0FBSyxVQUFVLFdBQVcsQ0FBQyxRQUF5QixFQUFFLE9BQXVCLEVBQUUsTUFBYztJQUMzRixNQUFNLGNBQWMsR0FBYyxNQUFNLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO0lBQ3JFLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSw4QkFBOEIsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6RSxJQUFJLGtCQUFrQixHQUFHLENBQUMsRUFBRTtRQUMxQixNQUFNLFFBQVEsR0FBRyxNQUFNLHVCQUF1QixDQUM1QyxjQUFjLENBQUMsUUFBUSxFQUFFLEVBQ3pCLFFBQVEsRUFDUixPQUFPLEVBQ1AsTUFBTSxDQUNQLENBQUE7UUFDRCxNQUFNLHVCQUF1QixDQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0tBQ3ZGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciwgUmVxdWVzdGVyLCBWYWxpZGF0b3IgfSBmcm9tICdAY2hhaW5saW5rL2VhLWJvb3RzdHJhcCdcbmltcG9ydCB7IEFkYXB0ZXJSZXF1ZXN0LCBBZGFwdGVyUmVzcG9uc2UsIEFkYXB0ZXJDb250ZXh0IH0gZnJvbSAnQGNoYWlubGluay90eXBlcydcbmltcG9ydCB7IGV0aGVycywgQmlnTnVtYmVyLCBCaWdOdW1iZXJpc2ggfSBmcm9tICdldGhlcnMnXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJ1xuXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcnXG5pbXBvcnQgeyBDUllQVE9fQUJJIH0gZnJvbSAnLi9pbmRleCdcbmltcG9ydCBBZ2dyZWdhdG9yVjNJbnRlcmZhY2VBQkkgZnJvbSAnLi4vYWJpcy9BZ2dyZWdhdG9yVjNJbnRlcmZhY2UuanNvbidcblxuY2xhc3MgUm91bmRNYW5hZ2VtZW50IHtcbiAgcmVhZG9ubHkgcGhhc2U6IEJpZ051bWJlclxuICByZWFkb25seSBqdXN0Um91bmQ6IEJpZ051bWJlclxuXG4gIGNvbnN0cnVjdG9yKHBoYXNlOiBCaWdOdW1iZXJpc2gsIGp1c3RSb3VuZDogQmlnTnVtYmVyaXNoKSB7XG4gICAgdGhpcy5waGFzZSA9IEJpZ051bWJlci5mcm9tKHBoYXNlKVxuICAgIHRoaXMuanVzdFJvdW5kID0gQmlnTnVtYmVyLmZyb20oanVzdFJvdW5kKVxuICB9XG5cbiAgcHVibGljIGdldCBpZCgpOiBCaWdOdW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBoYXNlLnNobCg2NCkub3IodGhpcy5qdXN0Um91bmQpXG4gIH1cblxuICBwdWJsaWMgbmV4dFJvdW5kKCk6IFJvdW5kTWFuYWdlbWVudCB7XG4gICAgcmV0dXJuIG5ldyBSb3VuZE1hbmFnZW1lbnQodGhpcy5waGFzZSwgdGhpcy5qdXN0Um91bmQuYWRkKDEpKVxuICB9XG5cbiAgcHVibGljIHByZXZSb3VuZCgpOiBSb3VuZE1hbmFnZW1lbnQge1xuICAgIHJldHVybiBuZXcgUm91bmRNYW5hZ2VtZW50KHRoaXMucGhhc2UsIHRoaXMuanVzdFJvdW5kLnN1YigxKSlcbiAgfVxuXG4gIHN0YXRpYyBkZWNvZGUocm91bmRJZDogQmlnTnVtYmVyaXNoKTogUm91bmRNYW5hZ2VtZW50IHtcbiAgICByb3VuZElkID0gQmlnTnVtYmVyLmZyb20ocm91bmRJZClcbiAgICBjb25zdCBwaGFzZSA9IHJvdW5kSWQuc2hyKDY0KVxuICAgIGNvbnN0IGp1c3RSb3VuZElkID0gcm91bmRJZC5zdWIocGhhc2Uuc2hsKDY0KSlcbiAgICByZXR1cm4gbmV3IFJvdW5kTWFuYWdlbWVudChwaGFzZSwganVzdFJvdW5kSWQpXG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0TmV4dFdlZWtSZXNvbHV0aW9uVGltZXN0YW1wKGNvbnRyYWN0OiBldGhlcnMuQ29udHJhY3QpOiBQcm9taXNlPG51bWJlcj4ge1xuICBjb25zdCBjb250cmFjdE5leHRSZXNvbHV0aW9uVGltZSA9IGF3YWl0IGNvbnRyYWN0Lm5leHRSZXNvbHV0aW9uVGltZSgpXG4gIGNvbnN0IG5vdyA9IERhdGVUaW1lLm5vdygpLnNldFpvbmUoJ0FtZXJpY2EvTmV3X1lvcmsnKS50b1NlY29uZHMoKVxuXG4gIGlmIChjb250cmFjdE5leHRSZXNvbHV0aW9uVGltZSA+IG5vdykge1xuICAgIExvZ2dlci53YXJuKGBBdWd1cjogTmV4dCByZXNvbHV0aW9uIHRpbWUgaXMgaW4gdGhlIGZ1dHVyZWApXG5cbiAgICByZXR1cm4gMFxuICB9XG5cbiAgcmV0dXJuIGdldFVwY29taW5nRnJpZGF5NHBtRVQoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXBjb21pbmdGcmlkYXk0cG1FVCgpOiBudW1iZXIge1xuICBjb25zdCBub3dFYXN0ZXJuID0gRGF0ZVRpbWUubm93KCkuc2V0Wm9uZSgnQW1lcmljYS9OZXdfWW9yaycpXG4gIGNvbnN0IHRoaXNXZWVrID0gbm93RWFzdGVybi5zZXQoeyB3ZWVrZGF5OiA1LCBob3VyOiAxNiwgbWludXRlOiAwLCBzZWNvbmQ6IDAsIG1pbGxpc2Vjb25kOiAwIH0pXG4gIGNvbnN0IHBhc3QgPSB0aGlzV2Vlay5kaWZmKG5vd0Vhc3Rlcm4pLm1pbGxpc2Vjb25kcyA8IDBcbiAgY29uc3Qgd2hlbiA9IHBhc3QgPyB0aGlzV2Vlay5wbHVzKHsgd2VlazogMSB9KSA6IHRoaXNXZWVrXG4gIHJldHVybiB3aGVuLnRvU2Vjb25kcygpXG59XG5cbmludGVyZmFjZSBDb2luIHtcbiAgbmFtZTogc3RyaW5nXG4gIHByaWNlRmVlZDogc3RyaW5nXG59XG5cbmludGVyZmFjZSBSb3VuZERhdGEge1xuICByb3VuZElkOiBCaWdOdW1iZXJpc2hcbiAgc3RhcnRlZEF0OiBCaWdOdW1iZXJpc2hcbiAgdXBkYXRlZEF0OiBCaWdOdW1iZXJpc2hcbn1cblxuaW50ZXJmYWNlIFJvdW5kRGF0YUZvckNvaW4ge1xuICBjb2luSWQ6IG51bWJlclxuICByb3VuZElkOiBCaWdOdW1iZXJpc2hcbn1cblxuY29uc3QgcG9rZVBhcmFtcyA9IHtcbiAgY29udHJhY3RBZGRyZXNzOiB0cnVlLFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZShcbiAgaW5wdXQ6IEFkYXB0ZXJSZXF1ZXN0LFxuICBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCxcbiAgY29uZmlnOiBDb25maWcsXG4pOiBQcm9taXNlPEFkYXB0ZXJSZXNwb25zZT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKGlucHV0LCBwb2tlUGFyYW1zKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBqb2JSdW5JRCA9IGlucHV0LmlkXG5cbiAgY29uc3QgY29udHJhY3RBZGRyZXNzID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmNvbnRyYWN0QWRkcmVzc1xuICBjb25zdCBjb250cmFjdCA9IG5ldyBldGhlcnMuQ29udHJhY3QoY29udHJhY3RBZGRyZXNzLCBDUllQVE9fQUJJLCBjb25maWcud2FsbGV0KVxuXG4gIGF3YWl0IHBva2VNYXJrZXRzKGNvbnRyYWN0LCBjb250ZXh0LCBjb25maWcpXG5cbiAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKGpvYlJ1bklELCB7fSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hSZXNvbHV0aW9uUm91bmRJZHMoXG4gIHJlc29sdXRpb25UaW1lOiBudW1iZXIsXG4gIGNvbnRyYWN0OiBldGhlcnMuQ29udHJhY3QsXG4gIF86IEFkYXB0ZXJDb250ZXh0LFxuICBjb25maWc6IENvbmZpZyxcbik6IFByb21pc2U8Um91bmREYXRhRm9yQ29pbltdPiB7XG4gIGNvbnN0IGNvaW5zOiBDb2luW10gPSBhd2FpdCBjb250cmFjdC5nZXRDb2lucygpXG4gIHJldHVybiBQcm9taXNlLmFsbChcbiAgICBjb2lucy5tYXAoYXN5bmMgKGNvaW4sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBhZ2dyZWdhdG9yID0gbmV3IGV0aGVycy5Db250cmFjdChcbiAgICAgICAgY29pbi5wcmljZUZlZWQsXG4gICAgICAgIEFnZ3JlZ2F0b3JWM0ludGVyZmFjZUFCSSxcbiAgICAgICAgY29uZmlnLndhbGxldCxcbiAgICAgIClcblxuICAgICAgLy8gSGVyZSB3ZSBhcmUgZ29pbmcgdG8gd2FsayBiYWNrd2FyZCB0aHJvdWdoIHJvdW5kcyB0byBtYWtlIHN1cmUgdGhhdFxuICAgICAgLy8gd2UgcGljayB0aGUgKmZpcnN0KiB1cGRhdGUgYWZ0ZXIgdGhlIHBhc3NlZC1pbiByZXNvbHV0aW9uVGltZVxuICAgICAgbGV0IHJvdW5kRGF0YTogUm91bmREYXRhID0gYXdhaXQgYWdncmVnYXRvci5sYXRlc3RSb3VuZERhdGEoKVxuXG4gICAgICAvLyBJZiBhbnkgb2YgdGhlIGNvaW5zIGNhbid0IGJlIHJlc29sdmVkLCBkb24ndCByZXNvbHZlIGFueSBvZiB0aGVtIHdlXG4gICAgICAvLyBtYXkgd2FudCB0byBjaGFuZ2UgdGhpc1xuICAgICAgaWYgKHJvdW5kRGF0YS51cGRhdGVkQXQgPCByZXNvbHV0aW9uVGltZSkge1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBgQXVndXI6IGNyeXB0b01hcmtldHMgLSBvcmFjbGUgdXBkYXRlIGZvciAke2NvaW4ubmFtZX0gaGFzIG5vdCBvY2N1cmVkIHlldCwgcmVzb2x1dGlvblRpbWUgaXMgJHtyZXNvbHV0aW9uVGltZX0gYnV0IG9yYWNsZSB3YXMgdXBkYXRlZCBhdCAke3JvdW5kRGF0YS51cGRhdGVkQXR9YCxcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBsZXQgcm91bmQgPSBSb3VuZE1hbmFnZW1lbnQuZGVjb2RlKHJvdW5kRGF0YS5yb3VuZElkKVxuICAgICAgd2hpbGUgKHJvdW5kRGF0YS51cGRhdGVkQXQgPj0gcmVzb2x1dGlvblRpbWUpIHtcbiAgICAgICAgcm91bmREYXRhID0gYXdhaXQgYWdncmVnYXRvci5nZXRSb3VuZERhdGEocm91bmQucHJldlJvdW5kKCkuaWQpXG4gICAgICAgIHJvdW5kID0gUm91bmRNYW5hZ2VtZW50LmRlY29kZShyb3VuZERhdGEucm91bmRJZClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29pbklkOiBpbmRleCArIDEsIC8vIGFkZCBvbmUgYmVjYXVzZSBnZXRDb2lucyBleGNsdWRlcyB0aGUgMHRoIENvaW4sIHdoaWNoIGlzIGEgcGxhY2Vob2xkZXIgZm9yIFwibm8gY29pblwiXG4gICAgICAgIHJvdW5kSWQ6IHJvdW5kLm5leHRSb3VuZCgpLmlkLCAvLyBuZXh0IHJvdW5kIGJlY2F1c2Ugd2UgaXRlcmF0ZWQgb25lIHBhc3QgdGhlIGRlc2lyZWQgcm91bmRcbiAgICAgIH1cbiAgICB9KSxcbiAgKVxufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVBbmRSZXNvbHZlTWFya2V0cyhcbiAgcm91bmREYXRhRm9yQ29pbnM6IFJvdW5kRGF0YUZvckNvaW5bXSxcbiAgbmV4dFdlZWs6IG51bWJlcixcbiAgY29udHJhY3Q6IGV0aGVycy5Db250cmFjdCxcbiAgXzogQWRhcHRlckNvbnRleHQsXG4gIGNvbmZpZzogQ29uZmlnLFxuKSB7XG4gIC8vICAgICBmdW5jdGlvbiBjcmVhdGVBbmRSZXNvbHZlTWFya2V0cyh1aW50ODBbXSBjYWxsZGF0YSBfcm91bmRJZHMsIHVpbnQyNTYgX25leHRSZXNvbHV0aW9uVGltZSkgcHVibGljIHtcbiAgY29uc3Qgcm91bmRJZHM6IEJpZ051bWJlcmlzaFtdID0gKFswXSBhcyBCaWdOdW1iZXJpc2hbXSkuY29uY2F0KFxuICAgIHJvdW5kRGF0YUZvckNvaW5zLm1hcCgoeCkgPT4geC5yb3VuZElkKSxcbiAgKVxuXG4gIGNvbnN0IG5vbmNlID0gYXdhaXQgY29uZmlnLndhbGxldC5nZXRUcmFuc2FjdGlvbkNvdW50KClcblxuICB0cnkge1xuICAgIGF3YWl0IGNvbnRyYWN0LmNyZWF0ZUFuZFJlc29sdmVNYXJrZXRzKHJvdW5kSWRzLCBuZXh0V2VlaywgeyBub25jZSB9KVxuICAgIExvZ2dlci5sb2coYEF1Z3VyOiBjcmVhdGVBbmRSZXNvbHZlTWFya2V0cyAtLSBzdWNjZXNzYClcbiAgfSBjYXRjaCAoZSkge1xuICAgIExvZ2dlci5sb2coYEF1Z3VyOiBjcmVhdGVBbmRSZXNvbHZlTWFya2V0cyAtLSBmYWlsdXJlYClcbiAgICBMb2dnZXIuZXJyb3IoZSlcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBwb2tlTWFya2V0cyhjb250cmFjdDogZXRoZXJzLkNvbnRyYWN0LCBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCwgY29uZmlnOiBDb25maWcpIHtcbiAgY29uc3QgcmVzb2x1dGlvblRpbWU6IEJpZ051bWJlciA9IGF3YWl0IGNvbnRyYWN0Lm5leHRSZXNvbHV0aW9uVGltZSgpXG4gIGNvbnN0IG5leHRSZXNvbHV0aW9uVGltZSA9IGF3YWl0IGdldE5leHRXZWVrUmVzb2x1dGlvblRpbWVzdGFtcChjb250cmFjdClcbiAgaWYgKG5leHRSZXNvbHV0aW9uVGltZSA+IDApIHtcbiAgICBjb25zdCByb3VuZElkcyA9IGF3YWl0IGZldGNoUmVzb2x1dGlvblJvdW5kSWRzKFxuICAgICAgcmVzb2x1dGlvblRpbWUudG9OdW1iZXIoKSxcbiAgICAgIGNvbnRyYWN0LFxuICAgICAgY29udGV4dCxcbiAgICAgIGNvbmZpZyxcbiAgICApXG4gICAgYXdhaXQgY3JlYXRlQW5kUmVzb2x2ZU1hcmtldHMocm91bmRJZHMsIG5leHRSZXNvbHV0aW9uVGltZSwgY29udHJhY3QsIGNvbnRleHQsIGNvbmZpZylcbiAgfVxufVxuIl19