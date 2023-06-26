import profileReducer from "./reducers/profileReducer";
import testReducer from "./reducers/test.reducer";

export const ReducerRegistry = {
  profile: profileReducer,
  test   : testReducer,
};
