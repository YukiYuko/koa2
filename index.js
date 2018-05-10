const Koa = require('koa');
// 引入 nodejs 模块 path
const path = require('path');
// 引入 bodyParser 解析post请求中间件
const bodyParser = require('koa-bodyparser');
// 引入模板引擎 koa-nunjucks-2
const nunjucks = require('koa-nunjucks-2');
// 引入 koa-static 指定静态目录中间件
const staticFiles = require('koa-static');
// 应用起始
const app = new Koa();
// 引入路由
const router = require('./router');

// 指定 public目录为静态资源目录，用来存放 js css images 等
// __dirname：全局变量，存储的是文件所在的文件目录, path.resolve(from, to)
// 用于将相对路径转为绝对路径。
app.use(staticFiles(path.resolve(__dirname, "./public")));

// path.join([path1][, path2][, ...])
// 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，
// Unix系统是"/"，Windows系统是"\"。
app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true
    }
}));

app.use(bodyParser());
router(app);
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
});
