import React, { FC, ReactElement, useState } from "react";
import List from "@mui/material/List";
import Alert from "@mui/material/Alert";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import TrackComponent from "../TrackComponent/TrackComponent";
import { trackSelectors } from "../../containers/Track/selectors";
import "./TrackList.css";

const TrackList: FC = (): ReactElement => {
  const playlistTracks = useSelector(trackSelectors.getPlaylistTracks);

  /////////////////////////// Pagination ///////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = playlistTracks.items.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(playlistTracks.items.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  /////////////////////////// Pagination ///////////////////////////

  const hasTracks = currentItems.length > 0;

  return (
    <div className="list-tracker">
      {!hasTracks && playlistTracks.total == 0 && (
        <Alert
          severity="success"
          style={{
            marginTop: 16,
          }}
        >
          There are no tracks added to this playlist at the moment
        </Alert>
      )}

      {hasTracks && (
        <List>
          {currentItems.map((playlistItem, index) => (
            <TrackComponent key={index} track={playlistItem.track} />
          ))}
        </List>
      )}

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default TrackList;