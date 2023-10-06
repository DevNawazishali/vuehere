/* eslint-disable import/no-cycle */
import http from '../plugins/http';

// const key = 'https://bombapi.gotogo.club/api'; // 测试
const key = 'https://www.bomberquest.co/api'; // 生产

const api = http[key] || http.instance(key); // api modules.test

class Service {
  constructor() {
    this.api = api;
  }

  // eslint-disable-next-line class-methods-use-this
  buy(params) {
    return http.get('/api/buy', {
      params,
    });
  }

  checkCode(params) {
    return this.api.get('/agent/getByCode', { params });
  }

  addCode(params) {
    return this.api.post('/agentRecord/save', params);
  }

  getByCode(params) { // 校验code
    return this.api.get('/agent/getByCode', { params });
  }

  agentRecordAdd(params) {
    return this.api.post('/agentRecord/save', params);
  }


  // initCode(params) {
  //   return this.api.post('/agentRecord/init', params);
  // }

  // post请求
  // eslint-disable-next-line class-methods-use-this
  postRequest(params) {
    return http.post('/api/url', params);
  }

  // 公共表格数据请求方法
  // publicGet(url, params) {
  //   return http.get(url, {
  //     params
  //   })
  // }

  // 公共post方法
  // publicPost(url, params) {
  //   return http.post(url, params)
  // }
}
export default new Service();
