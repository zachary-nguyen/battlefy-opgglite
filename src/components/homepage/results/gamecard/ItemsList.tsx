import React from "react";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    margin_right: {
        marginRight: 2
    },
    empty_item: {
        backgroundColor: "grey",
        marginRight: 2,
        height: 22,
        width: 22
    }
}));

interface Props {
    stats: any;
}

const ItemsList = (props: Props) => {

    const topRow = [props.stats.item0,props.stats.item1,props.stats.item2,props.stats.item6];
    const bottomRow = [props.stats.item4,props.stats.item5,props.stats.item3];
    const classes = useStyles();

    return (
        <Grid container direction={"column"} justify={"center"} alignContent={"center"} alignItems={"center"} item xs={3}>
            <Grid container direction={"row"} item>
                {topRow && topRow.length > 0 &&
                    topRow.map((item, index) => {
                        if(item !== 0){
                            return(
                                <Grid key={"top-"+index} className={classes.margin_right} item>
                                    <img height={22} width={22} src={require(`../../../../assets/items/${item}.png`)}
                                         alt={"item0"}/>
                                </Grid>
                            )
                        } else {
                            return(
                                <Grid key={"top-"+index} className={classes.empty_item} item/>
                            )
                        }
                })}
            </Grid>
            <Grid container direction={"row"} item>
                {bottomRow && bottomRow.length > 0 &&
                bottomRow.map((item, index) => {
                    if(item !== 0){
                        return(
                            <Grid key={"bottom-"+index} className={classes.margin_right} item>
                                <img height={22} width={22} src={require(`../../../../assets/items/${item}.png`)}
                                     alt={"item0"}/>
                            </Grid>
                        )
                    } else {
                        return(
                            <Grid key={"top-"+index} className={classes.empty_item} item/>
                        )
                    }
                })}
            </Grid>
        </Grid>
    )
};

export default ItemsList;