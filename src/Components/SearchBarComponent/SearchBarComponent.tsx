// SearchComponent.js
import React, { FC, ReactElement, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../../containers/auth/selectors";
import {
  searchTracksByNameRequest,
  clearSearchResults,
} from "../../containers/actions/actions";
import TrackResult from "../TrackResult/TrackResult";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarComponent: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (!newSearchTerm) {
      dispatch(clearSearchResults());
    } else {
      dispatch(searchTracksByNameRequest(newSearchTerm));
    }
  };

  const handleBlur = () => {
    setSearchTerm("");
    dispatch(clearSearchResults());
  };

  const searchResults = useSelector(authSelectors.getSearchResults);

  return (
    <div>
      <Autocomplete
        options={searchResults}
        getOptionLabel={(option) => option.name} 
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
          <TrackResult   key={option.id} option={option} handleClick={(id) => console.log(id)} />
        )}
      />
    </div>
  );
};

export default SearchBarComponent;
