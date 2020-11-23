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
