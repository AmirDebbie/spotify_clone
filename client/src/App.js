import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Albums from "./components/Album/Albums";
import Songs from "./components/Song/Songs";
import Artists from "./components/Artist/Artists";
import Playlists from "./components/Playlist/Playlists";
import SingleAlbum from "./components/Album/SingleAlbum";
import SingleArtist from "./components/Artist/SingleArtist";
import SinglePlaylist from "./components/Playlist/SinglePlaylist";
import Admin from "./components/Admin/Admin";
import NotFound from "./components/NotFound/NotFound";
import SingleSong from "./components/Song/SingleSong";
import Register from "./components/Register";
import Login from "./components/Login";
import { LoggedIn } from "./components/LoggedInContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import HomePage from "./components/HomePage";
import "./App.css";
// import ReactGA from "react-ga";
import { routeChange } from "./AnalyticsManager";

function App() {
  const [cookies] = useCookies();
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      routeChange(location.pathname);
    });
  }, [history]);

  useEffect(() => {
    (async () => {
      if (cookies.name && cookies.token) {
        try {
          const { data } = await axios.post("/user/validate", cookies, {
            headers: {
              Authorization: cookies.token,
            },
          });
          setIsLogged(data);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          console.error(e);
        }
      } else {
        setLoading(false);
      }
    })();
  }, [cookies]);

  return (
    <>
      {!loading ? (
        !isLogged ? (
          <LoggedIn.Provider value={{ isLogged, setIsLogged }}>
            <Switch>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </LoggedIn.Provider>
        ) : (
          <LoggedIn.Provider value={{ isLogged, setIsLogged }}>
            <Switch>
              <Route path="/artist/:id">
                <SingleArtist />
              </Route>
              <Route path="/song/:id">
                <SingleSong />
              </Route>
              <Route path="/album/:id">
                <SingleAlbum />
              </Route>
              <Route path="/playlist/:id">
                <SinglePlaylist />
              </Route>
              <Route exact path="/admin">
                <Admin />
              </Route>
              <Route exact path="/albums">
                <Albums />
              </Route>
              <Route exact path="/songs">
                <Songs />
              </Route>
              <Route exact path="/artists">
                <Artists />
              </Route>
              <Route exact path="/playlists">
                <Playlists />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </LoggedIn.Provider>
        )
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;
