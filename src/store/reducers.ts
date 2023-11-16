import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import playlist from "../containers/Playlist/slice";
import track from "../containers/Track/slice";

const rootReducer = combineReducers({
  authentication,
  playlist,
  track,
});

export default rootReducer;
