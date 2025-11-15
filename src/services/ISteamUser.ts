import { createPromiseReturn, createSteamURL, isValidURL } from "../util"

/**
 * The handler for ISteamUser requests
 */
export default class ISteamUser {
    private apiKey: string

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    /**
     * Get a users friends list, if the users friends list is marked as private this will return a 401 code
     * @param steamid The steam id of the user
     * @param relationship (Optional) Relationship type (ex: friend)
     * @returns A string promise containing the data
     */
    getFriendList(steamid: number, relationship: string | undefined = undefined): Promise<string> {
        const url = createSteamURL("ISteamUser", "GetFriendList", "v1", this.apiKey)
        url.searchParams.set("steamid", steamid.toString())

        if (relationship !== undefined) {
            url.searchParams.set("relationship", relationship)
        }

        return createPromiseReturn(url)
    }

    /**
     * Get player bans
     * @param steamids A comma delimited list of steam ids 
     * @returns A string promise containing the data
     */
    getPlayerBans(steamids: string) {
        const url = createSteamURL("ISteamUser", "GetPlayerBans", "v1", this.apiKey)
        url.searchParams.set("steamids", steamids)
        return createPromiseReturn(url)
    }

    /**
     * Get data about a user (ex: profile url, avatar, persona name)
     * @param steamids A comma delimited list of steam ids (max 100)
     * @returns A string promise containing the data
     */
    getPlayerSummaries(steamids: string) {
        const url = createSteamURL("ISteamUser", "GetPlayerSummaries", "v2", this.apiKey)
        url.searchParams.set("steamids", steamids)
        return createPromiseReturn(url)
    }

    /**
     * Resolve a users vanity url to a steam id. Can use either the complete steam community url (ex: https://steamcommunity.com/id/limegradient/) or just the id (ex: limegradient)
     * @param vanityurl The vanity url to get a steam id for
     * @param url_type (Optional) The type of vanity URL. 1 (default): Individual profile, 2: Group, 3: Official game group
     * @returns 
     */
    resolveVanityURL(vanityurl: string, url_type: number | undefined = undefined) {
        const url = createSteamURL("ISteamUser", "ResolveVanityURL", "v1", this.apiKey)

        if (isValidURL(vanityurl)) {
            const _url = (vanityurl as string).split('/')
            const lastSegment = _url.pop() || _url.pop()

            url.searchParams.set("vanityurl", lastSegment as string)
        } else {
            url.searchParams.set("vanityurl", vanityurl)
        }

        if (url_type !== undefined) {
            url.searchParams.set("url_type", url_type.toString())
        }

        return createPromiseReturn(url)
    }
}