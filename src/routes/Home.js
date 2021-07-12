import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import "./Home.css";

/** Homepage
* 
* Simple welcome message
* 
*/

const Home = () => {
    const { currUser } = useContext(UserContext);

    return (
        <div className="Home">
            <div className="container text-center">
                <h1 className="Home-title mb-4 font-weight-bold">Jobly</h1>
                <p className="lead">Value your job-search time? We do too.
                </p>
                {currUser
                    ? <h2>Welcome back, {currUser.firstName || currUser.username}!
                    </h2>
                    : (
                        <p>
                            <Link className="btn btn-primary font-weight-bold me-3" to="/login">
                                Log In
                            </Link>
                            <Link className="btn btn-primary font-weight-bold" to="/signup">
                                Sign Up
                            </Link>
                        </p>
                    )}
            </div>

        </div >
    )
}

export default Home;