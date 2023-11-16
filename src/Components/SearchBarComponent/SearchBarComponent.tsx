import React, { FC, ReactElement, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  searchTracksByNameRequest,
  clearSearchResults,
} from "../../containers/Track/actions";
import TrackResult from "../TrackResult/TrackResult";
import SearchIcon from "@mui/icons-material/Search";
import { trackSelectors } from "../../containers/Track/selectors";
import Typography from "@mui/material/Typography";

const SearchBarComponent: FC = (): ReactElement => {
  const dispatch = useDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    dispatch(searchTracksByNameRequest({ trackName: newSearchTerm }));
  };

  const searchResults = useSelector(trackSelectors.getSearchResults);
  const handleBlur = () => {
    dispatch(clearSearchResults());
  };

  return (
    <div>
      <Autocomplete
        options={searchResults}
        getOptionLabel={(option) => option.name}
        noOptionsText={
          <Typography color="textSecondary">No tracks found</Typography>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            onChange={handleSearchChange}
            onBlur={handleBlur}
            className="search-bar"
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 5,
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <SearchIcon style={{ color: "gray" }} />
                  {params.InputProps.startAdornment}
                </>
              ),
              endAdornment: <></>,
            }}
          />
        )}
        onChange={(event, value) => {
          console.log("Selected Track:", value);
        }}
        renderOption={(props, option) => (
          <TrackResult
            key={option.id}
            option={option}
            handleClick={(id) => console.log(id)}
          />
        )}
      />
    </div>
  );
};

export default SearchBarComponent;