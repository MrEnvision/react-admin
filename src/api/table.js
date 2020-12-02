import service from '../../src/utils/interceptor';

/**
 * 列表
 */
export function TableList(params) {
  return service.request({
    url: params.url,
    method: params.method || 'post',
    data: params.data,
  });
}

/**
 * 批量删除
 */
export function TableDelete(params) {
  return service.request({
    url: params.url,
    method: params.method || 'post',
    data: params.data,
  });
}
