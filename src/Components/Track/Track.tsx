import React, { FC, ReactElement, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Track.css";
import ReactH5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { TrackDetails } from "../../types/requests";

const Track: FC<{ track: TrackDetails }> = ({ track }): ReactElement => {

  const handleDeleteClick = () => {
    console.log("ID de la piste à supprimer :", track.id);
  };

  return (
    <Card className="track-card">
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
        <div className="delete-icon">
        <IconButton onClick={handleDeleteClick} color="error" size="large">
          <CancelIcon />
        </IconButton>
      </div>
      </CardContent>
    </Card>
  );
};

export default Track;
