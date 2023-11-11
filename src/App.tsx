// Dans votre composant App
import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "./containers/auth/selectors";
import CreatePlaylistPopupComponent from "./Components/CreatePlaylistPopupComponent/CreatePlaylistPopupComponent";
import PlaylistComponent from "./Components/PlaylistComponent/PlaylistComponent"; // Importez votre composant PlaylistComponent
import {
  getUserPlaylistsRequest,
  getUserPlaylistsSuccess,
} from "./containers/auth/slice";

const App: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);
  const playlists = useSelector(authSelectors.getPlaylists);
  console.log("plau", playlists);

  // Déclenchez la demande de playlists lorsque le composant est monté
  useEffect(() => {
    dispatch(getUserPlaylistsRequest());
  }, [dispatch]);

  return (
    <div>
      <CreatePlaylistPopupComponent />
      <PlaylistComponent playlistList={playlists.items} />
    </div>
  );
};

export default App;
