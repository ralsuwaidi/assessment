// constants
import { PortfolioActionTypes } from './constants';
import { PortfolioType } from '../../constants/Portfolio';

// initial state of the portfolio
const INIT_STATE = {
    portfolio: {},
    profileLoading: false,
};

interface PortfolioActionType {
    type:
        | PortfolioActionTypes.API_RESPONSE_SUCCESS
        | PortfolioActionTypes.API_RESPONSE_ERROR
        | PortfolioActionTypes.GET_PORTFOLIO;
    payload: {
        actionType?: string;
        data?: PortfolioType | {};
        error?: string;
    };
}

interface State {
    portfolio?: PortfolioType | {};
    profileLoading?: boolean;
}

const Portfolio = (state: State = INIT_STATE, action: PortfolioActionType): any => {
    switch (action.type) {
        // API Response Success
        case PortfolioActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case PortfolioActionTypes.GET_PORTFOLIO: {
                    return {
                        ...state,
                        portfolio: action.payload.data,
                        profileLoading: false,
                    };
                }
                default:
                    return { ...state };
            }

        // API Response Error
        case PortfolioActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case PortfolioActionTypes.GET_PORTFOLIO: {
                    return {
                        ...state,
                        error: action.payload.error,
                        profileLoading: false,
                    };
                }
                default:
                    return { ...state };
            }
        // If not
        case PortfolioActionTypes.GET_PORTFOLIO:
            return { ...state, profileLoading: true };
        default:
            return { ...state };
    }
};

export default Portfolio;
