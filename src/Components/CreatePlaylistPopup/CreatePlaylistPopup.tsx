import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./CreatePlaylistPopup.css";
import {
  createPlaylistRequest,
} from "../../containers/Playlist/actions";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../../containers/auth/selectors";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const CreatePlaylistPopup: React.FC = () => {
  const user = useSelector(authSelectors.getUser);
  const dispatch = useDispatch();

  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playlistData = {
    userId: user?.userId || "",
    name: playlistName,
    description: playlistDescription || "",
  };

  const openModal = () => {
    setIsModalOpen(true);
    setError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleCreatePlaylist = () => {
    if (playlistName.trim() === "") {
      setError("Playlist name is required");
      return;
    }
    dispatch(createPlaylistRequest(playlistData));
    setPlaylistName("");
    setPlaylistDescription("");
    setError("");
    closeModal();
  };

  return (
    <div>
      <div className="buttonPopup">
        <ButtonComponent
          variant="contained"
          onClick={openModal}
          text="Add new playlist"
          className="createButton"
        />
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box className="modalContainer">
          <h2 className="title">Add new playlist</h2>
          <TextField
            label="Playlist name"
            variant="standard"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            fullWidth
            margin="normal"
            className="inputField"
            error={!!error}
            helperText={error}
            color="secondary"
          />
          <TextField
            label="Playlist description (optional)"
            variant="standard"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            fullWidth
            margin="normal"
            className="inputField"
            color="secondary"
          />
          <div className="buttonsContainer">
            <ButtonComponent
              variant="outlined"
              onClick={closeModal}
              text="Cancel"
              className="cancelButton"
              color="secondary"
            />

            <ButtonComponent
              variant="contained"
              onClick={handleCreatePlaylist}
              text="Create"
              className="createButton"
              color="secondary"
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePlaylistPopup;