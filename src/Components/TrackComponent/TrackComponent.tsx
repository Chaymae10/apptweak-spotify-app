import React, { FC, ReactElement, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import "./TrackComponent.css";
import ReactH5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { TrackDetails } from "../../types/trackTypes";
import DeleteConfirmationDialog from "./DeleteConfirmationPopup/DeleteConfirmationPopup";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../../containers/auth/selectors";
import { removeTrackFromPlaylistRequest } from "../../containers/Track/actions";
import { playlistSelectors } from "../../containers/Playlist/selectors";

const TrackComponent: FC<{ track: TrackDetails }> = ({
  track,
}): ReactElement => {
  const dispatch = useDispatch();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);
  const authenticatedUserId = useSelector(authSelectors.getUser)?.userId;

  const isOwnerPlaylist =
    selectedPlaylist &&
    selectedPlaylist.owner &&
    selectedPlaylist.owner.id === authenticatedUserId;

  const handleDeleteConfirm = (trackURI: string) => {
    setDeleteDialogOpen(false);
    if (
      selectedPlaylist &&
      selectedPlaylist.id &&
      selectedPlaylist.snapshot_id
    ) {
      dispatch(
        removeTrackFromPlaylistRequest({
          playlistId: selectedPlaylist.id,
          trackURI: trackURI,
          snapshotId: selectedPlaylist.snapshot_id,
        })
      );
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Card className="track-card">
      {/********************************************Card Mefia (img + audio)*********************************************/}
      <div className="track-media-container">
        <a href={track?.external_urls.spotify} target="_blank">
          <CardMedia
            component="img"
            image={track.album.images[0].url}
            alt={track.name}
            style={{ width: 250, height: 250, objectFit: "contain" }}
          />
        </a>
        <div className="audio-controls">
          {track.preview_url && (
            <ReactH5AudioPlayer
              autoPlayAfterSrcChange={false}
              src={track.preview_url}
              showJumpControls={false}
            />
          )}
        </div>
      </div>

      {/********************************************Content *********************************************/}
      <CardContent className="track-content">
        <div className="track-info">
          <Typography variant="h5" className="title" align="left">
            {track.name}
          </Typography>
          <div className="details">
            <Typography variant="subtitle1">
              <span className="subtitle">Artist(s):</span>{" "}
              {track.artists.map((artist) => artist.name).join(", ")}
            </Typography>
            <Typography variant="subtitle1">
              <span className="subtitle"> Album: </span>
              {track.album.name}
            </Typography>
            {track.album.release_date && (
              <Typography variant="subtitle1">
                <span className="subtitle"> Release date: </span>
                {new Date(track.album.release_date).toLocaleDateString()}
              </Typography>
            )}
          </div>
        </div>

        {/********************************************Delete icon *********************************************/}
        <div className="delete-icon">
          {isOwnerPlaylist && (
            <IconButton onClick={handleDeleteClick} color="error" size="large">
              <CancelIcon />
            </IconButton>
          )}
        </div>
      </CardContent>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onCancel={handleDeleteCancel}
        onConfirm={() => handleDeleteConfirm(track.uri)}
      />
    </Card>
  );
};

export default TrackComponent;