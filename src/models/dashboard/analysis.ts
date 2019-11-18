import { Effect } from "dva";
import { Reducer } from "redux";
import {
  getOnlineSearch,
  getPayNumber,
  getPercent,
  getSales,
  getSalesRatioChartDate,
  getVisits
} from "@/services/dashboard/analysis";

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
  tables?: [{ id: number; keyword: string; users: number; weekGain: number }];
}

export interface IAnalysisSalesRatioType {
  title?: string;
  chartTitle?: string;
}

export interface IAnalysisRatioChartDataType {
  type?: string;
  value?: number;
}

export interface IAnalysisStateType {
  visits?: IAnalysisVisitsType[];
  payNumbers?: IAnalysisPayNumsType[];
  percent?: IAnalysisPercentType;
  sales?: IAnalysisSalesType[];
  onlineSearch?: IAnalysisOnlineSearchType;
  salesRatio?: IAnalysisSalesRatioType;
  ratioChartData?: IAnalysisRatioChartDataType[];
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
  };
  reducers: {
    saveVisits: Reducer<IAnalysisStateType>;
    savePayNumbers: Reducer<IAnalysisStateType>;
    savePercent: Reducer<IAnalysisStateType>;
    saveSales: Reducer<IAnalysisStateType>;
    saveOnlineSearch: Reducer<IAnalysisStateType>;
    saveSalesRatioChartDate: Reducer<IAnalysisStateType>;
  };
}

const AnalysisModel: IAnalysisModelType = {
  namespace: "analysis",
  state: {
    visits: [],
    payNumbers: [],
    percent: {},
    sales: [],
    onlineSearch: {},
    salesRatio: {},
    ratioChartData: []
  },
  effects: {
    *getVisits(_, { call, put }) {
      const response = yield call(() => getVisits(""));
      yield put({
        type: "saveVisits",
        payload: response.visits
      });
    },
    *getPayNumbers(_, { call, put }) {
      const response = yield call(() => getPayNumber());
      yield put({
        type: "savePayNumbers",
        payload: response.payNumber
      });
    },
    *getPercent(_, { call, put }) {
      const response = yield call(() => getPercent());
      yield put({
        type: "savePercent",
        payload: response
      });
    },
    *getSales(_, { call, put }) {
      const response = yield call(() => getSales());
      yield put({
        type: "saveSales",
        payload: response.sales
      });
    },
    *getOnlineSearch(_, { call, put }) {
      const response = yield call(() => getOnlineSearch());
      yield put({
        type: "saveOnlineSearch",
        payload: response.sales
      });
    },
    *getSalesRatioChartDate(_, { call, put }) {
      const response = yield call(() => getSalesRatioChartDate());
      yield put({
        type: "saveSalesRatioChartDate",
        payload: response.sales
      });
    }
  },
  reducers: {
    saveVisits(state, { payload }) {
      return {
        ...state,
        visits: payload || []
      };
    },
    savePayNumbers(state, { payload }) {
      console.log("savePayNumbers payload", payload);
      return {
        ...state,
        payNumbers: payload || []
      };
    },
    savePercent(state, { payload }) {
      return {
        ...state,
        percent: payload || {}
      };
    },
    saveSales(state, action) {
      return {
        ...state,
        sales: action.payload || []
      };
    },
    saveOnlineSearch(state, action) {
      return {
        ...state,
        onlineSearch: action.payload.data.onlineSearch,
        salesRatio: action.payload.data.salesRatio
      };
    },
    saveSalesRatioChartDate(state, action) {
      return {
        ...state,
        ratioChartData: action.payload.data.salesRatio
      };
    }
  }
};
export default AnalysisModel;
