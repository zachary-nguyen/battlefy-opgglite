import React from "react";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    text_style: {
    fontWeight: 600,
    display: "inline-flex"
    },
    red_text: {
        display: "inline-flex",
        fontWeight: 600,
        color: "red"
    }
}));


interface Props {
    stats: any;
}

const KDA = (props: Props) => {

    const classes = useStyles();

    const calculateRatio = (kills: number, deaths: number, assists: number) => {
        const kda = (kills + assists) / deaths;

        if( deaths === 0) {
            return "Perfect KDA"
        } else {
            return `${kda.toFixed(2)}:1`;
        }
    };

    return(
        <Grid direction={"column"}  justify={"center"} alignContent={"center"} alignItems={"center"} container item xs={2}>
            <Grid item>
                <Typography className={classes.text_style}>{props.stats.kills}</Typography> / <Typography className={classes.red_text}>{props.stats.deaths} </Typography> / <Typography className={classes.text_style}>{props.stats.assists}</Typography>
            </Grid>
            <Grid item>
                {calculateRatio(props.stats.kills, props.stats.deaths, props.stats.assists) + "KDA"}
            </Grid>
        </Grid>
    )
};

export default KDA;

