import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore } from "../../helpers/api/apiCore";

// helpers
import { getPortfolio as getPortfolioApi } from "../../helpers/";

// actions
import { authApiResponseSuccess, authApiResponseError } from "./actions";

// constants
import { PortfolioActionTypes } from "./constants";

interface UserData {
  payload: {
    username: string;
    password: string;
    fullname: string;
    email: string;
  };
  type: string;
}

interface RegisterData {
  payload: {
    username: string;
    email: string;
    password1: string;
    password2: string;
  };
  type: string;
}

const api = new APICore();

/**
 * Get the user's portfolio
 * @param {*} payload - username
 */
function* getPortfolio({ payload: { username } }: UserData): SagaIterator {
  try {
    const response = yield call(getPortfolioApi, { username });
    yield put(
      authApiResponseSuccess(PortfolioActionTypes.GET_PORTFOLIO, response.data)
    );
  } catch (error: any) {
    yield put(authApiResponseError(PortfolioActionTypes.GET_PORTFOLIO, error));
  }
}

// Watch every time an action is dispatched

export function* watchGetPortfolio() {
  yield takeEvery(PortfolioActionTypes.GET_PORTFOLIO, getPortfolio);
}

function* authSaga() {
  yield all([fork(watchGetPortfolio)]);
}

export default authSaga;
