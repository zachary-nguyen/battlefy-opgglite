import React, {useState} from "react";
import {CircularProgress, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import SearchResults from "../../components/homepage/results/SearchResults";

const useStyles = makeStyles(() => ({
   container: {
       height: "100vh"
   },
   search_bar: {
       marginTop: "30vh"
   },
    loader: {
       marginTop: 10
    }
}));

const HomePage = () => {

    const [summoner, setSummoner] = useState<string>("");
    const [matches, setMatches] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const classes = useStyles();

    /**
     * Update summoner field on change
     * @param event The change event
     */
    const onSummonerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSummoner(event.target.value);
    };

    const onSummonerKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            setLoading(true);
            axios.get("/api/riot/summoner",{
                params: {
                    summoner
                }
            })
            .then(res => {
                // On success
                if(res.status === 200 ) {
                    setLoading(false);
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
            {loading && <CircularProgress className={classes.loader} color="secondary" />}
            {matches && !loading &&
                <SearchResults matches={matches}/>
            }
        </Grid>
    )

};

export default HomePage;