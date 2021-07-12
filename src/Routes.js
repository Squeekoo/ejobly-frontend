import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./routes/Home";
import CompaniesList from "./routes/CompaniesList";
import CompanyJobs from "./routes/CompanyJobs";
import JobsList from "./routes/JobsList";

import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProfileForm from "./forms/ProfileForm";
import ProtectedRoute from "./routes/ProtectedRoute";

const Routes = ({ login, signup }) => {
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `signup=${typeof signup}`,
    )
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>
                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>

                <ProtectedRoute exact path="/companies">
                    <CompaniesList />
                </ProtectedRoute>
                <ProtectedRoute exact path="/jobs">
                    <JobsList />
                </ProtectedRoute>
                <ProtectedRoute path="/companies/:handle">
                    <CompanyJobs />
                </ProtectedRoute>
                <ProtectedRoute path="/profile">
                    <ProfileForm />
                </ProtectedRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Routes;