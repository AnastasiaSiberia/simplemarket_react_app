import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./UI/router/routes";
import {AuthContext} from "../context/context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log("AUTH IS " + isAuth)
    if(isLoading) {
        return <Loader/>
    }
    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route key={route.path}
                           component={route.component}
                           path={route.path}
                           exact={route.exact}
                    />
                )}
                <Redirect to='/products'/>
            </Switch>

            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route key={route.path}
                           component={route.component}
                           path={route.path}
                           exact={route.exact}
                    />
                )}
                <Redirect to='/login'/>
            </Switch>

    );
};

export default AppRouter;