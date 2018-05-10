// 引入 service 文件
const HomeService = require('../service/home')
module.exports = {
    // 修改 index 方法
    index: async function (ctx, next) {
        await ctx.render("home/index", {title: ctx.cookies.get('MyName')})
        ctx.cookies.set(
            'MyName','JSPang',{
                domain:'127.0.0.1', // 写cookie所在的域名
                path:'/index',       // 写cookie所在的路径
                maxAge:1000*60*60*24,   // cookie有效时长
                expires:new Date('2018-12-31'), // cookie失效时间
                httpOnly:false,  // 是否只用于http请求中获取
                overwrite:false  // 是否允许重写
            }
        );
    },
    home: async(ctx, next) => {
        console.log(ctx.request.query)
        console.log(ctx.request.querystring)
        ctx.response.body = '<h1>HOME page</h1>'
    },
    homeParams: async(ctx, next) => {
        console.log(ctx.params)
        ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    },
    login: async(ctx, next) => {
        await ctx.render('home/login',{
            btnName: 'GoGoGo'
        })
    },
    // 修改 register 方法
    register: async function (ctx, next){
        let params = ctx.request.body
        let name = params.name
        let password = params.password
        let res = await HomeService.register(name,password)
        if(res.status === "-1"){
            await ctx.render("home/login", res.data)
        }else{
            ctx.state.title = "个人中心"
            await ctx.render("home/success", res.data)
        }
    }
};
