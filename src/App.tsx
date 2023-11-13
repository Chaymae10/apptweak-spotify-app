import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDefaultPlaylist,
  getPlaylistTracksRequest,
  getUserPlaylistsRequest,
} from "./containers/actions/actions";
import { authSelectors } from "./containers/auth/selectors";
import CircularProgress from "@mui/material/CircularProgress";
import CreatePlaylistPopupComponent from "./Components/CreatePlaylistPopupComponent/CreatePlaylistPopupComponent";
import PlaylistComponent from "./Components/PlaylistComponent/PlaylistComponent";
import TrackList from "./Components/TrackList/TrackList";

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);
  const playlists = useSelector(authSelectors.getPlaylists);
  const defaultPlaylist = useSelector(authSelectors.getDefaultPlaylist);
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
        dispatch(setDefaultPlaylist(nonEmptyPlaylist));
        // Vous pouvez également déclencher une action pour obtenir les tracks de cette playlist ici
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
      <CreatePlaylistPopupComponent />
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
