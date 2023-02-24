import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import listOfSitesSlice from './siteList/listOfSitesSlice';

export interface IAction<T extends string, TT> {
    type: T;
    payload: TT;
}

const store = configureStore({
  reducer: {
    sites: listOfSitesSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;