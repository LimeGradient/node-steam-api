import { createPromiseReturn, createSteamURL } from "../util"

/**
 * The handler for ISteamUserStats requests
 */
export default class ISteamUserStats {
    private apiKey: string

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    /**
     * Get Global Achievement Percentages For App
     * @param gameID the app id for the game
     * @returns A string promise containing the data
     */
    getGlobalAchievementPercentagesForApp(gameID: number): Promise<string> {
        const url = createSteamURL("ISteamUserStats", "GetGlobalAchievementPercentagesForApp", "v2")
        url.searchParams.set("gameid", gameID.toString())
        
        return createPromiseReturn(url)
    }

    /**
     * Get Global Stats For Game
     * @param appid The app id for the game
     * @param count Number of stats to get data for
     * @param names Names of stat to get data for
     * @param startdate (Optional) Start date for daily totals in unix epoch timestamp format
     * @param enddate (Optional) End date for daily totals in unix epoch timestamp format
     * @returns A string promise containing the data
     */
    getGlobalStatsForGame(appid: number, count: number, names: string[], startdate: number | undefined = undefined, enddate: number | undefined = undefined) {
        const url = createSteamURL("ISteamUserStats", "GetGlobalStatsForGame", "v1", this.apiKey)
        url.searchParams.set("appid", appid.toString())
        url.searchParams.set("count", count.toString())
        
        names.forEach((name: string) => {
            url.searchParams.set(`name[${names.indexOf(name)}]`, name)
        })

        if (startdate !== undefined) {
            url.searchParams.set("startdate", startdate.toString())
        }

        if (enddate !== undefined) {
            url.searchParams.set("enddate", enddate.toString())
        }

        return createPromiseReturn(url)
    }

    /**
     * Get Number Of Current Players for a game
     * @param appid The app id of the game
     * @returns A string promise containing the data
     */
    getNumberOfCurrentPlayers(appid: number): Promise<string> {
        const url = createSteamURL("ISteamUserStats", "GetNumberOfCurrentPlayers", "v1")
        url.searchParams.set("appid", appid.toString())
        return createPromiseReturn(url)
    }

    /**
     * Get a Players Achievements
     * @param steamid The users steam ID
     * @param appid The app id of the game
     * @param language (Optional) Language to return data for
     * @returns A string promise containing the data
     */
    getPlayerAchievements(steamid: number, appid: number, language: string | undefined = undefined): Promise<string> {
        const url = createSteamURL("ISteamUserStats", "GetPlayerAchievements", "v1", this.apiKey)
        url.searchParams.set("steamid", steamid.toString())
        url.searchParams.set("appid", appid.toString())
        
        if (language !== undefined) {
            url.searchParams.set("l", language)
        }

        return createPromiseReturn(url)
    }

    /**
     * Gets the complete list of stats and achievements for the specified game
     * @param appid The app id of the game
     * @param language (Optional) Language to return data for
     * @returns A string promise containing the data
     */
    getSchemaForGame(appid: number, language: string | undefined = undefined): Promise<string> {
        const url = createSteamURL("ISteamUserStats", "GetSchemaForGame", "v2", this.apiKey)
        url.searchParams.set("appid", appid.toString())

        if (language !== undefined) {
            url.searchParams.set("l", language)
        }

        return createPromiseReturn(url)
    }

    /**
     * Gets the list of stats that the specified user has set in an app
     * @param steamid The users steam id
     * @param appid The app id for the game
     * @returns A string promise containing the data
     */
    getUserStatsForGame(steamid: number, appid: number): Promise<string> {
        const url = createSteamURL("ISteamUserStats", "GetUserStatsForGame", "v2", this.apiKey)
        url.searchParams.set("steamid", steamid.toString())
        url.searchParams.set("appid", appid.toString())
        return createPromiseReturn(url)
    }
}