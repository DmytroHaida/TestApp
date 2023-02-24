import { AppDispatch } from "..";
import { SiteListHttp } from "../../http/siteListHttp";
import { IParsedSitesInformation, setListOfSites, setParsedSitesInformation } from "./listOfSitesSlice";

export const getListOfSites = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await SiteListHttp.getSiteList();
            dispatch(setListOfSites(response));
        } catch (e) {
            console.log(e);
        }
    };
};

export const setParsedSitesInfo = (parsedSitesInfo: IParsedSitesInformation[]) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setParsedSitesInformation(parsedSitesInfo));
    }
}