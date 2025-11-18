import { createPromiseReturn, createSteamURL, parseBool } from "../util"

/**
 * The handler for IEconService requests
 */
export default class IEconService {
    private apiKey: string

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    /**
     * Gets a history of trades
     * @param max_trades The number of trades to return information for
     * @param start_after_time The time of the last trade shown on the previous page of results, or the time of the first trade if navigating back
     * @param start_after_tradeid The tradeid shown on the previous page of results, or the ID of the first trade if navigating back
     * @param navigating_back The user wants the previous page of results, so return the previous max_trades trades before the start time and ID
     * @param get_descriptions If set, the item display data for the items included in the returned trades will also be returned
     * @param language The language to use when loading item display data
     * @param include_failed 
     * @param include_total If set, the total number of trades the account has participated in will be included in the response
     * @returns A string promise containing the data
     */
    getTradeHistory(
        max_trades: number, 
        start_after_time: number, 
        start_after_tradeid: number, 
        navigating_back: boolean, 
        get_descriptions: boolean, 
        language: string, 
        include_failed: boolean, 
        include_total: boolean
    ) {
            const url = createSteamURL("IEconService", "GetTradeHistory", "v1", this.apiKey)
            url.searchParams.set("max_trades", max_trades.toString())
            url.searchParams.set("start_after_time", start_after_time.toString())
            url.searchParams.set("start_after_tradeid", start_after_tradeid.toString())
            url.searchParams.set("navigating_back", parseBool(navigating_back))
            url.searchParams.set("get_descriptions", parseBool(get_descriptions))
            url.searchParams.set("language", language)
            url.searchParams.set("include_failed", parseBool(include_failed))
            url.searchParams.set("include_total", parseBool(include_total))

            return createPromiseReturn(url)
    }

    /**
     * Get a list of sent or recieved trade offers
     * @param get_sent_offers Request the list of sent offers.
     * @param get_recieved_offers Request the list of received offers.
     * @param get_descriptions If set, the item display data for the items included in the returned trade offers will also be returned.
     * @param language The language to use when loading item display data.
     * @param active_only Indicates we should only return offers which are still active, or offers that have changed in state since the time_historical_cutoff
     * @param historical_only Indicates we should only return offers which are not active.
     * @param time_historical_cutoff When active_only is set, offers updated since this time will also be returned
     * @returns A string promise containing the data
     */
    getTradeOffers(
        get_sent_offers: boolean, 
        get_recieved_offers: boolean, 
        get_descriptions: boolean, 
        language: string, 
        active_only: boolean, 
        historical_only: boolean,
        time_historical_cutoff: number
    ) {
        const url = createSteamURL("IEconService", "GetTradeOffers", "v1", this.apiKey)
        url.searchParams.set("get_sent_offers", parseBool(get_sent_offers))
        url.searchParams.set("get_recieved_offers", parseBool(get_recieved_offers))
        url.searchParams.set("get_descriptions", parseBool(get_descriptions))
        url.searchParams.set("language", language)
        url.searchParams.set("active_only", parseBool(active_only))
        url.searchParams.set("historical_only", parseBool(historical_only))
        url.searchParams.set("time_historical_cutoff", time_historical_cutoff.toString())

        return createPromiseReturn(url)
    }

    /**
     * Gets a specific trade offer
     * @param tradeofferid The id of the trade offer
     * @param language The language to return
     * @returns A string promise containing the data
     */
    getTradeOffer(tradeofferid: number, language: string) {
        const url = createSteamURL("IEconService", "GetTradeOffer", "v1", this.apiKey)
        url.searchParams.set("tradeofferid", tradeofferid.toString())
        url.searchParams.set("language", language)

        return createPromiseReturn(url)
    }

    /**
     * Get counts of pending and new trade offers
     * @param time_last_visit The time the user last visited. If not passed, will use the time the user last visited the trade offer page.
     * @returns A string promise containing the data
     */
    getTradeOffersSummary(time_last_visit: number) {
        const url = createSteamURL("IEconService", "GetTradeOffersSummary", "v1", this.apiKey)
        url.searchParams.set("time_last_visit", time_last_visit.toString())

        return createPromiseReturn(url)
    }
}