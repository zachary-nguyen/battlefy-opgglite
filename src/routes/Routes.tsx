import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import HomePage from "../views/homepage/HomePage";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact component={HomePage}/>
            </Switch>
        </BrowserRouter>
    )

};

export default Routes;