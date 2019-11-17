import { Reducer } from 'redux';
import { Effect } from 'dva';
import { getNotices } from '@/services/notice';

export interface NoticeType {
  id: string,
  avatar: string,
  title: string,
  description: string,
  datetime: string,
  type: string,
  clickClose: boolean,
}
export interface NoticeStateType {
  notices?: NoticeType[];
}

export interface NoticeModelType {
  namespace: string;
  state: NoticeStateType;
  effects: {
    getNotices: Effect;
  };
  reducers: {
    changeClickClose: Reducer<NoticeStateType>;
    list: Reducer<NoticeStateType>;
  };
}

const NoticeModel: NoticeModelType = {
  namespace: 'notice',
  state: {
    notices: [],
  },
  effects: {
    *getNotices(_, { call, put }) {
      const response = yield call(() => getNotices(''));
      yield put({
        type: 'list',
        payload: response,
      });
    },
  },
  reducers: {
    changeClickClose(state = {}, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    list(state, { payload }) {
      console.log('payload', payload);
      console.log('state', {
        ...state,
        notices: payload,
      });
      return {
        ...state,
        notices: payload,
      };
    },
  },
};

export default NoticeModel;
