import superagent from 'superagent'
class crowller {
  private url='http://h33413398.host3v.com/';
  // 获取数据
  private rowHtml = ''
  // 类初始化就会触发构造器
  constructor(){
    this.getHtml()
  }
  async getHtml() {
    const result = await superagent.get(this.url);
    console.log(result);
  }
}
