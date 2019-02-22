import {Base} from './base.js';

class Api extends Base {
  constructor(){
    super();
  }
  
  /**
   * 获取文章列表
   * @param  page  页码
   */
  getArticleList(page){
    let param = {
      url: 'getArticleList.php',
      type: 'POST',
      data: {
        page: page
      }
    };
    return this.request(param);
  }
}


export {Api};