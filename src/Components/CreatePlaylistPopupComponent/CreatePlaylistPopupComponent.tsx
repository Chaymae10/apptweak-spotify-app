import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./CreatePlaylistPopupComponent.css";
import { createPlaylistRequest } from "../../containers/auth/slice";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../../containers/auth/selectors";
import { getUser } from "../../containers/auth/slice";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const CreatePlaylistPopupComponent: React.FC = () => {
  const user = useSelector(authSelectors.getUser);
  const dispatch = useDispatch();

  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //get data of user in each time the modal is opened
  useEffect(() => {
    if (isModalOpen) {
      dispatch(getUser());
    }
  }, [dispatch, isModalOpen]);

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

    const playlistData = {
      userId: user?.userId || "",
      name: playlistName,
      description: playlistDescription,
    };

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
          color="success"
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
            color="success"
            error={!!error}
            helperText={error}
          />
          <TextField
            label="Playlist description (optional)"
            variant="standard"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            fullWidth
            margin="normal"
            className="inputField"
            color="success"
          />
          <div className="buttonsContainer">
            <ButtonComponent
              variant="outlined"
              onClick={closeModal}
              text="Cancel"
              className="cancelButton"
              color="success"
            />

            <ButtonComponent
              variant="contained"
              onClick={handleCreatePlaylist}
              text="Create"
              className="createButton"
              color="success"
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePlaylistPopupComponent;