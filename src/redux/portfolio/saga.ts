import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// helpers
import { getPortfolio as getPortfolioApi } from "../../helpers/";

// actions
import {
  portfolioApiResponseSuccess,
  portfolioApiResponseError,
} from "./actions";

// constants
import { PortfolioActionTypes } from "./constants";
import { PortfolioType } from "../../constants/Portfolio";

interface UserData {
  payload: {
    username: string;
  };
  type: string;
}

/**
 * Get the user's portfolio
 * @param {*} payload - username
 */
function* getPortfolio({ payload: { username } }: UserData): SagaIterator {
  try {
    const response = yield call(getPortfolioApi, { username });
    yield put(
      portfolioApiResponseSuccess(
        PortfolioActionTypes.GET_PORTFOLIO,
        response.data
      )
    );
  } catch (error: any) {
    yield put(
      portfolioApiResponseError(PortfolioActionTypes.GET_PORTFOLIO, error)
    );
  }
}

// Watch every time an action is dispatched

export function* watchGetPortfolio() {
  yield takeEvery(PortfolioActionTypes.GET_PORTFOLIO, getPortfolio);
}

function* portfolioSaga() {
  yield all([fork(watchGetPortfolio)]);
}

export default portfolioSaga;
