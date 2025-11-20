import { createPromiseReturn, createSteamURL } from "../util"

export default class IGameServersService {
    private apiKey: string

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    getAccountList(): Promise<string> {
        const url = createSteamURL("IGameServersService", "GetAccountList", "v1", this.apiKey)
        return createPromiseReturn(url)
    }
}