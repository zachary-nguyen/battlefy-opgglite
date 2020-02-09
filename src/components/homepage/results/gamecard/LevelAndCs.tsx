import React from  "react";
import {Grid, Typography} from "@material-ui/core";

interface Props {
    match: any;
}

const LevelAndCs = (props: Props) => {

    const calculateCsPerMinute = () => {
        const array = Object.values(props.match.timeline.creepsPerMinDeltas);
        let csPerMinTotal = 0;

        array.forEach((csPerMin: any) => {
            csPerMinTotal += csPerMin;
        });

        return csPerMinTotal / array.length;
    };

    return(
        <Grid direction={"column"} justify={"center"} alignContent={"center"} alignItems={"center"} item container xs={2}>
            <Grid item>
                <Typography variant={"body2"}>
                    {`Level${props.match.stats.champLevel}`}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant={"body2"}>
                    {`${props.match.stats.totalMinionsKilled} (${calculateCsPerMinute().toFixed(1)}) CS`}
                </Typography>
            </Grid>
        </Grid>
    )
};

export default LevelAndCs;