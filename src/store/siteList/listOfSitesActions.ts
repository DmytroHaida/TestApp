import { PayloadAction } from '@reduxjs/toolkit';
import { IListOfSitesItem, IParsedSitesInformation } from "./listOfSitesSlice";

export namespace ListOfSitesActions {
    export type SetListOfSites = PayloadAction<IListOfSitesItem[]>;
    export type SetParsedSitesInformation = PayloadAction<IParsedSitesInformation[]>;
}

