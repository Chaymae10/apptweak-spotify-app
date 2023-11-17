import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import { TrackDetails } from "../../../../types/trackTypes";
import "./TrackResult.css";

interface TrackResultProps {
  trackFound: TrackDetails;
  handleClick: () => void;
  isOwnerPlaylist: boolean;
}

const TrackResult: React.FC<TrackResultProps> = ({
  trackFound,
  handleClick,
  isOwnerPlaylist,
}) => (
  <Card className="track-card">
    <CardMedia
      component="img"
      src={trackFound.album.images[0].url}
      alt={trackFound.name}
      className="track-media"
    />
    <CardContent className="track-content">
      <div className="track-info">
        <Typography variant="h6" className="option-title">
          {trackFound.name}
        </Typography>
        <Typography variant="subtitle2" className="details">
          {trackFound.artists.map((artist) => artist.name).join(", ")}
        </Typography>
      </div>
      <div className="option-add-button">
        <Tooltip
          arrow
          title={isOwnerPlaylist ? "" : "You cannot add track"}
        >
          <span>
            <IconButton
              style={{ color: isOwnerPlaylist ? "#6e50c2" : "gray" }}
              aria-label="Add to playlist"
              onClick={() => handleClick()}
              disabled={!isOwnerPlaylist}
            >
              <AddCircleIcon />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    </CardContent>
  </Card>
);

export default TrackResult;
