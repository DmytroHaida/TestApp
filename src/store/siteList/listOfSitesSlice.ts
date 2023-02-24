import { createSlice } from '@reduxjs/toolkit';
import { ListOfSitesActions } from './listOfSitesActions';

export interface IListOfSitesItem {
  name: string;
  url: string;
}

export interface IParsedSitesInformation {
  text: string;
  url: string;
}

interface State {
    isListLoaded: boolean;
    listOfSites: IListOfSitesItem[];
    parsedSitesInformation: IParsedSitesInformation[];
}

const initialState: State = {
  isListLoaded: false,
  listOfSites: [],
  parsedSitesInformation: [],
}

const listOfSitesSlice = createSlice({
  name: 'listOfSitesSlice',
  initialState,
  reducers: {
    setListOfSites(state, action: ListOfSitesActions.SetListOfSites) {
      state.isListLoaded = true;
      state.listOfSites = [...state.listOfSites, ...action.payload];
    },
    setParsedSitesInformation(state, action: ListOfSitesActions.SetParsedSitesInformation) {
      state.parsedSitesInformation = [...state.parsedSitesInformation, ...action.payload];
    }
  },
});

export const { setListOfSites, setParsedSitesInformation } = listOfSitesSlice.actions;

export default listOfSitesSlice.reducer;