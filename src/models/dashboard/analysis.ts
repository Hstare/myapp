import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getPayNumber, getPercent, getSales, getVisits } from '@/services/dashboard/analysis';

export interface IAnalysisVisitsType {
  year?: string,
  value?: number,
}

export interface IAnalysisPayNumsType {
  date?: string,
  value?: number,
}

export interface IAnalysisPercentType {
  percent?: number,
}

export interface IAnalysisSalesType {
  id: number,
  month?: string,
  value?: number,
  shop?: string,
  rank?: string;
}

export interface IAnalysisStateType {
  visits?: IAnalysisVisitsType[],
  payNumbers?: IAnalysisPayNumsType[],
  percent?: IAnalysisPercentType,
  sales?: IAnalysisSalesType[],
}

export interface IAnalysisModelType {
  namespace: string,
  state: IAnalysisStateType,
  effects: {
    getVisits: Effect,
    getPayNumbers: Effect,
    getPercent: Effect,
    getSales: Effect,
  }
  reducers: {
    saveVisits: Reducer<IAnalysisStateType>,
    savePayNumbers: Reducer<IAnalysisStateType>,
    savePercent: Reducer<IAnalysisStateType>,
    saveSales: Reducer<IAnalysisStateType>,
  };
}

const AnalysisModel: IAnalysisModelType = {
  namespace: 'analysis',
  state: {
    visits: [],
    payNumbers: [],
    percent: {},
    sales: [],
  },
  effects: {
    *getVisits(_, { call, put }) {
      const response = yield call(() => getVisits(''));
      yield put({
        type: 'saveVisits',
        payload: response.visits,
      })
    },
    *getPayNumbers(_, { call, put }) {
      const response = yield call(() => getPayNumber());
      yield put({
        type: 'savePayNumbers',
        payload: response.payNumber,
      })
    },
    *getPercent(_, { call, put }) {
      const response = yield call(() => getPercent());
      yield put({
        type: 'savePercent',
        payload: response,
      })
    },
    *getSales(_, { call, put }) {
      const response = yield call(() => getSales());
      yield put({
        type: 'saveSales',
        payload: response.sales,
      })
    },
  },
  reducers: {
    saveVisits(state, { payload }) {
      return {
        ...state,
        visits: payload || [],
      }
    },
    savePayNumbers(state, { payload }) {
      console.log('savePayNumbers payload', payload);
      return {
        ...state,
        payNumbers: payload || [],
      }
    },
    savePercent(state, { payload }) {
      return {
        ...state,
        percent: payload || {},
      }
    },
    saveSales(state, action) {
      return {
        ...state,
        sales: action.payload || [],
      }
    },
  },
};
export default AnalysisModel;
