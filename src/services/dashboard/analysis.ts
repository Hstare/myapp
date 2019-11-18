import request from 'umi-request';

export async function getVisits(params: string) {
  return request('/analysis/visits', {
    method: 'GET',
    data: params,
  });
}

export async function getPayNumber() {
  return request.get('/analysis/payNumber', {
    method: 'GET',
  });
}

export async function getPercent() {
  return request.get('/analysis/percent');
}

export async function getSales() {
  return request.get('/analysis/sales');
}

export async function getOnlineSearch(currentPage: number, pageSize: number) {
  return request.get('/analysis/onlineSearch', {
    params: {
      currentPage,
      pageSize,
    },
  });
}

export async function getSalesRatioChartDate() {
  return request.get('/analysis/salesRatioChartDate');
}
