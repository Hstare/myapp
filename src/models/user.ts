import { Effect } from 'dva';
import { Reducer } from 'redux';

import { queryCurrent, query as queryUsers, queryCurrentMenu } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { MenuDataItem } from '@ant-design/pro-layout';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
  currentMenu?: MenuDataItem[];
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    fetchCurrentMenu: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    saveCurrentMenu: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
    currentMenu: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      setAuthority(['admin']);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchCurrentMenu(_, { call, put }) {
      const response = yield call(queryCurrentMenu);
      console.log('获取到了当前用户的目录：', response);
      yield put({
        type: 'saveCurrentMenu',
        payload: response,
      })
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    saveCurrentMenu(state, action) {
      return {
        ...state,
        currentMenu: action.payload || [],
      }
    },
  },
};

export default UserModel;
