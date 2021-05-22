import superagent from 'superagent'
import cheerio from 'cheerio'
// node文件操作
import fs from 'fs'
import path from 'path'
// 数据结构的类型
interface ItemObj {
  time: number;
  data: Item[];
}
// 数据类型
interface Item {
  title: string;
  count: number;
}
// 内容类型
interface Content {
  // propName任意变量
  [propName:number]:Item[]
}
class crowller {
  private url='http://h33413398.host3v.com/';
  // 类初始化就会触发构造器
  constructor(){
    this.getHtml()
  }
  // 请求网页数据
  async getHtml() {
    const result = await superagent.get(this.url);
    this.getCurrentInfo(result.text)
  }
  // 提取需要的数据
  getCurrentInfo(html:string){
    // 使用插件
    const $ =cheerio.load(html)
    const courseItem = $('.course-item')
    // 数据结构数组
    const itemObj:Item[] = []
    courseItem.map((index,element)=>{
      const descs = $(element).find('.course-desc')
      // 标题
      const title = descs.eq(0).text();
      // 人数
      const count = parseInt(descs.eq(1).text().split('：')[1]);
      itemObj.push({
        title:title,
        count:count
      })
    })
    // 生成对应的数据结构
      this.structureData(itemObj)
  }
  // 生成数据结构
  structureData(data:Item[]){
  // 传给存储数据结构的函数
  this.saveItem({
    time:new Date().getTime(),
    data:data
  }) 
  }
  // 存储数据
  saveItem(data:ItemObj){
    const filePath = path.join(__dirname,'./data/dest.json')
    // 文件内容
    let fileContent:Content = {}
    if(fs.existsSync(filePath)) {
      // 文件存在
      fileContent=JSON.parse(fs.readFileSync(filePath,'utf-8'))
    }
    fileContent[data.time] = data.data
    fs.writeFileSync(filePath,JSON.stringify(fileContent))
  }
}

// 实例化类
const crwller = new crowller()
