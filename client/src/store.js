import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//import reducer/s

const store = createStore(
  albumsReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
