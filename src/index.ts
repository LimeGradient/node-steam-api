import * as https from "node:https"

import ISteamUserStats from "./services/ISteamUserStats"
import ISteamUser from "./services/ISteamUser"
import IEconService from "./services/IEconService"

/**
 * The main API handler for Steamworks requests
 */
export class SteamAPIHandler {
	apiKey: string

	IEconService: IEconService
	ISteamUser: ISteamUser
	ISteamUserStats: ISteamUserStats

	constructor(apiKey: string) {
		this.apiKey = apiKey
		
		// Initialize handlers
		this.IEconService = new IEconService(this.apiKey)
		this.ISteamUserStats = new ISteamUserStats(this.apiKey)
		this.ISteamUser = new ISteamUser(this.apiKey)
	}

	getAPIKey(): string {
		return this.apiKey
	}
}

/**
 * Internal method used to create the steamworks api url
 */
export function createSteamURL(_interface: string, _method: string, _version: string, _apiKey: string | undefined = undefined): URL {
	const baseURL = new URL(`https://api.steampowered.com/${_interface}/${_method}/${_version}`)
	if (_apiKey === undefined) {
		return baseURL
	} else {
		baseURL.searchParams.set("key", _apiKey)
		return baseURL
	}
}

/**
 * Internal method used to create promise returns for service functions
 */
export function createPromiseReturn(url: URL): Promise<string> {
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
			let data = ''
			res.on('data', (chunk) => {
				data += chunk
			})
			res.on('end', () => {
				resolve(data)
			})
		}).on('error', (err) => {
			reject(err)
		})
	})
}