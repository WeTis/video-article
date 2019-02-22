import {Config} from './config.js';

class Base{
   constructor(){
     this.baseUrl = Config.baseUrl;
   }

   request(params) {
      
      let header = {
        "content-type": 'application/x-www-form-urlencoded'
      };
      return new Promise((resolve,reject) => {
        wx.request({
          url: this.baseUrl + params.url,
          data: params.data,
          header: header,
          method: params.type,
          success: (res) => {
            resolve(res);
          },
          fail: (res) => {
            reject(res);
          },
          complete: (res) => {

          },
        })
      })
      
   }
}

export {Base}