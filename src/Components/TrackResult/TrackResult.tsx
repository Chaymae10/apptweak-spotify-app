import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TrackDetails } from "../../types/trackTypes";
import "./TrackResult.css";

interface TrackResultProps {
  option: TrackDetails;
  handleClick: (id: string) => void;
}

const TrackResult: React.FC<TrackResultProps> = ({ option, handleClick }) => (
  <Card className="track-card">
    <CardMedia
      component="img"
      src={option.album.images[0].url}
      alt={option.name}
      className="track-media"
      style={{ width: 150, height: 150, objectFit: "contain" }}
    />
    <CardContent className="track-content">
      <div className="track-info">
        <Typography variant="h6" className="option-title">
          {option.name}
        </Typography>
        <Typography variant="subtitle2" className="details">
          {option.artists.map((artist) => artist.name).join(", ")}
        </Typography>
      </div>
      <div className="option-add-button">
        <IconButton
          style={{ color: "#1db954" }}
          aria-label="Add to playlist"
          onClick={() => handleClick(option.id)}
        >
          <AddCircleIcon />
        </IconButton>
      </div>
    </CardContent>
  </Card>
);

export default TrackResult;