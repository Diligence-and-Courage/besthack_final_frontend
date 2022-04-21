import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '../api';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
