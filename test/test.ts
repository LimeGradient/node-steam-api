const __dirname = import.meta.dirname
import dotenv from "dotenv"

dotenv.config({path: __dirname + "../.env"})

import { SteamAPIHandler } from "node-steam-api";

let apiHandler = new SteamAPIHandler(process.env.STEAM_API_KEY as string)
apiHandler.ISteamUserStats.getNumberOfCurrentPlayers(1172620).then((res) => {
    console.log(res)
})