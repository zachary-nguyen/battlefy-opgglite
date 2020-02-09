import React from "react";
import {Avatar, Grid, Typography} from "@material-ui/core";
import * as Champions from "../../../../assets/champions.json"
import * as Spells from "../../../../assets/spells.json";
import * as Runes from "../../../../assets/runesReforged.json";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    margin_right: {
        marginRight: 2
    }
}));


interface Props {
    match: any;
}

const ChampionSpells = (props: Props) => {
    const classes = useStyles();

    const findChampionName = (): any => {
       const data = JSON.stringify(Champions.data);
       const champs = JSON.parse(data);

       const arr: any = Object.values(champs);

       const champ = arr.find((champion: any) => champion["key"] === String(props.match.championId));

       return champ.id;
    };

    const findSpell = (spellNumber: number) => {
        const data = JSON.stringify(Spells.data);
        const spells = JSON.parse(data);
        const arr: any = Object.values(spells);

        const spell = arr.find((spell: any) => spell["key"] === String(spellNumber === 1 ? props.match.spell1Id : props.match.spell2Id ));

        return spell.image.full;

    };

    const findKeystone = () => {
        const data = JSON.stringify(Runes);
        const runes = JSON.parse(data);
        const arr: any = Object.values(runes);

        const rune = arr.find((rune: any) => rune.id === props.match.stats.perkPrimaryStyle);
        const keystone = rune.slots[0].runes.find((keystone: any) => keystone.id === props.match.stats.perk0);

        return keystone.icon;
    };

    const findSecondaryTree = () => {
        const data = JSON.stringify(Runes);
        const runes = JSON.parse(data);
        const arr: any = Object.values(runes);

        const rune = arr.find((rune: any) => rune.id === props.match.stats.perkSubStyle);

        return rune.icon;
    };

    const championName = findChampionName();

    return(
        <Grid justify={"center"} alignContent={"center"} alignItems={"center"} direction={"row"} container xs={3} item>
            <Grid container className={classes.margin_right} item xs={3}>
                {props.match.championId &&
                    <Avatar src={require(`../../../../assets/champions/${championName}.png`)} alt={"champion"}/>
                }
            </Grid>
            <Grid container direction={"column"} item xs>
                <Grid container direction={"row"}>
                    <Grid className={classes.margin_right} item>
                        <img height={22} width={22} alt={"spell1"} src={require(`../../../../assets/spell/${findSpell(1)}`)} />
                    </Grid>
                    <Grid className={classes.margin_right} item>
                        <img height={22} width={22} alt={"spell1"} src={require(`../../../../assets/${findKeystone()}`)} />
                    </Grid>
                </Grid>
                <Grid container direction={"row"}>
                    <Grid className={classes.margin_right} item>
                        <img height={22} width={22} alt={"spell1"} src={require(`../../../../assets/spell/${findSpell(2)}`)} />
                    </Grid>
                    <Grid className={classes.margin_right} item>
                        <img height={22} width={22} alt={"spell1"} src={require(`../../../../assets/${findSecondaryTree()}`)} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container alignContent={"flex-start"} item>
                <Typography align={"left"}>{championName}</Typography>
            </Grid>
        </Grid>
    )
};

export default ChampionSpells;