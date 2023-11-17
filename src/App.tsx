// App.tsx

import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserPlaylistsRequest,
  setSelectedPlaylist,
} from "./containers/Playlist/actions";
import { getPlaylistTracksRequest } from "./containers/Track/actions";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "./Components/Navbar/Navbar";
import CreatePlaylistPopup from "./Components/CreatePlaylistPopup/CreatePlaylistPopup";
import SelectorPlaylists from "./Components/SelectorPlaylists/SelectorPlaylists";
import TrackList from "./Components/TrackList/TrackList";
import PlaylistDetails from "./Components/PlaylistDetailsComponent/PlaylistDetailsComponent";
import { playlistSelectors } from "./containers/Playlist/selectors";
import Alert from "@mui/material/Alert";

import "./App.css";

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const playlists = useSelector(playlistSelectors.getPlaylists);
  const selectedPlaylist = useSelector(
    playlistSelectors.getSelectedPlaylist
  );
  const [showSpinner, setShowSpinner] = useState(true);

  // Effect to fetch user playlists
  useEffect(() => {
    dispatch(getUserPlaylistsRequest());
  }, [dispatch]);

  // Effect to set the selected playlist and fetch its tracks
  useEffect(() => {
    if (playlists.items.length > 0) {
      const nonEmptyPlaylist = playlists.items.find(
        (playlist) =>
          playlist.tracks &&
          playlist.tracks.total !== undefined &&
          playlist.tracks.total > 0
      );

      if (nonEmptyPlaylist && nonEmptyPlaylist.id && !selectedPlaylist) {
        dispatch(setSelectedPlaylist(nonEmptyPlaylist));
      }
    }
  }, [dispatch, playlists]);

  // Effect to hide the loading spinner after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 3000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Effect to observe changes in selectedPlaylist and fetch its tracks
  useEffect(() => {
    if (selectedPlaylist) {
      dispatch(getPlaylistTracksRequest({ playlistId: selectedPlaylist.id }));
    }
  }, [dispatch, selectedPlaylist]);

  return (
    <div className="app-container">
      <Navbar />
      <CreatePlaylistPopup />
      <SelectorPlaylists />

      {/* Display loading spinner if data is still loading */}
      {showSpinner && (
        <div className="spinner-container">
          <CircularProgress color="secondary" />
        </div>
      )}

      {/* Display Playlist Details and Track List if there's a selected playlist */}
      {!showSpinner && selectedPlaylist && (
        <>
          <PlaylistDetails playlist={selectedPlaylist} />
          <TrackList />
        </>
      )}

      {/* Display an alert if there are no playlists */}
      {!showSpinner && playlists.items.length === 0 && (
        <Alert icon={false} className="alert">
          Welcome! Don't forget to create a playlist.
        </Alert>
      )}
    </div>
  );
};

export default App;
