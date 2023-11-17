import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import "./SortTracksButton.css"; 

interface SortMenuProps {
  onSortChange: (sortBy: string | null) => void;
}

const SortMenu: FC<SortMenuProps> = ({ onSortChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (sortBy: string | null) => {
    onSortChange(sortBy);
    setSelectedSort(sortBy);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button className="menu-button" onClick={handleSortClick}  variant="contained">
        Trier
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleSortClose(null)}
      >
        <MenuItem
          onClick={() => handleSortClose(null)}
          selected={selectedSort === null}
          className="menu-item-selected"
        >
          None
        </MenuItem>
        <MenuItem
          onClick={() => handleSortClose("name")}
          selected={selectedSort === "name"}
          className="menu-item-selected"
        >
          Nom
        </MenuItem>
        <MenuItem
          onClick={() => handleSortClose("release_date")}
          selected={selectedSort === "release_date"}
          className="menu-item-selected"
        >
          Date de sortie
        </MenuItem>
        <MenuItem
          onClick={() => handleSortClose("duration")}
          selected={selectedSort === "duration"}
          className="menu-item-selected"
        >
          Durée
        </MenuItem>
        <MenuItem
          onClick={() => handleSortClose("popularity")}
          selected={selectedSort === "popularity"}
          className="menu-item-selected"
        >
          Popularité
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SortMenu;
