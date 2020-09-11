import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Albums from "./components/Albums";
import Songs from "./components/Songs";
import Artists from "./components/Artists";
import Playlists from "./components/Playlists";
import SingleAlbum from "./components/SingleAlbum";
import SingleArtist from "./components/SingleArtist";

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
