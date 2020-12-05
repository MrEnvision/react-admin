import service from '../../src/utils/interceptor';

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
