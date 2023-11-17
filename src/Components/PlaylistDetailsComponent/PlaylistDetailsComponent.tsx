import React, { FC, ReactElement } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Playlist } from "../../types/playlistTypes";
import defaultImage from "../../img/defaultImage.png";
import "./PlaylistDetailsComponent.css";

interface PlaylistDetailsProps {
  playlist: Playlist;
}

const PlaylistDetailsss: FC<PlaylistDetailsProps> = ({
  playlist,
}): ReactElement => {
  // Utilisez la première image si elle existe, sinon utilisez l'image par défaut
  const imageUrl = playlist.images?.length
    ? playlist.images[0].url
    : defaultImage;

  return (
    <Card className="playlist-card">
      <div className="playlist-media-container">
        <a href={playlist.external_urls.spotify} target="_blank">
          <CardMedia component="img" image={imageUrl} alt={playlist.name} />
        </a>
        <div className="playlist-edit-icon-container">
          <EditIcon fontSize="small" />
        </div>
      </div>
      <CardContent className="playlist-content">
        <Typography variant="h5" className="playlist-tito">
          {playlist.name}
        </Typography>
        {playlist.description && (
          <Typography  className="playlist-subtitle1">
            <span className="playlist-subtitle">Description:</span>{" "}
            {playlist.description}
          </Typography>
        )}
        <Typography variant="subtitle1" className="playlist-subtitle1">
          <span className="playlist-subtitle">Owner:</span>{" "}
          {playlist.owner.display_name}
        </Typography>

        {playlist.followers && (
          <Typography variant="subtitle1" className="playlist-subtitle1">
            <span className="playlist-subtitle">Followers:</span>{" "}
            {playlist.followers.total}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PlaylistDetailsss;
