const __dirname = import.meta.dirname
import dotenv from "dotenv"
import * as path from "node:path"

dotenv.config({path: path.resolve(__dirname, "../.env")})

import { SteamAPIHandler } from "node-steam-api";

let apiHandler = new SteamAPIHandler(process.env.STEAM_API_KEY as string)
apiHandler.ISteamUser.resolveVanityURL("https://steamcommunity.com/id/limegradient/", 1).then((res) => {
    console.log(res)
})