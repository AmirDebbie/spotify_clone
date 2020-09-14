import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Albums from "./components/Album/Albums";
import Songs from "./components/Song/Songs";
import Artists from "./components/Artist/Artists";
import Playlists from "./components/Playlist/Playlists";
import SingleAlbum from "./components/Album/SingleAlbum";
import SingleArtist from "./components/Artist/SingleArtist";
import SinglePlaylist from "./components/Playlist/SinglePlaylist";
import Admin from "./components/Admin/Admin";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/artist/:id">
          <SingleArtist />
        </Route>
        <Route path="/album/:id">
          <SingleAlbum />
        </Route>
        <Route path="/playlist/:id">
          <SinglePlaylist />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/albums">
          <Albums />
        </Route>
        <Route path="/songs">
          <Songs />
        </Route>
        <Route path="/artists">
          <Artists />
        </Route>
        <Route path="/playlists">
          <Playlists />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
