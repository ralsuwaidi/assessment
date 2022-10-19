// apicore
import { APICore } from '../../helpers/api/apiCore';

// constants
import { PortfolioActionTypes } from './constants';

const api = new APICore();

// initial state of the portfolio
const INIT_STATE = {
    portfolio: {},
    profileLoading: false,
};

interface UserData {
    id: number;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
}

interface AuthActionType {
    type:
        | PortfolioActionTypes.API_RESPONSE_SUCCESS
        | PortfolioActionTypes.API_RESPONSE_ERROR
        | PortfolioActionTypes.GET_PORTFOLIO;
    payload: {
        actionType?: string;
        data?: UserData | {};
        error?: string;
    };
}

interface State {
    portfolio?: UserData | {};
    profileLoading?: boolean;
}

const Auth = (state: State = INIT_STATE, action: AuthActionType): any => {
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

export default Auth;
