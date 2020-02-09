import * as express from "express";
import { Request, Response } from "express";
import axios from "axios"

export default class RiotController{
    public path = "/api/riot";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/summoner`, this.fetchSummoner);
    }

    private fetchSummoner = async (request: Request, response: Response) => {

        const accountId =
            await axios.get("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Lyzal", {
                params: {
                    api_key: process.env.RIOT_API_KEY as string
                }
            })
            .then(res => {
                if(res.status === 200){
                    return res.data.accountId;
                }
            })
            .catch(err => {
                console.log(err)
            });

        // Fetch match history
        const matchHistory = await this.fetchMatchHistory(accountId);
        console.log(matchHistory);
        const matchDtoList = await this.fetchGames(matchHistory);
        console.log(matchDtoList);
    };

    private fetchMatchHistory = async (accountId: string) => {

        return await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`, {
                params: {
                    api_key: process.env.RIOT_API_KEY as string
                }
            })
                .then(res => {
                    if(res.status === 200){
                        return res.data.matches.slice(0,5);
                    }
                })
                .catch(err => {
                    console.log(err)
                });
    };

    private fetchGames = (matchHistory: any) => {
        const matchesDto = [];

        // Loop through match history and populate game data
        matchHistory.forEach(async (match) => {
            const gameData =
                await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${match.gameId}`, {
                params: {
                    api_key: process.env.RIOT_API_KEY as string
                }
                 })
                .then(async res => {
                    if(res.status === 200){
                        return res.data;
                    }
                })
                .catch(err => {
                    console.log(err)
                });
            await matchesDto.push(gameData)
        });

        return matchesDto;
    }
}
