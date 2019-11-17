// @ts-ignore
import mockjs from 'mockjs';

export default {
  // 'GET /analysis/visits': [
  //   {
  //     year: '1996',
  //     value: 3405,
  //   },
  //   {
  //     year: '1997',
  //     value: 3198,
  //   },
  //   {
  //     year: '1998',
  //     value: 3233,
  //   },
  //   {
  //     year: '1999',
  //     value: 3204,
  //   },
  //   {
  //     year: '2000',
  //     value: 3323,
  //   },
  //   {
  //     year: '2001',
  //     value: 2323,
  //   },
  // ],

  // 'GET /analysis/payNumber': [
  //   {
  //     date: '2019-11-12',
  //     value: 6,
  //   },
  //   {
  //     date: '2019-11-13',
  //     value: 3,
  //   },
  //   {
  //     date: '2019-11-14',
  //     value: 4,
  //   },
  //   {
  //     date: '2019-11-15',
  //     value: 9,
  //   },
  //   {
  //     date: '2019-11-16',
  //     value: 2,
  //   },
  //   {
  //     date: '2019-11-17',
  //     value: 4,
  //   },
  //   {
  //     date: '2019-11-18',
  //     value: 11,
  //   },
  // ],
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
    'sales|1-1': [{
      'id|+1': 1,
      month: '1月',
      'value|0-1200': 1200,
      shop: '工专路 1 号店',
      rank: '323,234',
    }, {
      'id|+1': 2,
      month: '2月',
      'value|0-1200': 1200,
      shop: '工专路 2 号店',
      rank: '323,234',
    }, {
      'id|+1': 3,
      month: '3月',
      'value|0-1200': 1200,
      shop: '工专路 3 号店',
      rank: '323,234',
    }, {
      'id|+1': 4,
      month: '4月',
      'value|0-1200': 1200,
      shop: '工专路 4 号店',
      rank: '323,234',
    }, {
      'id|+1': 5,
      month: '5月',
      'value|0-1200': 1200,
      shop: '工专路 5 号店',
      rank: '323,234',
    }, {
      'id|+1': 6,
      month: '6月',
      'value|0-1200': 1200,
      shop: '工专路 6 号店',
      rank: '323,234',
    }, {
      'id|+1': 7,
      month: '7月',
      'value|0-1200': 1200,
      shop: '工专路 7 号店',
      rank: '323,234',
    }, {
      'id|+1': 8,
      month: '8月',
      'value|0-1200': 1200,
      shop: '工专路 8 号店',
      rank: '323,234',
    }, {
      'id|+1': 9,
      month: '9月',
      'value|0-1200': 1200,
      shop: '工专路 9 号店',
      rank: '323,234',
    }, {
      'id|+1': 10,
      month: '10月',
      'value|0-1200': 1200,
      shop: '工专路 10 号店',
      rank: '323,234',
    }, {
      'id|+1': 11,
      month: '11月',
      'value|0-1200': 1200,
      shop: '工专路 11 号店',
      rank: '323,234',
    }, {
      'id|+1': 12,
      month: '12月',
      'value|0-1200': 1200,
      shop: '工专路 12 号店',
      rank: '323,234',
    }],
  }),
};
