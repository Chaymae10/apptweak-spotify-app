import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserPlaylistsRequest,
  setSelectedPlaylist,
} from "./containers/Playlist/actions";
import { getPlaylistTracksRequest } from "./containers/Track/actions";
import { authSelectors } from "./containers/auth/selectors";
import CircularProgress from "@mui/material/CircularProgress";
import CreatePlaylistPopup from "./Components/CreatePlaylistPopup/CreatePlaylistPopup";
import PlaylistComponent from "./Components/SelectorPlaylists/SelectorPlaylists";
import TrackList from "./Components/TrackList/TrackList";
import Navbar from "./Components/Navbar/Navbar";
import {playlistSelectors} from "./containers/Playlist/selectors";

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const playlists = useSelector(playlistSelectors.getPlaylists);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    // Récupérez les playlists
    dispatch(getUserPlaylistsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (playlists.items.length > 0) {
      const nonEmptyPlaylist = playlists.items.find(
        (playlist) =>
          playlist.tracks &&
          playlist.tracks.total !== undefined &&
          playlist.tracks.total > 0
      );

      if (nonEmptyPlaylist && nonEmptyPlaylist.id) {
       dispatch(setSelectedPlaylist(nonEmptyPlaylist));
        dispatch(getPlaylistTracksRequest({ playlistId: nonEmptyPlaylist.id }));
      }
    }
  }, [dispatch, playlists]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <CreatePlaylistPopup />
      <PlaylistComponent />
      {showSpinner && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress color="success" />
        </div>
      )}
      {!showSpinner && <TrackList />}
    </div>
  );
};

export default App;
