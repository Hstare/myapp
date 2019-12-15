import { Effect } from 'dva';
import { Reducer } from 'redux';
import {
  getOnlineSearch,
  getPayNumber,
  getPercent,
  getSales,
  getSalesRatioChartDate,
  getTabs,
  getTabsChartDate,
  getVisits,
} from '@/services/dashboard/analysis';

export interface IAnalysisVisitsType {
  year?: string;
  value?: number;
}

export interface IAnalysisPayNumsType {
  date?: string;
  value?: number;
}

export interface IAnalysisPercentType {
  percent?: number;
}

export interface IAnalysisSalesType {
  id: number;
  month?: string;
  value?: number;
  shop?: string;
  rank?: string;
}

export interface IAnalysisOnlineSearchTableType {
  id: number;
  keyword: string;
  users: number;
  weekGain: number;
}

export interface IAnalysisOnlineSearchType {
  title?: string;
  searchUser?: string;
  searchUsers?: string;
  userRatio?: number;
  users?: [{ date: string; value: number }];
  perSearch?: string;
  searchNum?: string;
  searchRatio?: number;
  search?: [{ date: string; value: number }];
  tables?: IAnalysisOnlineSearchTableType[];
}

export interface IAnalysisSalesRatioType {
  title?: string;
  chartTitle?: string;
}

export interface IAnalysisRatioChartDataType {
  type?: string;
  value?: number;
}

export interface IAnalysisPiesType {
  item?: string;
  value?: number;
}

export interface IAnalysisTabsType {
  id?: number;
  convertionRate?: number;
  pies: IAnalysisPiesType[];
}

export interface IAnalysisTabsChartDateType {
  date?: string;
  passengerFlow?: number;
  payNum: number;
}

export interface IAnalysisStateType {
  visits?: IAnalysisVisitsType[];
  payNumbers?: IAnalysisPayNumsType[];
  percent?: IAnalysisPercentType;
  sales?: IAnalysisSalesType[];
  onlineSearch?: IAnalysisOnlineSearchType;
  salesRatio?: IAnalysisSalesRatioType;
  ratioChartData?: IAnalysisRatioChartDataType[];
  tabs?: IAnalysisTabsType[];
  tabsChartDate?: IAnalysisTabsChartDateType[];
}

export interface IAnalysisModelType {
  namespace: string;
  state: IAnalysisStateType;
  effects: {
    getVisits: Effect;
    getPayNumbers: Effect;
    getPercent: Effect;
    getSales: Effect;
    getOnlineSearch: Effect;
    getSalesRatioChartDate: Effect;
    getTabs: Effect;
    getTabsChartDate: Effect;
  };
  reducers: {
    saveVisits: Reducer<IAnalysisStateType>;
    savePayNumbers: Reducer<IAnalysisStateType>;
    savePercent: Reducer<IAnalysisStateType>;
    saveSales: Reducer<IAnalysisStateType>;
    saveOnlineSearch: Reducer<IAnalysisStateType>;
    saveSalesRatioChartDate: Reducer<IAnalysisStateType>;
    saveTabs: Reducer<IAnalysisStateType>;
    saveTabsChartDate: Reducer<IAnalysisStateType>;
  };
}

const AnalysisModel: IAnalysisModelType = {
  namespace: 'analysis',
  state: {
    visits: [],
    payNumbers: [],
    percent: {},
    sales: [],
    onlineSearch: {},
    salesRatio: {},
    ratioChartData: [],
    tabs: [],
    tabsChartDate: [],
  },
  effects: {
    *getVisits(_, { call, put }) {
      const response = yield call(() => getVisits(''));
      yield put({
        type: 'saveVisits',
        payload: response.visits,
      });
    },
    *getPayNumbers(_, { call, put }) {
      const response = yield call(() => getPayNumber());
      yield put({
        type: 'savePayNumbers',
        payload: response.payNumber,
      });
    },
    *getPercent(_, { call, put }) {
      const response = yield call(() => getPercent());
      yield put({
        type: 'savePercent',
        payload: response,
      });
    },
    *getSales(_, { call, put }) {
      const response = yield call(() => getSales());
      yield put({
        type: 'saveSales',
        payload: response.sales,
      });
    },
    *getOnlineSearch({ currentPage, pageSize }, { call, put }) {
      const response = yield call(() => getOnlineSearch(currentPage, pageSize));
      yield put({
        type: 'saveOnlineSearch',
        payload: response,
      });
    },
    *getSalesRatioChartDate(_, { call, put }) {
      const response = yield call(() => getSalesRatioChartDate());
      yield put({
        type: 'saveSalesRatioChartDate',
        payload: response,
      });
    },
    *getTabs(_, { call, put }) {
      const response = yield call(() => getTabs());
      yield put({
        type: 'saveTabs',
        payload: response,
      });
    },
    *getTabsChartDate(_, { call, put }) {
      const response = yield call(() => getTabsChartDate());
      yield put({
        type: 'saveTabsChartDate',
        payload: response,
      });
    },
  },
  reducers: {
    saveVisits(state, { payload }) {
      return {
        ...state,
        visits: payload || [],
      };
    },
    savePayNumbers(state, { payload }) {
      return {
        ...state,
        payNumbers: payload || [],
      };
    },
    savePercent(state, { payload }) {
      return {
        ...state,
        percent: payload || {},
      };
    },
    saveSales(state, action) {
      return {
        ...state,
        sales: action.payload || [],
      };
    },
    saveOnlineSearch(state, action) {
      return {
        ...state,
        onlineSearch: action.payload.data.onlineSearch,
        salesRatio: action.payload.data.salesRatio,
      };
    },
    saveSalesRatioChartDate(state, action) {
      return {
        ...state,
        ratioChartData: action.payload.data.ratioChartData,
      };
    },
    saveTabs(state, action) {
      return {
        ...state,
        tabs: action.payload.data.tabs,
      };
    },
    saveTabsChartDate(state, action) {
      return {
        ...state,
        tabsChartDate: action.payload.data.tabsChartDate,
      };
    },
  },
};
export default AnalysisModel;
