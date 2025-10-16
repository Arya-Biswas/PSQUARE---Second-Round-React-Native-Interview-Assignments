import {
  configureStore,
  combineReducers,
  Reducer,
  AnyAction,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import api from '../../utils/rtk';
const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/resetAuth') {
    state = {} as RootState;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
