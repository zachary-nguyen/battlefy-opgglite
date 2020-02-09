import React, {useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(() => ({
   container: {
       height: "100vh"
   },
   search_bar: {
       marginTop: "30vh"
   }
}));

const HomePage = () => {

    const [summoner, setSummoner] = useState<string>("");
    const [matches, setMatches] = useState<any>([]);

    const classes = useStyles();

    /**
     * Update summoner field on change
     * @param event The change event
     */
    const onSummonerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSummoner(event.target.value);
    };

    const onSummonerKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key)
        if(event.key === "Enter") {
            axios.get("/api/riot/summoner",{
                params: {
                    summoner
                }
            })
            .then(res => {
                // On success
                console.log(res)
                if(res.status === 200 ) {
                    console.log(res.data)
                    setMatches(res.data)
                }
            })
            .catch(err => console.log(err))
        }
    };

    return (
        <Grid direction={"column"}
              className={classes.container}
              alignContent={"center"}
              alignItems={"center"}
              container
        >
            <Grid container
                  alignContent={"center"}
                  justify={"center"}
                  className={classes.search_bar}
                  alignItems={"center"}
                  onKeyPress={onSummonerKeypress}
                  item
            >
                <TextField
                    label={"Enter Summoner Name"}
                    variant={"outlined"}
                    onChange={onSummonerChange}
                    value={summoner}
                    color={"primary"}
                />
            </Grid>
            <Grid item
                  alignContent={"center"}
                  justify={"center"}
                  alignItems={"center"}
                  container
                  xs={6}
            >
                {matches && matches.length > 0 &&
                    matches.map((match: any, index: number) => {
                        return (
                            <div key={index}>
                                {match.gameId}
                            </div>
                        )
                    })

                }
            </Grid>
        </Grid>
    )

};

export default HomePage;