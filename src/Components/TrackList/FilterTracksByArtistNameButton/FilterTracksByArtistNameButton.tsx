import React, { FC, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import "./FilterTracksByArtistNameButton.css"

interface FilteredArtistsProps {
  artists: string[];
  selectedArtist: string | null;
  onChange: (artist: string | null) => void;
}

const FilteredArtists: FC<FilteredArtistsProps> = ({
  artists,
  selectedArtist,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleArtistChange = (
    _event: React.ChangeEvent<{}>,
    newValue: string | null
  ) => {
    onChange(newValue);
    setAnchorEl(null);
  };

  const handleCloseAutocomplete = () => {
    setAnchorEl(null);
  };

  return (
    <FormControl>
      <Button
        variant="contained"
        onClick={handleButtonClick}
        className="filterButton"
      >
        Artist Filter
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseAutocomplete}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Autocomplete
            value={selectedArtist}
            onChange={handleArtistChange}
            options={artists}
            getOptionLabel={(option) => option}
            className="autocomplete"
            renderInput={(params) => (
              <TextField {...params} label="Artist Filter" color="secondary" />
            )}
          />
        </Box>
      </Popover>
    </FormControl>
  );
};

export default FilteredArtists;
