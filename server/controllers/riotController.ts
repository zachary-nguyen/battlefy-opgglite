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
            await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(request.query.summoner)}`, {
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

        // Match details list
        const matchDtoList = await this.fetchGames(matchHistory);

        if(matchHistory && matchDtoList){
            const responseData = this.createResponseData(accountId,matchDtoList);

            return response.status(200).json(responseData);
        } else {
            return response.status(500).json("Error finding latest matches");
        }
    };

    private fetchMatchHistory = async (accountId: string) => {

        return await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${encodeURI(accountId)}`, {
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

    private fetchGames = async (matchHistory: any) => {
        const matchesDto = [];

        // Loop through match history and populate game data
        for(const match of matchHistory) {
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
        }
        console.log(matchesDto)
        return matchesDto;
    };

    /**
     * Format response data for client
     * @param accountId
     * @param matchDtoList
     */
    private createResponseData = (accountId, matchDtoList) => {
        const matchList = [];
        matchDtoList.forEach((match) => {
             const gameData: any = this.getGameData(match.participantIdentities, match.participants, accountId);
             gameData.duration = match.gameDuration;
             gameData.gameCreation = match.gameCreation;
             gameData.queueId = match.queueId;
             matchList.push(gameData);
        });

        return matchList;
    };

    /**
     * Find all player game data
     * @param participantsIdentities
     * @param participants
     * @param accountId
     */
    private getGameData = (participantIdentities: [], participants: [], accountId) => {
        const participant = participantIdentities.find((participant: any) => participant.player.accountId === accountId) as any;
        const participantId = participant.participantId;

        return  participants.find((participant: any) => participant.participantId === participantId);

    }
}
