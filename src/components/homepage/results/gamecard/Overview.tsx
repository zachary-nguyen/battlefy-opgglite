import React from "react";
import {Divider, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as Queues from "../../../../assets/queues.json";


const useStyles = makeStyles(() => ({
    card_container: {
        height: 100,
        marginTop: 10,
        marginBottom: 10
    },
    victory: {
        color: "#1a78ae",
        fontSize: 11,
        fontWeight: 600
    },
    defeat: {
        color: "red",
        fontSize: 11,
        fontWeight: 600
    },
    font11_bold: {
        fontSize: 11,
        fontWeight: 600
    },
    font11: {
        fontSize: 11,
    }
}));


interface Props {
    match: any;
}

const Overview = (props: Props) => {

    const classes = useStyles();
    const calculateTime = () => {
        const gameDate = new Date(props.match.gameCreation);
        const today = new Date();

        const date = today.getDate() - gameDate.getDate();

        return date;
    };

    const getQueueType = () => {
        const data = JSON.stringify(Queues);
        const queues = JSON.parse(data);

        const arr: any = Object.values(queues);

        const queue = arr.find((queue: any) => queue.queueId === props.match.queueId);
        console.log(queue)
        return queue.description
    };

    return (
       <Grid container xs={2} item direction={"column"}>
            <Grid item>
                <Typography className={classes.font11_bold}>{getQueueType()}</Typography>
            </Grid>
           <Grid item>
               <Typography className={classes.font11}>{calculateTime() + " days ago"}</Typography>
           </Grid>
           <Divider/>
           <Grid item>
               {props.match.stats.win ?
                <Typography className={classes.victory}>
                    Victory
                </Typography> :
               <Typography className={classes.defeat}>
                   Defeat
               </Typography>
               }
           </Grid>
           <Grid item>
               <Typography className={classes.font11}>{Math.floor(props.match.duration/60)+ "m " + props.match.duration % 60 +"s"}</Typography>
           </Grid>
       </Grid>
    )
};

export default Overview;