import { IncomingMessage } from "node:http"
import * as https from "node:https"

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
		https.get(url, (res: IncomingMessage) => {
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