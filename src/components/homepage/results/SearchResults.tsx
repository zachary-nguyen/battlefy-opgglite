import React from "react";
import {Grid} from "@material-ui/core";
import GameCard from "./gamecard/GameCard";


interface Props{
    matches: [];
}

const SearchResults = (props: Props) => {

    return (
        <Grid item
              alignContent={"center"}
              justify={"center"}
              alignItems={"center"}
              container
              xs={4}
        >
            {props.matches && props.matches.length > 0 &&
            props.matches.map((match: any, index: number) => {
                return (
                    <GameCard key={index} match={match}/>
                )
            })}
        </Grid>
    )
};

export default SearchResults;
