import IEconService from "./services/IEconService"
import IGameServersService from "./services/IGameServersService"
import IPlayerService from "./services/IPlayerService"
import ISteamUserStats from "./services/ISteamUserStats"
import ISteamUser from "./services/ISteamUser"

/**
 * The main API handler for Steamworks requests
 */
export class SteamAPIHandler {
	apiKey: string

	IEconService: IEconService
	IGameServersService: IGameServersService
	IPlayerService: IPlayerService
	ISteamUser: ISteamUser
	ISteamUserStats: ISteamUserStats

	constructor(apiKey: string) {
		this.apiKey = apiKey
		
		// Initialize handlers
		this.IEconService = new IEconService(this.apiKey)
		this.IGameServersService = new IGameServersService(this.apiKey)
		this.IPlayerService = new IPlayerService(this.apiKey)
		this.ISteamUserStats = new ISteamUserStats(this.apiKey)
		this.ISteamUser = new ISteamUser(this.apiKey)
	}

	getAPIKey(): string {
		return this.apiKey
	}
}