import service from '../utils/interceptor';

// form

/**
 * 提交
 */
export function FormSubmit(params) {
  return service.request({
    url: params.url,
    method: params.method || 'post',
    data: params.data,
  });
}

// table

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
 * 删除
 */
export function TableDelete(params) {
  return service.request({
    url: params.url,
    method: params.method || 'post',
    data: params.data,
  });
}
