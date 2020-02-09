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
                .then(res => console.log(res.data))
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
                  xs={6}>
                asd
            </Grid>
        </Grid>
    )

};

export default HomePage;