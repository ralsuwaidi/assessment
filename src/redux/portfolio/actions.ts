// constants
import { PortfolioActionTypes } from './constants';
import { PortfolioType } from '../../constants/Portfolio';

export interface PortfolioActionType {
    type:
    | PortfolioActionTypes.API_RESPONSE_SUCCESS
    | PortfolioActionTypes.API_RESPONSE_ERROR
    | PortfolioActionTypes.GET_PORTFOLIO;
    payload: {} | string;
}

// common success
export const portfolioApiResponseSuccess = (actionType: string, data: PortfolioType | {}): PortfolioActionType => ({
    type: PortfolioActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

// common error
export const portfolioApiResponseError = (actionType: string, error: string): PortfolioActionType => ({
    type: PortfolioActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getPortfolio = (username: string): PortfolioActionType => ({
    type: PortfolioActionTypes.GET_PORTFOLIO,
    payload: { username },
});