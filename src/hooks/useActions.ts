import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useAppDispatch } from '../store';
import * as SiteListActionCreator from '../store/siteList/siteListActionCreator';
const actionsCreators = {
    ...SiteListActionCreator,
}

export const useActions = () => {
    const dispatch = useAppDispatch();

    return bindActionCreators(actionsCreators, dispatch);
};