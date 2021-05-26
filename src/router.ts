import {Router,Request,Response} from 'express'
import Crwller from './crowller'
import {getResponseData} from './util'

// 实例化路由
const router = Router()

// 创建get请求
router.get('/',(req:Request,res:Response)=>{
  console.log(req.body);
  
  res.send('helo!')
})
// 刷新网页爬取数据
router.get('/getData',(req:Request,res:Response)=>{
  // 实例化类
    let htmlData =new Crwller();
    res.json(getResponseData(true))
})

// 导出
export default router