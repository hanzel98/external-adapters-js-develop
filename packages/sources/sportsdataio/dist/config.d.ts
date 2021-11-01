import { Config as ChainlinkConfig } from '@chainlink/types';
export declare const NAME = "SPORTSDATAIO";
export declare const DEFAULT_SPORT = "nfl";
export declare const DEFAULT_ENDPOINT = "scores";
export declare const DEFAULT_BASE_URL = "https://fly.sportsdata.io/v3";
export declare const ENV_NFL_SCORES_API_KEY = "NFL_SCORES_API_KEY";
export declare const ENV_MMA_STATS_API_KEY = "MMA_STATS_API_KEY";
export declare const ENV_CFB_SCORES_API_KEY = "CFB_SCORES_API_KEY";
export declare const ENV_NBA_API_KEY = "NBA_API_KEY";
export declare type Config = ChainlinkConfig & {
    nflScoresKey?: string;
    mmaStatsKey?: string;
    cfbScoresKey?: string;
    nbaKey?: string;
};
export declare const makeConfig: (prefix?: string | undefined) => Config;
//# sourceMappingURL=config.d.ts.map