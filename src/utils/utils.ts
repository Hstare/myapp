import { parse } from 'querystring';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import moment from 'moment';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export function getTimeDistance(type: 'day' | 'week' | 'month' | 'year'): RangePickerValue {
  let currentDateVar: RangePickerValue;
  if (type === 'day') {
    currentDateVar = [moment(), moment()];
  } else if (type === 'week') {
    currentDateVar = [moment().weekday(0), moment().weekday(6)];
  } else if (type === 'month') {
    const monthStart = `${moment().year()}+${moment().month() + 1}+'01'`;
    const monthEnd = `${moment().year()}+${moment().month() + 1}+${moment().daysInMonth()}`;
    currentDateVar = [moment(monthStart, 'YYYY-MM-DD'), moment(monthEnd, 'YYYY-MM-DD')];
  } else if (type === 'year') {
    const yearStart = `${moment().year()}+'01'+'01'`;
    const yearEnd = `${moment().year()}+'12'+'31'`;
    currentDateVar = [moment(yearStart, 'YYYY-MM-DD'), moment(yearEnd, 'YYYY-MM-DD')];
  } else {
    currentDateVar = [moment(), moment()];
  }
  return currentDateVar;
}
