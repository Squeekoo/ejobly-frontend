import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./Api";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import UserContext from "./UserContext";

import NavBar from "./NavBar";
import Routes from "./Routes";

export const TOKEN_ID = "jobly-token";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_ID);
  const [appIds, setAppIds] = useState(new Set([]));
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(function getUserInfo() {
    console.debug("App useEffect getUserInfo", "token=", token);

    async function getCurrUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currUser = await JoblyApi.getCurrUser(username);
          setCurrUser(currUser);
          setAppIds(new Set(currUser.applications));
        } catch (err) {
          console.error("App getUserInfo Failed", err);
          setCurrUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrUser();
  }, [token]);

  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("Signup Failed.", err);
      return { success: false, err };
    }
  }

  async function login(data) {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("Login Failed.", err);
      return { success: false, err };
    }
  }

  function logout() {
    setCurrUser(null);
    setToken(null);
  }

  function hasAlreadyApplied(id) {
    return appIds.has(id);
  }

  function applyToJob(id) {
    if (hasAlreadyApplied(id)) return;
    JoblyApi.applyToJob(currUser.username, id);
    setAppIds(new Set([...appIds, id]));
  }

  if (!infoLoaded) return <h1>Loading...</h1>

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currUser, setCurrUser, hasAlreadyApplied, applyToJob }}>
        <div className="App">
          <NavBar logout={logout} />
          <Routes signup={signup} login={login} />
        </div >
      </UserContext.Provider>
    </BrowserRouter >
  );
}

export default App;
