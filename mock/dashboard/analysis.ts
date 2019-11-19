// @ts-ignore
import mockjs from 'mockjs';

export default {
  'GET /analysis/visits': mockjs.mock({
    'visits|8': [{ year: '@date()', 'value|2000-5000': 5000 }],
  }),
  'GET /analysis/payNumber': mockjs.mock({
    'payNumber|8': [{ date: '@date()', 'value|1-20': 20 }],
  }),
  'GET /analysis/percent': mockjs.mock({
    'percent|1-100': 100,
  }),
  'GET /analysis/sales': mockjs.mock({
    'sales|1-1': [
      {
        'id|+1': 1,
        month: '1月',
        'value|0-1200': 1200,
        shop: '工专路 1 号店',
        rank: '323,234',
      },
      {
        'id|+1': 2,
        month: '2月',
        'value|0-1200': 1200,
        shop: '工专路 2 号店',
        rank: '323,234',
      },
      {
        'id|+1': 3,
        month: '3月',
        'value|0-1200': 1200,
        shop: '工专路 3 号店',
        rank: '323,234',
      },
      {
        'id|+1': 4,
        month: '4月',
        'value|0-1200': 1200,
        shop: '工专路 4 号店',
        rank: '323,234',
      },
      {
        'id|+1': 5,
        month: '5月',
        'value|0-1200': 1200,
        shop: '工专路 5 号店',
        rank: '323,234',
      },
      {
        'id|+1': 6,
        month: '6月',
        'value|0-1200': 1200,
        shop: '工专路 6 号店',
        rank: '323,234',
      },
      {
        'id|+1': 7,
        month: '7月',
        'value|0-1200': 1200,
        shop: '工专路 7 号店',
        rank: '323,234',
      },
      {
        'id|+1': 8,
        month: '8月',
        'value|0-1200': 1200,
        shop: '工专路 8 号店',
        rank: '323,234',
      },
      {
        'id|+1': 9,
        month: '9月',
        'value|0-1200': 1200,
        shop: '工专路 9 号店',
        rank: '323,234',
      },
      {
        'id|+1': 10,
        month: '10月',
        'value|0-1200': 1200,
        shop: '工专路 10 号店',
        rank: '323,234',
      },
      {
        'id|+1': 11,
        month: '11月',
        'value|0-1200': 1200,
        shop: '工专路 11 号店',
        rank: '323,234',
      },
      {
        'id|+1': 12,
        month: '12月',
        'value|0-1200': 1200,
        shop: '工专路 12 号店',
        rank: '323,234',
      },
    ],
  }),
  'GET /analysis/onlineSearch': mockjs.mock({
    data: {
      onlineSearch: {
        title: '线上热门搜索',
        searchUser: '搜索用户数',
        searchUsers: '12,321',
        userRatio: 17.1,
        'users|7': [{ date: '@date', 'value|1-10': 5 }],
        perSearch: '人均搜索次数',
        searchNum: '2.7',
        searchRatio: -26.2,
        'search|7': [{ date: '@date', 'value|1-10': 5 }],
        'tables|50': [
          {
            'id|+1': 1,
            keyword: '搜索关键词',
            'users|100-1000': 500,
            weekGain: '@float(-100, 100, 0, 0)',
          },
        ],
      },
      salesRatio: {
        title: '销售额类别占比',
        chartTitle: '销售额',
      },
    },
  }),
  'GET /analysis/salesRatioChartDate': mockjs.mock({
    data: {
      // 'ratioChartData|5-6': [
      //   { 'type|1': ['家用电器', '食用酒水', '个护健康', '服饰箱包', '母婴产品', '其他'], 'value|1000-5000': 2000 },
      // ],
      ratioChartData: [
        { type: '家用电器', 'value|1000-5000': 2000 },
        { type: '食用酒水', 'value|1000-5000': 2000 },
        { type: '个护健康', 'value|1000-5000': 2000 },
        { type: '服饰箱包', 'value|1000-5000': 2000 },
        { type: '母婴产品', 'value|1000-5000': 2000 },
        { type: '其他', 'value|1000-5000': 2000 },
        // { 'type|1': ['家用电器', '食用酒水', '个护健康', '服饰箱包', '母婴产品', '其他'], 'value|1000-5000': 2000 },
      ],
    },
  }),
  'GET /analysis/tabs': mockjs.mock({
    data: {
      'tabs|10': [{
        'id|+1': 1,
        'convertionRate|1-100': 50,
        pies: [{
          item: '不展示1',
          'value|1-10': 5,
        }, {
          item: '不展示2',
          'value|1-10': 5,
        }],
      }],
    },
  }),
  'GET /analysis/tabsChartDate': mockjs.mock({
    data: {
      'tabsChartDate|50': [{

      }],
    },
  }),
};
