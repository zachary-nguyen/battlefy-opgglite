import React from "react";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Overview from "./Overview";
import KDA from "./KDA";
import LevelAndCs from "./LevelAndCs";
import ItemsList from "./ItemsList";
import ChampionSpells from "./ChampionSpells";


const useStyles = makeStyles(() => ({
    card_container: (props: Props) => ({
        backgroundColor: props.match.stats.win ? "#a3ceed" : "#e2b6b3",
        height: 100,
        marginTop: 10,
        marginBottom: 10
    })
}));

interface Props {
    match: any;
}

const GameCard = (props: Props) => {

    const classes = useStyles(props);

    return(
        <Grid className={classes.card_container}
              direction={"row"}
              container>
            <Overview match={props.match}/>
            <ChampionSpells match={props.match}/>
            <KDA stats={props.match.stats}/>
            <LevelAndCs match={props.match}/>
            <ItemsList stats={props.match.stats}/>
        </Grid>
    )
};

export default GameCard;
