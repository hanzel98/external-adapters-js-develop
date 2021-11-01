"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFight = exports.resolveTeam = exports.createFighter = exports.createTeam = exports.SPORTS_SUPPORTED = void 0;
const tslib_1 = require("tslib");
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
const Sportsdataio = tslib_1.__importStar(require("@chainlink/sportsdataio-adapter"));
const ethers_1 = require("ethers");
const luxon_1 = require("luxon");
exports.SPORTS_SUPPORTED = ['nfl', 'ncaa-fb', 'mma'];
const getEpochTime = (dateTime, zone = 'America/New_York') => {
    return luxon_1.DateTime.fromISO(dateTime, { zone }).toMillis();
};
const getCurrentSeason = async (id, sport, exec, context) => {
    if (!['nfl', 'ncaa-fb'].includes(sport))
        return 'NO_INFO';
    const input = {
        id,
        data: {
            sport,
            endpoint: 'current-season',
        },
    };
    const response = await exec(input, context);
    return response.data.result;
};
const getTeams = async (id, sport, exec, context) => {
    if (sport !== 'nfl')
        return [];
    const input = {
        id,
        data: {
            sport,
            endpoint: 'teams',
        },
    };
    const response = await exec(input, context);
    return response.data.result;
};
const getSchedule = async (id, sport, exec, context) => {
    const currentSeason = await getCurrentSeason(id, sport, exec, context);
    switch (sport) {
        case 'nfl': {
            let events = [];
            for (const seasonPostfixKey of ['PRE', '', 'POST', 'STAR']) {
                const input = {
                    id,
                    data: {
                        sport,
                        endpoint: 'schedule',
                        season: `${currentSeason}${seasonPostfixKey}`,
                    },
                };
                const response = await exec(input, context);
                const filtered = response.result.filter((event) => event.GlobalGameID != 0);
                events = [...events, ...filtered];
            }
            // Need full team names. API just returns an abbreviations
            const teamNames = await getTeams(id, sport, exec, context);
            events = events.map((event) => {
                const homeTeam = teamNames.find(({ GlobalTeamID }) => GlobalTeamID === event.GlobalHomeTeamID);
                const awayTeam = teamNames.find(({ GlobalTeamID }) => GlobalTeamID === event.GlobalAwayTeamID);
                if (!homeTeam || !awayTeam)
                    return event;
                return {
                    ...event,
                    AwayTeam: awayTeam.FullName,
                    HomeTeam: homeTeam.FullName,
                };
            });
            return events.map((event) => ({
                Date: event.Date || event.Day,
                GameID: event.GlobalGameID,
                AwayTeamName: event.AwayTeam,
                AwayTeamID: event.GlobalAwayTeamID,
                HomeTeamName: event.HomeTeam,
                HomeTeamID: event.GlobalHomeTeamID,
                Status: event.Status,
                PointSpread: event.PointSpread,
                AwayTeamMoneyLine: event.AwayTeamMoneyLine,
                HomeTeamMoneyLine: event.HomeTeamMoneyLine,
                OverUnder: event.OverUnder,
            }));
        }
        case 'ncaa-fb': {
            const input = {
                id,
                data: {
                    sport,
                    endpoint: 'schedule',
                    season: currentSeason,
                },
            };
            const response = await exec(input, context);
            const filtered = response.result.filter((event) => event.GlobalGameID != 0);
            return filtered.map((event) => ({
                Date: event.DateTime || event.Day,
                GameID: event.GlobalGameID,
                AwayTeamName: 'Away',
                AwayTeamID: event.GlobalAwayTeamID,
                HomeTeamName: 'Home',
                HomeTeamID: event.GlobalHomeTeamID,
                Status: event.Status,
                PointSpread: event.PointSpread,
                AwayTeamMoneyLine: event.AwayTeamMoneyLine,
                HomeTeamMoneyLine: event.HomeTeamMoneyLine,
                OverUnder: event.OverUnder,
            }));
        }
        default:
            throw Error(`Unable to format schedule for sport "${sport}"`);
    }
};
const getScores = async (id, sport, exec, context) => {
    const currentSeason = await getCurrentSeason(id, sport, exec, context);
    switch (sport) {
        case 'nfl': {
            let events = [];
            for (const seasonPostfixKey of ['PRE', '', 'POST', 'STAR']) {
                const input = {
                    id,
                    data: {
                        sport,
                        endpoint: 'scores',
                        season: `${currentSeason}${seasonPostfixKey}`,
                    },
                };
                const response = await exec(input, context);
                const filtered = response.result.filter((event) => event.GlobalGameID != 0);
                events = [...events, ...filtered];
            }
            return events.map((event) => ({
                Date: event.Date || event.Day,
                GameID: event.GlobalGameID,
                AwayTeamID: event.GlobalAwayTeamID,
                HomeTeamID: event.GlobalHomeTeamID,
                Status: event.Status,
                AwayScore: event.AwayScore,
                HomeScore: event.HomeScore,
            }));
        }
        case 'ncaa-fb': {
            const input = {
                id,
                data: {
                    sport,
                    endpoint: 'scores',
                    season: currentSeason,
                },
            };
            const response = await exec(input, context);
            const filtered = response.result.filter((event) => event.GlobalGameID != 0);
            return filtered.map((event) => ({
                Date: event.DateTime || event.Day,
                GameID: event.GlobalGameID,
                AwayTeamID: event.GlobalAwayTeamID,
                HomeTeamID: event.GlobalHomeTeamID,
                Status: event.Status,
                AwayScore: event.AwayTeamScore,
                HomeScore: event.HomeTeamScore,
            }));
        }
        default:
            throw Error(`Unable to format scores for sport "${sport}"`);
    }
};
const createParams = {
    sport: true,
    daysInAdvance: true,
    startBuffer: false,
    contract: true,
};
const createTeam = async (input, context) => {
    const validator = new ea_bootstrap_1.Validator(input, createParams);
    if (validator.error)
        throw validator.error;
    const sport = validator.validated.data.sport.toLowerCase();
    if (!exports.SPORTS_SUPPORTED.includes(sport)) {
        throw Error(`Unknown sport for Sportsdataio: ${sport}`);
    }
    const daysInAdvance = validator.validated.data.daysInAdvance;
    const startBuffer = validator.validated.data.startBuffer;
    const contract = validator.validated.data.contract;
    const sportsdataioExec = Sportsdataio.makeExecute(Sportsdataio.makeConfig(Sportsdataio.NAME));
    const schedule = (await getSchedule(input.id, sport, sportsdataioExec, context)).filter((event) => event.Status === 'Scheduled');
    ea_bootstrap_1.Logger.debug(`Augur sportsdataio: Got ${schedule.length} events from data provider`);
    let skipNullDate = 0, skipStartBuffer = 0, skipDaysInAdvance = 0, cantCreate = 0;
    // filter markets and build payloads for market creation
    const createEvents = [];
    for (const event of schedule) {
        if (!event.Date) {
            skipNullDate++;
            continue;
        }
        const startTime = getEpochTime(event.Date);
        const diffTime = startTime - Date.now();
        if (diffTime / 1000 < startBuffer) {
            skipStartBuffer++;
            continue;
        }
        if (diffTime / (1000 * 3600 * 24) > daysInAdvance) {
            skipDaysInAdvance++;
            continue;
        }
        const [headToHeadMarket, spreadMarket, totalScoreMarket] = await contract.getEventMarkets(event.GameID);
        const canCreate = headToHeadMarket.isZero() ||
            (spreadMarket.isZero() && false) ||
            (totalScoreMarket.isZero() && false);
        if (!canCreate) {
            cantCreate++;
            continue;
        }
        createEvents.push({
            id: ethers_1.BigNumber.from(event.GameID),
            homeTeamName: event.HomeTeamName,
            homeTeamId: event.HomeTeamID,
            awayTeamName: event.AwayTeamName,
            awayTeamId: event.AwayTeamID,
            startTime,
            homeSpread: event.PointSpread || 0,
            totalScore: event.OverUnder || 0,
            createSpread: event.PointSpread !== null,
            createTotalScore: event.OverUnder !== null,
            moneylines: [event.HomeTeamMoneyLine || 0, event.AwayTeamMoneyLine || 0],
        });
    }
    ea_bootstrap_1.Logger.debug(`Augur sportsdataio: Skipping ${skipNullDate} due to no event date`);
    ea_bootstrap_1.Logger.debug(`Augur sportsdataio: Skipping ${skipStartBuffer} due to startBuffer`);
    ea_bootstrap_1.Logger.debug(`Augur sportsdataio: Skipping ${skipDaysInAdvance} due to daysInAdvance`);
    ea_bootstrap_1.Logger.debug(`Augur sportsdataio: Skipping ${cantCreate} due to no market to create`);
    return ea_bootstrap_1.Requester.success(input.id, {
        data: { result: createEvents },
    });
};
exports.createTeam = createTeam;
const getFightSchedule = async (id, sport, league, season, exec, context) => {
    const input = {
        id,
        data: {
            sport,
            league,
            season,
            endpoint: 'schedule',
        },
    };
    const response = await exec(input, context);
    return response.result.filter((event) => event.Active);
};
const getFights = async (id, sport, eventId, exec, context) => {
    const input = {
        id,
        data: {
            sport,
            eventId,
            endpoint: 'event',
        },
    };
    const response = await exec(input, context);
    const fights = response.result.Fights;
    return fights.filter((fight) => fight.Active);
};
const createFighter = async (input, context) => {
    const validator = new ea_bootstrap_1.Validator(input, createParams);
    if (validator.error)
        throw validator.error;
    const sport = validator.validated.data.sport.toLowerCase();
    if (!exports.SPORTS_SUPPORTED.includes(sport)) {
        throw Error(`Unknown sport for Sportsdataio: ${sport}`);
    }
    const daysInAdvance = validator.validated.data.daysInAdvance;
    const contract = validator.validated.data.contract;
    const sportsdataioExec = Sportsdataio.makeExecute(Sportsdataio.makeConfig(Sportsdataio.NAME));
    const fights = [];
    const leagues = ['UFC'];
    for (const league of leagues) {
        const season = new Date().getFullYear();
        ea_bootstrap_1.Logger.debug(`Getting fight schedule for league ${league} in season ${season}.`);
        const schedule = (await getFightSchedule(input.id, sport, league, `${season}`, sportsdataioExec, context)).filter((event) => event.Status === 'Scheduled');
        ea_bootstrap_1.Logger.debug(`Getting ${schedule.length} events from season, then filtering out unscheduled`);
        for (const event of schedule) {
            const eventFights = (await getFights(input.id, sport, event.EventId, sportsdataioExec, context))
                .filter((fight) => fight.Status === 'Scheduled')
                .map((fight) => ({ ...fight, DateTime: event.DateTime }));
            fights.push(...eventFights);
        }
    }
    ea_bootstrap_1.Logger.debug(`Augur sportsdataio: Got ${fights.length} fights from data provider`);
    let skipNullDate = 0, skipDaysInAdvance = 0, skipOddNumberFighters = 0, cantCreate = 0;
    // filter markets and build payloads for market creation
    const createEvents = [];
    for (const fight of fights) {
        if (!fight.DateTime) {
            skipNullDate++;
            continue;
        }
        const startTime = getEpochTime(fight.DateTime);
        const diffTime = startTime - Date.now();
        if (diffTime / (1000 * 3600 * 24) > daysInAdvance) {
            skipDaysInAdvance++;
            continue;
        }
        const event = await contract.getEvent(fight.FightId);
        if (event.eventStatus !== 0) {
            cantCreate++;
            continue;
        }
        const fighters = fight.Fighters.filter((fighter) => fighter.Active);
        if (fighters.length !== 2) {
            skipOddNumberFighters++;
            continue;
        }
        const moneylines = fighters.map((fighter) => fighter.Moneyline);
        createEvents.push({
            id: ethers_1.BigNumber.from(fight.FightId),
            fighterA: fighters[0].FighterId,
            fighterAname: `${fighters[0].FirstName} ${fighters[0].LastName}`,
            fighterB: fighters[1].FighterId,
            fighterBname: `${fighters[1].FirstName} ${fighters[1].LastName}`,
            startTime,
            moneylines,
        });
    }
    ea_bootstrap_1.Logger.debug(`Augur sportsdataio: Skipping ${skipNullDate} due to no event date`);
    ea_bootstrap_1.Logger.debug(`Augur sportsdataio: Skipping ${skipDaysInAdvance} due to daysInAdvance`);
    ea_bootstrap_1.Logger.debug(`Augur sportsdataio: Skipping ${skipOddNumberFighters} due to odd number of fighters`);
    ea_bootstrap_1.Logger.debug(`Augur sportsdataio: Skipping ${cantCreate} due to no market to create`);
    return ea_bootstrap_1.Requester.success(input.id, {
        data: { result: createEvents },
    });
};
exports.createFighter = createFighter;
const eventStatus = {
    Scheduled: 1,
    InProgress: 0,
    Final: 2,
    'F/OT': 0,
    Suspended: 4,
    Postponed: 3,
    Delayed: 0,
    Canceled: 4,
};
const resolveParams = {
    sport: true,
    eventId: true,
};
const findEventScore = async (jobRunID, sport, eventId, exec, context) => {
    const scores = await getScores(jobRunID, sport, exec, context);
    return scores.find((game) => game.GameID === eventId);
};
const resolveTeam = async (input, context) => {
    const validator = new ea_bootstrap_1.Validator(input, resolveParams);
    if (validator.error)
        throw validator.error;
    const eventId = Number(validator.validated.data.eventId);
    const sport = validator.validated.data.sport;
    const sportsdataioExec = Sportsdataio.makeExecute(Sportsdataio.makeConfig(Sportsdataio.NAME));
    const event = await findEventScore(input.id, sport, eventId, sportsdataioExec, context);
    if (!event) {
        throw Error(`Unable to find event ${eventId}`);
    }
    const status = eventStatus[event.Status];
    if (!status) {
        throw Error(`Unknown status: ${event.Status}`);
    }
    const resolveEvent = {
        id: ethers_1.BigNumber.from(event.GameID),
        status,
        homeScore: event.HomeScore || 0,
        awayScore: event.AwayScore || 0,
    };
    return ea_bootstrap_1.Requester.success(input.id, {
        data: { result: resolveEvent },
    });
};
exports.resolveTeam = resolveTeam;
const getFight = async (id, sport, fightId, exec, context) => {
    const input = {
        id,
        data: {
            sport,
            fightId,
            endpoint: 'fight',
        },
    };
    const response = await exec(input, context);
    return response.result;
};
const resolveFight = async (input, context) => {
    const validator = new ea_bootstrap_1.Validator(input, resolveParams);
    if (validator.error)
        throw validator.error;
    const fightId = Number(validator.validated.data.eventId);
    const sport = validator.validated.data.sport;
    const sportsdataioExec = Sportsdataio.makeExecute(Sportsdataio.makeConfig(Sportsdataio.NAME));
    ea_bootstrap_1.Logger.debug(`Getting fight ${input.id} for sport ${sport}, which has fightId ${fightId}`);
    const fight = await getFight(input.id, sport, fightId, sportsdataioExec, context);
    if (!fight) {
        throw Error(`Unable to find fight ${fightId}`);
    }
    const status = eventStatus[fight.Status];
    if (!status) {
        throw Error(`Unknown status: ${fight.Status}`);
    }
    const winners = fight.Fighters.filter((fighter) => fighter.Active && fighter.Winner);
    const draw = winners.length !== 1;
    let winnerId = 0;
    let fighters = fight.Fighters;
    if (!draw) {
        // The fighters array for an event can contain previous, now non-active fighters,
        // as well as the current active fighters. During the creation code, the non-active
        // fighters are filtered but kept in the same order as the data source provides.
        //
        // In the case where an event is marked Canceled, both the fighters go to `Active = false`
        // so we need to to only do this filter here if the fight is indeed a draw, or else the
        // identificaton of fighterA and fighterB below would break.
        //
        // In the case where this is a draw, AND there was a change of fighers, setting the default
        // fighers list to the raw array, and indexing to 0 and 1 could indeed cause this call to
        // provide the incorrect fighter ID for fighterA, but in both of these cases the market resolves
        // as `No Contest` so it still ends up giving proper resolution.
        fighters = fighters.filter((fighter) => fighter.Active);
        // If this is a draw the winnerId is kept as 0 (uninitialized)
        winnerId = winners[0].FighterId;
    }
    const resolveEvent = {
        id: ethers_1.BigNumber.from(fight.FightId),
        status,
        fighterA: fighters[0].FighterId,
        fighterB: fighters[1].FighterId,
        winnerId,
        draw,
    };
    return ea_bootstrap_1.Requester.success(input.id, {
        data: { result: resolveEvent },
    });
};
exports.resolveFight = resolveFight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BvcnRzZGF0YWlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RhdGFQcm92aWRlcnMvc3BvcnRzZGF0YWlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBc0U7QUFFdEUsc0ZBQStEO0FBQy9ELG1DQUEwQztBQUcxQyxpQ0FBZ0M7QUFFbkIsUUFBQSxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFFekQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxRQUFnQixFQUFFLElBQUksR0FBRyxrQkFBa0IsRUFBVSxFQUFFO0lBQzNFLE9BQU8sZ0JBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUN4RCxDQUFDLENBQUE7QUF3RUQsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLEVBQzVCLEVBQVUsRUFDVixLQUFhLEVBQ2IsSUFBYSxFQUNiLE9BQXVCLEVBQ04sRUFBRTtJQUNuQixJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUFFLE9BQU8sU0FBUyxDQUFBO0lBRXpELE1BQU0sS0FBSyxHQUFHO1FBQ1osRUFBRTtRQUNGLElBQUksRUFBRTtZQUNKLEtBQUs7WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1NBQzNCO0tBQ0YsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUMzQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO0FBQzdCLENBQUMsQ0FBQTtBQUVELE1BQU0sUUFBUSxHQUFHLEtBQUssRUFDcEIsRUFBVSxFQUNWLEtBQWEsRUFDYixJQUFhLEVBQ2IsT0FBdUIsRUFDSCxFQUFFO0lBQ3RCLElBQUksS0FBSyxLQUFLLEtBQUs7UUFBRSxPQUFP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Q0FBQyxNQUFNLENBQUMsQ0FBQTtRQUV2RCw4REFBOEQ7UUFDOUQsUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7S0FDaEM7SUFFRCxNQUFNLFlBQVksR0FBaUI7UUFDakMsRUFBRSxFQUFFLGtCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDakMsTUFBTTtRQUNOLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUMvQixRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDL0IsUUFBUTtRQUNSLElBQUk7S0FDTCxDQUFBO0lBRUQsT0FBTyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO1FBQ2pDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUU7S0FDL0IsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBeERZLFFBQUEsWUFBWSxnQkF3RHhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyLCBSZXF1ZXN0ZXIsIFZhbGlkYXRvciB9IGZyb20gJ0BjaGFpbmxpbmsvZWEtYm9vdHN0cmFwJ1xuaW1wb3J0IHsgQWRhcHRlckNvbnRleHQsIEV4ZWN1dGUgfSBmcm9tICdAY2hhaW5saW5rL3R5cGVzJ1xuaW1wb3J0ICogYXMgU3BvcnRzZGF0YWlvIGZyb20gJ0BjaGFpbmxpbmsvc3BvcnRzZGF0YWlvLWFkYXB0ZXInXG5pbXBvcnQgeyBCaWdOdW1iZXIsIGV0aGVycyB9IGZyb20gJ2V0aGVycydcbmltcG9ydCB7IENyZWF0ZUZpZ2h0ZXJFdmVudCwgQ3JlYXRlVGVhbUV2ZW50IH0gZnJvbSAnLi4vbWV0aG9kcy9jcmVhdGVNYXJrZXRzJ1xuaW1wb3J0IHsgUmVzb2x2ZUZpZ2h0LCBSZXNvbHZlVGVhbSB9IGZyb20gJy4uL21ldGhvZHMvcmVzb2x2ZU1hcmtldHMnXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJ1xuXG5leHBvcnQgY29uc3QgU1BPUlRTX1NVUFBPUlRFRCA9IFsnbmZsJywgJ25jYWEtZmInLCAnbW1hJ11cblxuY29uc3QgZ2V0RXBvY2hUaW1lID0gKGRhdGVUaW1lOiBzdHJpbmcsIHpvbmUgPSAnQW1lcmljYS9OZXdfWW9yaycpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gRGF0ZVRpbWUuZnJvbUlTTyhkYXRlVGltZSwgeyB6b25lIH0pLnRvTWlsbGlzKClcbn1cblxuaW50ZXJmYWNlIE5GTFRlYW0ge1xuICBHbG9iYWxUZWFtSUQ6IG51bWJlclxuICBGdWxsTmFtZTogc3RyaW5nXG59XG5cbmludGVyZmFjZSBORkxFdmVudCB7XG4gIFBvaW50U3ByZWFkOiBudW1iZXIgfCBudWxsXG4gIERhdGU6IHN0cmluZyB8IG51bGxcbiAgRGF5OiBzdHJpbmdcbiAgR2xvYmFsR2FtZUlEOiBudW1iZXJcbiAgQXdheVRlYW06IHN0cmluZ1xuICBHbG9iYWxBd2F5VGVhbUlEOiBudW1iZXJcbiAgSG9tZVRlYW06IHN0cmluZ1xuICBHbG9iYWxIb21lVGVhbUlEOiBudW1iZXJcbiAgU3RhdHVzOiBzdHJpbmdcbiAgQXdheVRlYW1Nb25leUxpbmU6IG51bWJlciB8IG51bGxcbiAgSG9tZVRlYW1Nb25leUxpbmU6IG51bWJlciB8IG51bGxcbiAgT3ZlclVuZGVyOiBudW1iZXIgfCBudWxsXG59XG5cbmludGVyZmFjZSBUZWFtU2NoZWR1bGUge1xuICBEYXRlOiBzdHJpbmdcbiAgR2FtZUlEOiBudW1iZXJcbiAgQXdheVRlYW1OYW1lOiBzdHJpbmdcbiAgQXdheVRlYW1JRDogbnVtYmVyXG4gIEhvbWVUZWFtTmFtZTogc3RyaW5nXG4gIEhvbWVUZWFtSUQ6IG51bWJlclxuICBTdGF0dXM6IHN0cmluZ1xuICBQb2ludFNwcmVhZDogbnVtYmVyIHwgbnVsbFxuICBBd2F5VGVhbU1vbmV5TGluZTogbnVtYmVyIHwgbnVsbFxuICBIb21lVGVhbU1vbmV5TGluZTogbnVtYmVyIHwgbnVsbFxuICBPdmVyVW5kZXI6IG51bWJlciB8IG51bGxcbn1cblxuaW50ZXJmYWNlIE5GTFNjb3JlcyB7XG4gIERhdGU6IHN0cmluZyB8IG51bGxcbiAgRGF5OiBzdHJpbmdcbiAgR2xvYmFsR2FtZUlEOiBudW1iZXJcbiAgR2xvYmFsQXdheVRlYW1JRDogbnVtYmVyXG4gIEdsb2JhbEhvbWVUZWFtSUQ6IG51bWJlclxuICBTdGF0dXM6IHN0cmluZ1xuICBBd2F5U2NvcmU6IG51bWJlciB8IG51bGxcbiAgSG9tZVNjb3JlOiBudW1iZXIgfCBudWxsXG59XG5cbmludGVyZmFjZSBDRkJHYW1lcyB7XG4gIERheTogc3RyaW5nXG4gIERhdGVUaW1lOiBzdHJpbmcgfCBudWxsXG4gIEdsb2JhbEdhbWVJRDogbnVtYmVyXG4gIEdsb2JhbEF3YXlUZWFtSUQ6IG51bWJlclxuICBHbG9iYWxIb21lVGVhbUlEOiBudW1iZXJcbiAgU3RhdHVzOiBzdHJpbmdcbiAgQXdheVRlYW1TY29yZTogbnVtYmVyIHwgbnVsbFxuICBIb21lVGVhbVNjb3JlOiBudW1iZXIgfCBudWxsXG4gIFBvaW50U3ByZWFkOiBudW1iZXIgfCBudWxsXG4gIEF3YXlUZWFtTW9uZXlMaW5lOiBudW1iZXIgfCBudWxsXG4gIEhvbWVUZWFtTW9uZXlMaW5lOiBudW1iZXIgfCBudWxsXG4gIE92ZXJVbmRlcjogbnVtYmVyIHwgbnVsbFxufVxuXG5pbnRlcmZhY2UgQ29tbW9uU2NvcmVzIHtcbiAgRGF0ZTogc3RyaW5nXG4gIEdhbWVJRDogbnVtYmVyXG4gIEF3YXlUZWFtSUQ6IG51bWJlclxuICBIb21lVGVhbUlEOiBudW1iZXJcbiAgU3RhdHVzOiBzdHJpbmdcbiAgQXdheVNjb3JlOiBudW1iZXIgfCBudWxsXG4gIEhvbWVTY29yZTogbnVtYmVyIHwgbnVsbFxufVxuXG5jb25zdCBnZXRDdXJyZW50U2Vhc29uID0gYXN5bmMgKFxuICBpZDogc3RyaW5nLFxuICBzcG9ydDogc3RyaW5nLFxuICBleGVjOiBFeGVjdXRlLFxuICBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCxcbik6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGlmICghWyduZmwnLCAnbmNhYS1mYiddLmluY2x1ZGVzKHNwb3J0KSkgcmV0dXJuICdOT19JTkZPJ1xuXG4gIGNvbnN0IGlucHV0ID0ge1xuICAgIGlkLFxuICAgIGRhdGE6IHtcbiAgICAgIHNwb3J0LFxuICAgICAgZW5kcG9pbnQ6ICdjdXJyZW50LXNlYXNvbicsXG4gICAgfSxcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZXhlYyhpbnB1dCwgY29udGV4dClcbiAgcmV0dXJuIHJlc3BvbnNlLmRhdGEucmVzdWx0XG59XG5cbmNvbnN0IGdldFRlYW1zID0gYXN5bmMgKFxuICBpZDogc3RyaW5nLFxuICBzcG9ydDogc3RyaW5nLFxuICBleGVjOiBFeGVjdXRlLFxuICBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCxcbik6IFByb21pc2U8TkZMVGVhbVtdPiA9PiB7XG4gIGlmIChzcG9ydCAhPT0gJ25mbCcpIHJldHVybiBbXVxuXG4gIGNvbnN0IGlucHV0ID0ge1xuICAgIGlkLFxuICAgIGRhdGE6IHtcbiAgICAgIHNwb3J0LFxuICAgICAgZW5kcG9pbnQ6ICd0ZWFtcycsXG4gICAgfSxcbiAgfVxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGV4ZWMoaW5wdXQsIGNvbnRleHQpXG4gIHJldHVybiByZXNwb25zZS5kYXRhLnJlc3VsdFxufVxuXG5jb25zdCBnZXRTY2hlZHVsZSA9IGFzeW5jIChcbiAgaWQ6IHN0cmluZyxcbiAgc3BvcnQ6IHN0cmluZyxcbiAgZXhlYzogRXhlY3V0ZSxcbiAgY29udGV4dDogQWRhcHRlckNvbnRleHQsXG4pOiBQcm9taXNlPFRlYW1TY2hlZHVsZVtdPiA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTZWFzb24gPSBhd2FpdCBnZXRDdXJyZW50U2Vhc29uKGlkLCBzcG9ydCwgZXhlYywgY29udGV4dClcbiAgc3dpdGNoIChzcG9ydCkge1xuICAgIGNhc2UgJ25mbCc6IHtcbiAgICAgIGxldCBldmVudHM6IE5GTEV2ZW50W10gPSBbXVxuXG4gICAgICBmb3IgKGNvbnN0IHNlYXNvblBvc3RmaXhLZXkgb2YgWydQUkUnLCAnJywgJ1BPU1QnLCAnU1RBUiddKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0ge1xuICAgICAgICAgIGlkLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHNwb3J0LFxuICAgICAgICAgICAgZW5kcG9pbnQ6ICdzY2hlZHVsZScsXG4gICAgICAgICAgICBzZWFzb246IGAke2N1cnJlbnRTZWFzb259JHtzZWFzb25Qb3N0Zml4S2V5fWAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGV4ZWMoaW5wdXQsIGNvbnRleHQpXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gKHJlc3BvbnNlLnJlc3VsdCBhcyBORkxFdmVudFtdKS5maWx0ZXIoKGV2ZW50KSA9PiBldmVudC5HbG9iYWxHYW1lSUQgIT0gMClcblxuICAgICAgICBldmVudHMgPSBbLi4uZXZlbnRzLCAuLi5maWx0ZXJlZF1cbiAgICAgIH1cblxuICAgICAgLy8gTmVlZCBmdWxsIHRlYW0gbmFtZXMuIEFQSSBqdXN0IHJldHVybnMgYW4gYWJicmV2aWF0aW9uc1xuICAgICAgY29uc3QgdGVhbU5hbWVzID0gYXdhaXQgZ2V0VGVhbXMoaWQsIHNwb3J0LCBleGVjLCBjb250ZXh0KVxuICAgICAgZXZlbnRzID0gZXZlbnRzLm1hcCgoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgaG9tZVRlYW0gPSB0ZWFtTmFtZXMuZmluZChcbiAgICAgICAgICAoeyBHbG9iYWxUZWFtSUQgfSkgPT4gR2xvYmFsVGVhbUlEID09PSBldmVudC5HbG9iYWxIb21lVGVhbUlELFxuICAgICAgICApXG4gICAgICAgIGNvbnN0IGF3YXlUZWFtID0gdGVhbU5hbWVzLmZpbmQoXG4gICAgICAgICAgKHsgR2xvYmFsVGVhbUlEIH0pID0+IEdsb2JhbFRlYW1JRCA9PT0gZXZlbnQuR2xvYmFsQXdheVRlYW1JRCxcbiAgICAgICAgKVxuXG4gICAgICAgIGlmICghaG9tZVRlYW0gfHwgIWF3YXlUZWFtKSByZXR1cm4gZXZlbnRcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmV2ZW50LFxuICAgICAgICAgIEF3YXlUZWFtOiBhd2F5VGVhbS5GdWxsTmFtZSxcbiAgICAgICAgICBIb21lVGVhbTogaG9tZVRlYW0uRnVsbE5hbWUsXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiAoZXZlbnRzIGFzIE5GTEV2ZW50W10pLm1hcCgoZXZlbnQpID0+ICh7XG4gICAgICAgIERhdGU6IGV2ZW50LkRhdGUgfHwgZXZlbnQuRGF5LFxuICAgICAgICBHYW1lSUQ6IGV2ZW50Lkdsb2JhbEdhbWVJRCxcbiAgICAgICAgQXdheVRlYW1OYW1lOiBldmVudC5Bd2F5VGVhbSxcbiAgICAgICAgQXdheVRlYW1JRDogZXZlbnQuR2xvYmFsQXdheVRlYW1JRCxcbiAgICAgICAgSG9tZVRlYW1OYW1lOiBldmVudC5Ib21lVGVhbSxcbiAgICAgICAgSG9tZVRlYW1JRDogZXZlbnQuR2xvYmFsSG9tZVRlYW1JRCxcbiAgICAgICAgU3RhdHVzOiBldmVudC5TdGF0dXMsXG4gICAgICAgIFBvaW50U3ByZWFkOiBldmVudC5Qb2ludFNwcmVhZCxcbiAgICAgICAgQXdheVRlYW1Nb25leUxpbmU6IGV2ZW50LkF3YXlUZWFtTW9uZXlMaW5lLFxuICAgICAgICBIb21lVGVhbU1vbmV5TGluZTogZXZlbnQuSG9tZVRlYW1Nb25leUxpbmUsXG4gICAgICAgIE92ZXJVbmRlcjogZXZlbnQuT3ZlclVuZGVyLFxuICAgICAgfSkpXG4gICAgfVxuICAgIGNhc2UgJ25jYWEtZmInOiB7XG4gICAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgICAgaWQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBzcG9ydCxcbiAgICAgICAgICBlbmRwb2ludDogJ3NjaGVkdWxlJyxcbiAgICAgICAgICBzZWFzb246IGN1cnJlbnRTZWFzb24sXG4gICAgICAgIH0sXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZXhlYyhpbnB1dCwgY29udGV4dClcbiAgICAgIGNvbnN0IGZpbHRlcmVkID0gKHJlc3BvbnNlLnJlc3VsdCBhcyB7IEdsb2JhbEdhbWVJRDogbnVtYmVyIH1bXSkuZmlsdGVyKFxuICAgICAgICAoZXZlbnQpID0+IGV2ZW50Lkdsb2JhbEdhbWVJRCAhPSAwLFxuICAgICAgKVxuXG4gICAgICByZXR1cm4gKGZpbHRlcmVkIGFzIENGQkdhbWVzW10pLm1hcCgoZXZlbnQpID0+ICh7XG4gICAgICAgIERhdGU6IGV2ZW50LkRhdGVUaW1lIHx8IGV2ZW50LkRheSxcbiAgICAgICAgR2FtZUlEOiBldmVudC5HbG9iYWxHYW1lSUQsXG4gICAgICAgIEF3YXlUZWFtTmFtZTogJ0F3YXknLFxuICAgICAgICBBd2F5VGVhbUlEOiBldmVudC5HbG9iYWxBd2F5VGVhbUlELFxuICAgICAgICBIb21lVGVhbU5hbWU6ICdIb21lJyxcbiAgICAgICAgSG9tZVRlYW1JRDogZXZlbnQuR2xvYmFsSG9tZVRlYW1JRCxcbiAgICAgICAgU3RhdHVzOiBldmVudC5TdGF0dXMsXG4gICAgICAgIFBvaW50U3ByZWFkOiBldmVudC5Qb2ludFNwcmVhZCxcbiAgICAgICAgQXdheVRlYW1Nb25leUxpbmU6IGV2ZW50LkF3YXlUZWFtTW9uZXlMaW5lLFxuICAgICAgICBIb21lVGVhbU1vbmV5TGluZTogZXZlbnQuSG9tZVRlYW1Nb25leUxpbmUsXG4gICAgICAgIE92ZXJVbmRlcjogZXZlbnQuT3ZlclVuZGVyLFxuICAgICAgfSkpXG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBFcnJvcihgVW5hYmxlIHRvIGZvcm1hdCBzY2hlZHVsZSBmb3Igc3BvcnQgXCIke3Nwb3J0fVwiYClcbiAgfVxufVxuXG5jb25zdCBnZXRTY29yZXMgPSBhc3luYyAoXG4gIGlkOiBzdHJpbmcsXG4gIHNwb3J0OiBzdHJpbmcsXG4gIGV4ZWM6IEV4ZWN1dGUsXG4gIGNvbnRleHQ6IEFkYXB0ZXJDb250ZXh0LFxuKTogUHJvbWlzZTxDb21tb25TY29yZXNbXT4gPT4ge1xuICBjb25zdCBjdXJyZW50U2Vhc29uID0gYXdhaXQgZ2V0Q3VycmVudFNlYXNvbihpZCwgc3BvcnQsIGV4ZWMsIGNvbnRleHQpXG4gIHN3aXRjaCAoc3BvcnQpIHtcbiAgICBjYXNlICduZmwnOiB7XG4gICAgICBsZXQgZXZlbnRzOiBORkxTY29yZXNbXSA9IFtdXG5cbiAgICAgIGZvciAoY29uc3Qgc2Vhc29uUG9zdGZpeEtleSBvZiBbJ1BSRScsICcnLCAnUE9TVCcsICdTVEFSJ10pIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB7XG4gICAgICAgICAgaWQsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc3BvcnQsXG4gICAgICAgICAgICBlbmRwb2ludDogJ3Njb3JlcycsXG4gICAgICAgICAgICBzZWFzb246IGAke2N1cnJlbnRTZWFzb259JHtzZWFzb25Qb3N0Zml4S2V5fWAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGV4ZWMoaW5wdXQsIGNvbnRleHQpXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gKHJlc3BvbnNlLnJlc3VsdCBhcyBORkxTY29yZXNbXSkuZmlsdGVyKChldmVudCkgPT4gZXZlbnQuR2xvYmFsR2FtZUlEICE9IDApXG5cbiAgICAgICAgZXZlbnRzID0gWy4uLmV2ZW50cywgLi4uZmlsdGVyZWRdXG4gICAgICB9XG4gICAgICByZXR1cm4gZXZlbnRzLm1hcCgoZXZlbnQpID0+ICh7XG4gICAgICAgIERhdGU6IGV2ZW50LkRhdGUgfHwgZXZlbnQuRGF5LFxuICAgICAgICBHYW1lSUQ6IGV2ZW50Lkdsb2JhbEdhbWVJRCxcbiAgICAgICAgQXdheVRlYW1JRDogZXZlbnQuR2xvYmFsQXdheVRlYW1JRCxcbiAgICAgICAgSG9tZVRlYW1JRDogZXZlbnQuR2xvYmFsSG9tZVRlYW1JRCxcbiAgICAgICAgU3RhdHVzOiBldmVudC5TdGF0dXMsXG4gICAgICAgIEF3YXlTY29yZTogZXZlbnQuQXdheVNjb3JlLFxuICAgICAgICBIb21lU2NvcmU6IGV2ZW50LkhvbWVTY29yZSxcbiAgICAgIH0pKVxuICAgIH1cbiAgICBjYXNlICduY2FhLWZiJzoge1xuICAgICAgY29uc3QgaW5wdXQgPSB7XG4gICAgICAgIGlkLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgc3BvcnQsXG4gICAgICAgICAgZW5kcG9pbnQ6ICdzY29yZXMnLFxuICAgICAgICAgIHNlYXNvbjogY3VycmVudFNlYXNvbixcbiAgICAgICAgfSxcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBleGVjKGlucHV0LCBjb250ZXh0KVxuICAgICAgY29uc3QgZmlsdGVyZWQgPSAocmVzcG9uc2UucmVzdWx0IGFzIHsgR2xvYmFsR2FtZUlEOiBudW1iZXIgfVtdKS5maWx0ZXIoXG4gICAgICAgIChldmVudCkgPT4gZXZlbnQuR2xvYmFsR2FtZUlEICE9IDAsXG4gICAgICApXG5cbiAgICAgIHJldHVybiAoZmlsdGVyZWQgYXMgQ0ZCR2FtZXNbXSkubWFwKChldmVudCkgPT4gKHtcbiAgICAgICAgRGF0ZTogZXZlbnQuRGF0ZVRpbWUgfHwgZXZlbnQuRGF5LFxuICAgICAgICBHYW1lSUQ6IGV2ZW50Lkdsb2JhbEdhbWVJRCxcbiAgICAgICAgQXdheVRlYW1JRDogZXZlbnQuR2xvYmFsQXdheVRlYW1JRCxcbiAgICAgICAgSG9tZVRlYW1JRDogZXZlbnQuR2xvYmFsSG9tZVRlYW1JRCxcbiAgICAgICAgU3RhdHVzOiBldmVudC5TdGF0dXMsXG4gICAgICAgIEF3YXlTY29yZTogZXZlbnQuQXdheVRlYW1TY29yZSxcbiAgICAgICAgSG9tZVNjb3JlOiBldmVudC5Ib21lVGVhbVNjb3JlLFxuICAgICAgfSkpXG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBFcnJvcihgVW5hYmxlIHRvIGZvcm1hdCBzY29yZXMgZm9yIHNwb3J0IFwiJHtzcG9ydH1cImApXG4gIH1cbn1cblxuY29uc3QgY3JlYXRlUGFyYW1zID0ge1xuICBzcG9ydDogdHJ1ZSxcbiAgZGF5c0luQWR2YW5jZTogdHJ1ZSxcbiAgc3RhcnRCdWZmZXI6IGZhbHNlLFxuICBjb250cmFjdDogdHJ1ZSxcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRlYW06IEV4ZWN1dGUgPSBhc3luYyAoaW5wdXQsIGNvbnRleHQpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihpbnB1dCwgY3JlYXRlUGFyYW1zKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBzcG9ydCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5zcG9ydC50b0xvd2VyQ2FzZSgpXG4gIGlmICghU1BPUlRTX1NVUFBPUlRFRC5pbmNsdWRlcyhzcG9ydCkpIHtcbiAgICB0aHJvdyBFcnJvcihgVW5rbm93biBzcG9ydCBmb3IgU3BvcnRzZGF0YWlvOiAke3Nwb3J0fWApXG4gIH1cblxuICBjb25zdCBkYXlzSW5BZHZhbmNlID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmRheXNJbkFkdmFuY2VcbiAgY29uc3Qgc3RhcnRCdWZmZXIgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuc3RhcnRCdWZmZXJcblxuICBjb25zdCBjb250cmFjdDogZXRoZXJzLkNvbnRyYWN0ID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmNvbnRyYWN0XG5cbiAgY29uc3Qgc3BvcnRzZGF0YWlvRXhlYyA9IFNwb3J0c2RhdGFpby5tYWtlRXhlY3V0ZShTcG9ydHNkYXRhaW8ubWFrZUNvbmZpZyhTcG9ydHNkYXRhaW8uTkFNRSkpXG5cbiAgY29uc3Qgc2NoZWR1bGUgPSAoYXdhaXQgZ2V0U2NoZWR1bGUoaW5wdXQuaWQsIHNwb3J0LCBzcG9ydHNkYXRhaW9FeGVjLCBjb250ZXh0KSkuZmlsdGVyKFxuICAgIChldmVudCkgPT4gZXZlbnQuU3RhdHVzID09PSAnU2NoZWR1bGVkJyxcbiAgKVxuXG4gIExvZ2dlci5kZWJ1ZyhgQXVndXIgc3BvcnRzZGF0YWlvOiBHb3QgJHtzY2hlZHVsZS5sZW5ndGh9IGV2ZW50cyBmcm9tIGRhdGEgcHJvdmlkZXJgKVxuICBsZXQgc2tpcE51bGxEYXRlID0gMCxcbiAgICBza2lwU3RhcnRCdWZmZXIgPSAwLFxuICAgIHNraXBEYXlzSW5BZHZhbmNlID0gMCxcbiAgICBjYW50Q3JlYXRlID0gMFxuXG4gIC8vIGZpbHRlciBtYXJrZXRzIGFuZCBidWlsZCBwYXlsb2FkcyBmb3IgbWFya2V0IGNyZWF0aW9uXG4gIGNvbnN0IGNyZWF0ZUV2ZW50czogQ3JlYXRlVGVhbUV2ZW50W10gPSBbXVxuICBmb3IgKGNvbnN0IGV2ZW50IG9mIHNjaGVkdWxlKSB7XG4gICAgaWYgKCFldmVudC5EYXRlKSB7XG4gICAgICBza2lwTnVsbERhdGUrK1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gZ2V0RXBvY2hUaW1lKGV2ZW50LkRhdGUpXG4gICAgY29uc3QgZGlmZlRpbWUgPSBzdGFydFRpbWUgLSBEYXRlLm5vdygpXG4gICAgaWYgKGRpZmZUaW1lIC8gMTAwMCA8IHN0YXJ0QnVmZmVyKSB7XG4gICAgICBza2lwU3RhcnRCdWZmZXIrK1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgaWYgKGRpZmZUaW1lIC8gKDEwMDAgKiAzNjAwICogMjQpID4gZGF5c0luQWR2YW5jZSkge1xuICAgICAgc2tpcERheXNJbkFkdmFuY2UrK1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBjb25zdCBbaGVhZFRvSGVhZE1hcmtldCwgc3ByZWFkTWFya2V0LCB0b3RhbFNjb3JlTWFya2V0XTogW0JpZ051bWJlciwgQmlnTnVtYmVyLCBCaWdOdW1iZXJdID1cbiAgICAgIGF3YWl0IGNvbnRyYWN0LmdldEV2ZW50TWFya2V0cyhldmVudC5HYW1lSUQpXG4gICAgY29uc3QgY2FuQ3JlYXRlID1cbiAgICAgIGhlYWRUb0hlYWRNYXJrZXQuaXNaZXJvKCkgfHxcbiAgICAgIChzcHJlYWRNYXJrZXQuaXNaZXJvKCkgJiYgZmFsc2UpIHx8XG4gICAgICAodG90YWxTY29yZU1hcmtldC5pc1plcm8oKSAmJiBmYWxzZSlcbiAgICBpZiAoIWNhbkNyZWF0ZSkge1xuICAgICAgY2FudENyZWF0ZSsrXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGNyZWF0ZUV2ZW50cy5wdXNoKHtcbiAgICAgIGlkOiBCaWdOdW1iZXIuZnJvbShldmVudC5HYW1lSUQpLFxuICAgICAgaG9tZVRlYW1OYW1lOiBldmVudC5Ib21lVGVhbU5hbWUsXG4gICAgICBob21lVGVhbUlkOiBldmVudC5Ib21lVGVhbUlELFxuICAgICAgYXdheVRlYW1OYW1lOiBldmVudC5Bd2F5VGVhbU5hbWUsXG4gICAgICBhd2F5VGVhbUlkOiBldmVudC5Bd2F5VGVhbUlELFxuICAgICAgc3RhcnRUaW1lLFxuICAgICAgaG9tZVNwcmVhZDogZXZlbnQuUG9pbnRTcHJlYWQgfHwgMCxcbiAgICAgIHRvdGFsU2NvcmU6IGV2ZW50Lk92ZXJVbmRlciB8fCAwLFxuICAgICAgY3JlYXRlU3ByZWFkOiBldmVudC5Qb2ludFNwcmVhZCAhPT0gbnVsbCxcbiAgICAgIGNyZWF0ZVRvdGFsU2NvcmU6IGV2ZW50Lk92ZXJVbmRlciAhPT0gbnVsbCxcbiAgICAgIG1vbmV5bGluZXM6IFtldmVudC5Ib21lVGVhbU1vbmV5TGluZSB8fCAwLCBldmVudC5Bd2F5VGVhbU1vbmV5TGluZSB8fCAwXSxcbiAgICB9KVxuICB9XG5cbiAgTG9nZ2VyLmRlYnVnKGBBdWd1ciBzcG9ydHNkYXRhaW86IFNraXBwaW5nICR7c2tpcE51bGxEYXRlfSBkdWUgdG8gbm8gZXZlbnQgZGF0ZWApXG4gIExvZ2dlci5kZWJ1ZyhgQXVndXIgc3BvcnRzZGF0YWlvOiBTa2lwcGluZyAke3NraXBTdGFydEJ1ZmZlcn0gZHVlIHRvIHN0YXJ0QnVmZmVyYClcbiAgTG9nZ2VyLmRlYnVnKGBBdWd1ciBzcG9ydHNkYXRhaW86IFNraXBwaW5nICR7c2tpcERheXNJbkFkdmFuY2V9IGR1ZSB0byBkYXlzSW5BZHZhbmNlYClcbiAgTG9nZ2VyLmRlYnVnKGBBdWd1ciBzcG9ydHNkYXRhaW86IFNraXBwaW5nICR7Y2FudENyZWF0ZX0gZHVlIHRvIG5vIG1hcmtldCB0byBjcmVhdGVgKVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2VzcyhpbnB1dC5pZCwge1xuICAgIGRhdGE6IHsgcmVzdWx0OiBjcmVhdGVFdmVudHMgfSxcbiAgfSlcbn1cblxuaW50ZXJmYWNlIEZpZ2h0U2NoZWR1bGUge1xuICBBY3RpdmU6IGJvb2xlYW5cbiAgRGF0ZVRpbWU6IHN0cmluZ1xuICBFdmVudElkOiBudW1iZXJcbiAgU3RhdHVzOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIEZpZ2h0RXZlbnQge1xuICBBY3RpdmU6IGJvb2xlYW5cbiAgRGF0ZVRpbWU6IHN0cmluZ1xuICBGaWdodHM6IEZpZ2h0W11cbiAgU3RhdHVzOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIEZpZ2h0IHtcbiAgQWN0aXZlOiBib29sZWFuXG4gIERhdGVUaW1lPzogc3RyaW5nXG4gIEZpZ2h0SWQ6IG51bWJlclxuICBGaWdodGVyczogRmlnaHRlcltdXG4gIFJlc3VsdENsb2NrOiBudW1iZXJcbiAgUmVzdWx0Um91bmQ6IG51bWJlclxuICBTdGF0dXM6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgRmlnaHRlciB7XG4gIEFjdGl2ZTogYm9vbGVhblxuICBGaWdodGVySWQ6IG51bWJlclxuICBGaXJzdE5hbWU6IHN0cmluZ1xuICBMYXN0TmFtZTogc3RyaW5nXG4gIE1vbmV5bGluZTogbnVtYmVyXG4gIFdpbm5lcjogYm9vbGVhblxufVxuXG5jb25zdCBnZXRGaWdodFNjaGVkdWxlID0gYXN5bmMgKFxuICBpZDogc3RyaW5nLFxuICBzcG9ydDogc3RyaW5nLFxuICBsZWFndWU6IHN0cmluZyxcbiAgc2Vhc29uOiBzdHJpbmcsXG4gIGV4ZWM6IEV4ZWN1dGUsXG4gIGNvbnRleHQ6IEFkYXB0ZXJDb250ZXh0LFxuKTogUHJvbWlzZTxGaWdodFNjaGVkdWxlW10+ID0+IHtcbiAgY29uc3QgaW5wdXQgPSB7XG4gICAgaWQsXG4gICAgZGF0YToge1xuICAgICAgc3BvcnQsXG4gICAgICBsZWFndWUsXG4gICAgICBzZWFzb24sXG4gICAgICBlbmRwb2ludDogJ3NjaGVkdWxlJyxcbiAgICB9LFxuICB9XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZXhlYyhpbnB1dCwgY29udGV4dClcbiAgcmV0dXJuIChyZXNwb25zZS5yZXN1bHQgYXMgRmlnaHRTY2hlZHVsZVtdKS5maWx0ZXIoKGV2ZW50KSA9PiBldmVudC5BY3RpdmUpXG59XG5cbmNvbnN0IGdldEZpZ2h0cyA9IGFzeW5jIChcbiAgaWQ6IHN0cmluZyxcbiAgc3BvcnQ6IHN0cmluZyxcbiAgZXZlbnRJZDogbnVtYmVyLFxuICBleGVjOiBFeGVjdXRlLFxuICBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCxcbik6IFByb21pc2U8RmlnaHRbXT4gPT4ge1xuICBjb25zdCBpbnB1dCA9IHtcbiAgICBpZCxcbiAgICBkYXRhOiB7XG4gICAgICBzcG9ydCxcbiAgICAgIGV2ZW50SWQsXG4gICAgICBlbmRwb2ludDogJ2V2ZW50JyxcbiAgICB9LFxuICB9XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZXhlYyhpbnB1dCwgY29udGV4dClcbiAgY29uc3QgZmlnaHRzID0gKHJlc3BvbnNlLnJlc3VsdCBhcyBGaWdodEV2ZW50KS5GaWdodHNcbiAgcmV0dXJuIGZpZ2h0cy5maWx0ZXIoKGZpZ2h0KSA9PiBmaWdodC5BY3RpdmUpXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVGaWdodGVyOiBFeGVjdXRlID0gYXN5bmMgKGlucHV0LCBjb250ZXh0KSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoaW5wdXQsIGNyZWF0ZVBhcmFtcylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3Qgc3BvcnQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuc3BvcnQudG9Mb3dlckNhc2UoKVxuICBpZiAoIVNQT1JUU19TVVBQT1JURUQuaW5jbHVkZXMoc3BvcnQpKSB7XG4gICAgdGhyb3cgRXJyb3IoYFVua25vd24gc3BvcnQgZm9yIFNwb3J0c2RhdGFpbzogJHtzcG9ydH1gKVxuICB9XG5cbiAgY29uc3QgZGF5c0luQWR2YW5jZSA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5kYXlzSW5BZHZhbmNlXG4gIGNvbnN0IGNvbnRyYWN0OiBldGhlcnMuQ29udHJhY3QgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuY29udHJhY3RcblxuICBjb25zdCBzcG9ydHNkYXRhaW9FeGVjID0gU3BvcnRzZGF0YWlvLm1ha2VFeGVjdXRlKFNwb3J0c2RhdGFpby5tYWtlQ29uZmlnKFNwb3J0c2RhdGFpby5OQU1FKSlcblxuICBjb25zdCBmaWdodHM6IEZpZ2h0W10gPSBbXVxuXG4gIGNvbnN0IGxlYWd1ZXMgPSBbJ1VGQyddXG4gIGZvciAoY29uc3QgbGVhZ3VlIG9mIGxlYWd1ZXMpIHtcbiAgICBjb25zdCBzZWFzb24gPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcbiAgICBMb2dnZXIuZGVidWcoYEdldHRpbmcgZmlnaHQgc2NoZWR1bGUgZm9yIGxlYWd1ZSAke2xlYWd1ZX0gaW4gc2Vhc29uICR7c2Vhc29ufS5gKVxuICAgIGNvbnN0IHNjaGVkdWxlID0gKFxuICAgICAgYXdhaXQgZ2V0RmlnaHRTY2hlZHVsZShpbnB1dC5pZCwgc3BvcnQsIGxlYWd1ZSwgYCR7c2Vhc29ufWAsIHNwb3J0c2RhdGFpb0V4ZWMsIGNvbnRleHQpXG4gICAgKS5maWx0ZXIoKGV2ZW50KSA9PiBldmVudC5TdGF0dXMgPT09ICdTY2hlZHVsZWQnKVxuXG4gICAgTG9nZ2VyLmRlYnVnKGBHZXR0aW5nICR7c2NoZWR1bGUubGVuZ3RofSBldmVudHMgZnJvbSBzZWFzb24sIHRoZW4gZmlsdGVyaW5nIG91dCB1bnNjaGVkdWxlZGApXG4gICAgZm9yIChjb25zdCBldmVudCBvZiBzY2hlZHVsZSkge1xuICAgICAgY29uc3QgZXZlbnRGaWdodHMgPSAoXG4gICAgICAgIGF3YWl0IGdldEZpZ2h0cyhpbnB1dC5pZCwgc3BvcnQsIGV2ZW50LkV2ZW50SWQsIHNwb3J0c2RhdGFpb0V4ZWMsIGNvbnRleHQpXG4gICAgICApXG4gICAgICAgIC5maWx0ZXIoKGZpZ2h0KSA9PiBmaWdodC5TdGF0dXMgPT09ICdTY2hlZHVsZWQnKVxuICAgICAgICAubWFwKChmaWdodCkgPT4gKHsgLi4uZmlnaHQsIERhdGVUaW1lOiBldmVudC5EYXRlVGltZSB9KSlcbiAgICAgIGZpZ2h0cy5wdXNoKC4uLmV2ZW50RmlnaHRzKVxuICAgIH1cbiAgfVxuXG4gIExvZ2dlci5kZWJ1ZyhgQXVndXIgc3BvcnRzZGF0YWlvOiBHb3QgJHtmaWdodHMubGVuZ3RofSBmaWdodHMgZnJvbSBkYXRhIHByb3ZpZGVyYClcbiAgbGV0IHNraXBOdWxsRGF0ZSA9IDAsXG4gICAgc2tpcERheXNJbkFkdmFuY2UgPSAwLFxuICAgIHNraXBPZGROdW1iZXJGaWdodGVycyA9IDAsXG4gICAgY2FudENyZWF0ZSA9IDBcblxuICAvLyBmaWx0ZXIgbWFya2V0cyBhbmQgYnVpbGQgcGF5bG9hZHMgZm9yIG1hcmtldCBjcmVhdGlvblxuICBjb25zdCBjcmVhdGVFdmVudHM6IENyZWF0ZUZpZ2h0ZXJFdmVudFtdID0gW11cbiAgZm9yIChjb25zdCBmaWdodCBvZiBmaWdodHMpIHtcbiAgICBpZiAoIWZpZ2h0LkRhdGVUaW1lKSB7XG4gICAgICBza2lwTnVsbERhdGUrK1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gZ2V0RXBvY2hUaW1lKGZpZ2h0LkRhdGVUaW1lKVxuICAgIGNvbnN0IGRpZmZUaW1lID0gc3RhcnRUaW1lIC0gRGF0ZS5ub3coKVxuICAgIGlmIChkaWZmVGltZSAvICgxMDAwICogMzYwMCAqIDI0KSA+IGRheXNJbkFkdmFuY2UpIHtcbiAgICAgIHNraXBEYXlzSW5BZHZhbmNlKytcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnQgPSBhd2FpdCBjb250cmFjdC5nZXRFdmVudChmaWdodC5GaWdodElkKVxuICAgIGlmIChldmVudC5ldmVudFN0YXR1cyAhPT0gMCkge1xuICAgICAgY2FudENyZWF0ZSsrXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGNvbnN0IGZpZ2h0ZXJzID0gZmlnaHQuRmlnaHRlcnMuZmlsdGVyKChmaWdodGVyKSA9PiBmaWdodGVyLkFjdGl2ZSlcbiAgICBpZiAoZmlnaHRlcnMubGVuZ3RoICE9PSAyKSB7XG4gICAgICBza2lwT2RkTnVtYmVyRmlnaHRlcnMrK1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBjb25zdCBtb25leWxpbmVzID0gZmlnaHRlcnMubWFwKChmaWdodGVyKSA9PiBmaWdodGVyLk1vbmV5bGluZSlcblxuICAgIGNyZWF0ZUV2ZW50cy5wdXNoKHtcbiAgICAgIGlkOiBCaWdOdW1iZXIuZnJvbShmaWdodC5GaWdodElkKSxcbiAgICAgIGZpZ2h0ZXJBOiBmaWdodGVyc1swXS5GaWdodGVySWQsXG4gICAgICBmaWdodGVyQW5hbWU6IGAke2ZpZ2h0ZXJzWzBdLkZpcnN0TmFtZX0gJHtmaWdodGVyc1swXS5MYXN0TmFtZX1gLFxuICAgICAgZmlnaHRlckI6IGZpZ2h0ZXJzWzFdLkZpZ2h0ZXJJZCxcbiAgICAgIGZpZ2h0ZXJCbmFtZTogYCR7ZmlnaHRlcnNbMV0uRmlyc3ROYW1lfSAke2ZpZ2h0ZXJzWzFdLkxhc3ROYW1lfWAsXG4gICAgICBzdGFydFRpbWUsXG4gICAgICBtb25leWxpbmVzLFxuICAgIH0pXG4gIH1cblxuICBMb2dnZXIuZGVidWcoYEF1Z3VyIHNwb3J0c2RhdGFpbzogU2tpcHBpbmcgJHtza2lwTnVsbERhdGV9IGR1ZSB0byBubyBldmVudCBkYXRlYClcbiAgTG9nZ2VyLmRlYnVnKGBBdWd1ciBzcG9ydHNkYXRhaW86IFNraXBwaW5nICR7c2tpcERheXNJbkFkdmFuY2V9IGR1ZSB0byBkYXlzSW5BZHZhbmNlYClcbiAgTG9nZ2VyLmRlYnVnKFxuICAgIGBBdWd1ciBzcG9ydHNkYXRhaW86IFNraXBwaW5nICR7c2tpcE9kZE51bWJlckZpZ2h0ZXJzfSBkdWUgdG8gb2RkIG51bWJlciBvZiBmaWdodGVyc2AsXG4gIClcbiAgTG9nZ2VyLmRlYnVnKGBBdWd1ciBzcG9ydHNkYXRhaW86IFNraXBwaW5nICR7Y2FudENyZWF0ZX0gZHVlIHRvIG5vIG1hcmtldCB0byBjcmVhdGVgKVxuXG4gIHJldHVybiBSZXF1ZXN0ZXIuc3VjY2VzcyhpbnB1dC5pZCwge1xuICAgIGRhdGE6IHsgcmVzdWx0OiBjcmVhdGVFdmVudHMgfSxcbiAgfSlcbn1cblxuY29uc3QgZXZlbnRTdGF0dXM6IHsgW3N0YXR1czogc3RyaW5nXTogbnVtYmVyIH0gPSB7XG4gIFNjaGVkdWxlZDogMSxcbiAgSW5Qcm9ncmVzczogMCwgLy8gVE9ETzogQ2xhcmlmeT8/P1xuICBGaW5hbDogMixcbiAgJ0YvT1QnOiAwLCAvLyBUT0RPOiBDbGFyaWZ5Pz8/XG4gIFN1c3BlbmRlZDogNCwgLy8gVHJlYXQgYXMgY2FuY2VsZWRcbiAgUG9zdHBvbmVkOiAzLFxuICBEZWxheWVkOiAwLCAvLyBUT0RPOiBDbGFyaWZ5Pz8/XG4gIENhbmNlbGVkOiA0LFxufVxuXG5jb25zdCByZXNvbHZlUGFyYW1zID0ge1xuICBzcG9ydDogdHJ1ZSxcbiAgZXZlbnRJZDogdHJ1ZSxcbn1cblxuY29uc3QgZmluZEV2ZW50U2NvcmUgPSBhc3luYyAoXG4gIGpvYlJ1bklEOiBzdHJpbmcsXG4gIHNwb3J0OiBzdHJpbmcsXG4gIGV2ZW50SWQ6IG51bWJlcixcbiAgZXhlYzogRXhlY3V0ZSxcbiAgY29udGV4dDogQWRhcHRlckNvbnRleHQsXG4pOiBQcm9taXNlPENvbW1vblNjb3JlcyB8IHVuZGVmaW5lZD4gPT4ge1xuICBjb25zdCBzY29yZXMgPSBhd2FpdCBnZXRTY29yZXMoam9iUnVuSUQsIHNwb3J0LCBleGVjLCBjb250ZXh0KVxuICByZXR1cm4gc2NvcmVzLmZpbmQoKGdhbWUpID0+IGdhbWUuR2FtZUlEID09PSBldmVudElkKVxufVxuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVRlYW06IEV4ZWN1dGUgPSBhc3luYyAoaW5wdXQsIGNvbnRleHQpID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihpbnB1dCwgcmVzb2x2ZVBhcmFtcylcbiAgaWYgKHZhbGlkYXRvci5lcnJvcikgdGhyb3cgdmFsaWRhdG9yLmVycm9yXG5cbiAgY29uc3QgZXZlbnRJZCA9IE51bWJlcih2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuZXZlbnRJZClcbiAgY29uc3Qgc3BvcnQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEuc3BvcnRcbiAgY29uc3Qgc3BvcnRzZGF0YWlvRXhlYyA9IFNwb3J0c2RhdGFpby5tYWtlRXhlY3V0ZShTcG9ydHNkYXRhaW8ubWFrZUNvbmZpZyhTcG9ydHNkYXRhaW8uTkFNRSkpXG5cbiAgY29uc3QgZXZlbnQgPSBhd2FpdCBmaW5kRXZlbnRTY29yZShpbnB1dC5pZCwgc3BvcnQsIGV2ZW50SWQsIHNwb3J0c2RhdGFpb0V4ZWMsIGNvbnRleHQpXG4gIGlmICghZXZlbnQpIHtcbiAgICB0aHJvdyBFcnJvcihgVW5hYmxlIHRvIGZpbmQgZXZlbnQgJHtldmVudElkfWApXG4gIH1cblxuICBjb25zdCBzdGF0dXMgPSBldmVudFN0YXR1c1tldmVudC5TdGF0dXNdXG4gIGlmICghc3RhdHVzKSB7XG4gICAgdGhyb3cgRXJyb3IoYFVua25vd24gc3RhdHVzOiAke2V2ZW50LlN0YXR1c31gKVxuICB9XG5cbiAgY29uc3QgcmVzb2x2ZUV2ZW50OiBSZXNvbHZlVGVhbSA9IHtcbiAgICBpZDogQmlnTnVtYmVyLmZyb20oZXZlbnQuR2FtZUlEKSxcbiAgICBzdGF0dXMsXG4gICAgaG9tZVNjb3JlOiBldmVudC5Ib21lU2NvcmUgfHwgMCxcbiAgICBhd2F5U2NvcmU6IGV2ZW50LkF3YXlTY29yZSB8fCAwLFxuICB9XG5cbiAgcmV0dXJuIFJlcXVlc3Rlci5zdWNjZXNzKGlucHV0LmlkLCB7XG4gICAgZGF0YTogeyByZXN1bHQ6IHJlc29sdmVFdmVudCB9LFxuICB9KVxufVxuXG5jb25zdCBnZXRGaWdodCA9IGFzeW5jIChcbiAgaWQ6IHN0cmluZyxcbiAgc3BvcnQ6IHN0cmluZyxcbiAgZmlnaHRJZDogbnVtYmVyLFxuICBleGVjOiBFeGVjdXRlLFxuICBjb250ZXh0OiBBZGFwdGVyQ29udGV4dCxcbik6IFByb21pc2U8RmlnaHQ+ID0+IHtcbiAgY29uc3QgaW5wdXQgPSB7XG4gICAgaWQsXG4gICAgZGF0YToge1xuICAgICAgc3BvcnQsXG4gICAgICBmaWdodElkLFxuICAgICAgZW5kcG9pbnQ6ICdmaWdodCcsXG4gICAgfSxcbiAgfVxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGV4ZWMoaW5wdXQsIGNvbnRleHQpXG4gIHJldHVybiByZXNwb25zZS5yZXN1bHRcbn1cblxuZXhwb3J0IGNvbnN0IHJlc29sdmVGaWdodDogRXhlY3V0ZSA9IGFzeW5jIChpbnB1dCwgY29udGV4dCkgPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKGlucHV0LCByZXNvbHZlUGFyYW1zKVxuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3JcblxuICBjb25zdCBmaWdodElkID0gTnVtYmVyKHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5ldmVudElkKVxuICBjb25zdCBzcG9ydCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5zcG9ydFxuICBjb25zdCBzcG9ydHNkYXRhaW9FeGVjID0gU3BvcnRzZGF0YWlvLm1ha2VFeGVjdXRlKFNwb3J0c2RhdGFpby5tYWtlQ29uZmlnKFNwb3J0c2RhdGFpby5OQU1FKSlcblxuICBMb2dnZXIuZGVidWcoYEdldHRpbmcgZmlnaHQgJHtpbnB1dC5pZH0gZm9yIHNwb3J0ICR7c3BvcnR9LCB3aGljaCBoYXMgZmlnaHRJZCAke2ZpZ2h0SWR9YClcbiAgY29uc3QgZmlnaHQgPSBhd2FpdCBnZXRGaWdodChpbnB1dC5pZCwgc3BvcnQsIGZpZ2h0SWQsIHNwb3J0c2RhdGFpb0V4ZWMsIGNvbnRleHQpXG5cbiAgaWYgKCFmaWdodCkge1xuICAgIHRocm93IEVycm9yKGBVbmFibGUgdG8gZmluZCBmaWdodCAke2ZpZ2h0SWR9YClcbiAgfVxuXG4gIGNvbnN0IHN0YXR1cyA9IGV2ZW50U3RhdHVzW2ZpZ2h0LlN0YXR1c11cbiAgaWYgKCFzdGF0dXMpIHtcbiAgICB0aHJvdyBFcnJvcihgVW5rbm93biBzdGF0dXM6ICR7ZmlnaHQuU3RhdHVzfWApXG4gIH1cblxuICBjb25zdCB3aW5uZXJzID0gZmlnaHQuRmlnaHRlcnMuZmlsdGVyKChmaWdodGVyKSA9PiBmaWdodGVyLkFjdGl2ZSAmJiBmaWdodGVyLldpbm5lcilcblxuICBjb25zdCBkcmF3ID0gd2lubmVycy5sZW5ndGggIT09IDFcbiAgbGV0IHdpbm5lcklkID0gMFxuICBsZXQgZmlnaHRlcnMgPSBmaWdodC5GaWdodGVyc1xuICBpZiAoIWRyYXcpIHtcbiAgICAvLyBUaGUgZmlnaHRlcnMgYXJyYXkgZm9yIGFuIGV2ZW50IGNhbiBjb250YWluIHByZXZpb3VzLCBub3cgbm9uLWFjdGl2ZSBmaWdodGVycyxcbiAgICAvLyBhcyB3ZWxsIGFzIHRoZSBjdXJyZW50IGFjdGl2ZSBmaWdodGVycy4gRHVyaW5nIHRoZSBjcmVhdGlvbiBjb2RlLCB0aGUgbm9uLWFjdGl2ZVxuICAgIC8vIGZpZ2h0ZXJzIGFyZSBmaWx0ZXJlZCBidXQga2VwdCBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgZGF0YSBzb3VyY2UgcHJvdmlkZXMuXG4gICAgLy9cbiAgICAvLyBJbiB0aGUgY2FzZSB3aGVyZSBhbiBldmVudCBpcyBtYXJrZWQgQ2FuY2VsZWQsIGJvdGggdGhlIGZpZ2h0ZXJzIGdvIHRvIGBBY3RpdmUgPSBmYWxzZWBcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHRvIG9ubHkgZG8gdGhpcyBmaWx0ZXIgaGVyZSBpZiB0aGUgZmlnaHQgaXMgaW5kZWVkIGEgZHJhdywgb3IgZWxzZSB0aGVcbiAgICAvLyBpZGVudGlmaWNhdG9uIG9mIGZpZ2h0ZXJBIGFuZCBmaWdodGVyQiBiZWxvdyB3b3VsZCBicmVhay5cbiAgICAvL1xuICAgIC8vIEluIHRoZSBjYXNlIHdoZXJlIHRoaXMgaXMgYSBkcmF3LCBBTkQgdGhlcmUgd2FzIGEgY2hhbmdlIG9mIGZpZ2hlcnMsIHNldHRpbmcgdGhlIGRlZmF1bHRcbiAgICAvLyBmaWdoZXJzIGxpc3QgdG8gdGhlIHJhdyBhcnJheSwgYW5kIGluZGV4aW5nIHRvIDAgYW5kIDEgY291bGQgaW5kZWVkIGNhdXNlIHRoaXMgY2FsbCB0b1xuICAgIC8vIHByb3ZpZGUgdGhlIGluY29ycmVjdCBmaWdodGVyIElEIGZvciBmaWdodGVyQSwgYnV0IGluIGJvdGggb2YgdGhlc2UgY2FzZXMgdGhlIG1hcmtldCByZXNvbHZlc1xuICAgIC8vIGFzIGBObyBDb250ZXN0YCBzbyBpdCBzdGlsbCBlbmRzIHVwIGdpdmluZyBwcm9wZXIgcmVzb2x1dGlvbi5cbiAgICBmaWdodGVycyA9IGZpZ2h0ZXJzLmZpbHRlcigoZmlnaHRlcikgPT4gZmlnaHRlci5BY3RpdmUpXG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgZHJhdyB0aGUgd2lubmVySWQgaXMga2VwdCBhcyAwICh1bmluaXRpYWxpemVkKVxuICAgIHdpbm5lcklkID0gd2lubmVyc1swXS5GaWdodGVySWRcbiAgfVxuXG4gIGNvbnN0IHJlc29sdmVFdmVudDogUmVzb2x2ZUZpZ2h0ID0ge1xuICAgIGlkOiBCaWdOdW1iZXIuZnJvbShmaWdodC5GaWdodElkKSxcbiAgICBzdGF0dXMsXG4gICAgZmlnaHRlckE6IGZpZ2h0ZXJzWzBdLkZpZ2h0ZXJJZCxcbiAgICBmaWdodGVyQjogZmlnaHRlcnNbMV0uRmlnaHRlcklkLFxuICAgIHdpbm5lcklkLFxuICAgIGRyYXcsXG4gIH1cblxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3MoaW5wdXQuaWQsIHtcbiAgICBkYXRhOiB7IHJlc3VsdDogcmVzb2x2ZUV2ZW50IH0sXG4gIH0pXG59XG4iXX0=