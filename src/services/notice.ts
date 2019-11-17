import request from '@/utils/request';

export async function getNotices(params: string) {
  return request('/api/notices', {
    method: 'GET',
    data: params,
  });
}
