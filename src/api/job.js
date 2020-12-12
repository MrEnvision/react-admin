import service from '../utils/interceptor';

/**
 * 添加
 */
export function Add(data) {
  return service.request({
    url: '/job/add/',
    method: 'post',
    data,
  });
}

/**
 * 禁启用
 */
export function Status(data) {
  return service.request({
    url: '/job/status/',
    method: 'post',
    data,
  });
}

/**
 * 详情
 */
export function Detailed(data) {
  return service.request({
    url: '/job/detailed/',
    method: 'post',
    data,
  });
}
