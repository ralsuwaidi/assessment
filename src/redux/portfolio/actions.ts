// constants
import { PortfolioActionTypes } from './constants';

export interface AuthActionType {
    type:
    | PortfolioActionTypes.API_RESPONSE_SUCCESS
    | PortfolioActionTypes.API_RESPONSE_ERROR
    | PortfolioActionTypes.GET_PORTFOLIO;
    payload: {} | string;
}

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

// common success
export const authApiResponseSuccess = (actionType: string, data: UserData | {}): AuthActionType => ({
    type: PortfolioActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

// common error
export const authApiResponseError = (actionType: string, error: string): AuthActionType => ({
    type: PortfolioActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getPortfolio = (username: string): AuthActionType => ({
    type: PortfolioActionTypes.GET_PORTFOLIO,
    payload: { username },
});