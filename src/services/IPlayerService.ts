import { createPromiseReturn, createSteamURL, parseBool } from "../util"

/**
 * The handler for IPlayerService requests
 */
export default class IPlayerService {
    private apiKey: string

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    /**
     * Gets information about a player's recently played games
     * @param steamid The player we're asking about
     * @param count The number of games to return (0/unset: all)
     * @returns A string promise containing the data
     */
    getRecentlyPlayedGames(steamid: number, count: number): Promise<string> {
        const url = createSteamURL("IPlayerService", "GetRecentlyPlayedGames", "v1", this.apiKey)
        url.searchParams.set("steamid", steamid.toString())
        url.searchParams.set("count", count.toString())
        
        return createPromiseReturn(url)
    }

    /**
     * Gets information about a player's playtime for a single appID. The WebAPI key must be associated with this appID to get back results
     * @param steamid The player we're asking about
     * @param appid AppID that we're getting playtime for
     * @returns A string promise containing the data
     */
    getSingleGamePlaytime(steamid: number, appid: number): Promise<string> {
        const url = createSteamURL("IPlayerService", "GetSingleGamePlaytime", "v1", this.apiKey)
        url.searchParams.set("steamid", steamid.toString())
        url.searchParams.set("appid", appid.toString())

        return createPromiseReturn(url)
    }

    /**
     * Returns a list of games owned by the player if their owned games/game details are visible to you.
     * @param steamid The player we're asking about
     * @param include_appinfo true if we want additional details (name, icon) about each game
     * @param include_played_free_games Free games are excluded by default. If this is set, free games the user has played will be returned.
     * @param appids_filter if set, restricts result set to the passed in apps
     * @returns A string promise containing the data
     */
    getOwnedGames(steamid: number, include_appinfo: boolean, include_played_free_games: boolean, appids_filter: number): Promise<string> {
        const url = createSteamURL("IPlayerService", "GetOwnedGames", "v1", this.apiKey)
        url.searchParams.set("steamid", steamid.toString())
        url.searchParams.set("include_appinfo", parseBool(include_appinfo))
        url.searchParams.set("include_played_free_games", parseBool(include_played_free_games))
        url.searchParams.set("appids_filter", appids_filter.toString())

        return createPromiseReturn(url)
    }

    /**
     * Returns the Steam Level of a user
     * @param steamid The player we're asking about
     * @returns A string promise containing the data
     */
    getSteamLevel(steamid: number): Promise<string> {
        const url = createSteamURL("IPlayerService", "GetSteamLevel", "v1", this.apiKey)
        url.searchParams.set("steamid", steamid.toString())

        return createPromiseReturn(url)
    }

    /**
     * Gets badges that are owned by a specific user
     * @param steamid The player we're asking about
     * @returns A string promise containing the data
     */
    getBadges(steamid: number): Promise<string> {
        const url = createSteamURL("IPlayerService", "GetBadges", "v1", this.apiKey)
        url.searchParams.set("steamid", steamid.toString())

        return createPromiseReturn(url)
    }

    /**
     * Gets all the quests needed to get the specified badge, and which are completed
     * @param steamid The player we're asking about
     * @param badgeid The badge we're asking about
     * @returns A string promise containing the data
     */
    getCommunityBadgeProgress(steamid: number, badgeid: number): Promise<string> {
        const url = createSteamURL("IPlayerService", "GetCommunityBadgeProgress", "v1", this.apiKey)
        url.searchParams.set("steamid", steamid.toString())
        url.searchParams.set("badgeid", badgeid.toString())

        return createPromiseReturn(url)
    }
}