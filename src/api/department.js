import service from '../../src/utils/interceptor';

/**
 * 添加
 */
export function Add(data) {
  return service.request({
    url: '/department/add/',
    method: 'post',
    data,
  });
}

/**
 * 禁启用
 */
export function Status(data) {
  return service.request({
    url: '/department/status/',
    method: 'post',
    data,
  });
}

/**
 * 详情
 */
export function Detailed(data) {
  return service.request({
    url: '/department/detailed/',
    method: 'post',
    data,
  });
}

/**
 * 编辑
 */
export function Edit(data) {
  return service.request({
    url: '/department/edit/',
    method: 'post',
    data,
  });
}
