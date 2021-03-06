/*
* 代码中，我们把 JSON 数据的处理方法挂载在 ctx 对象中，
* 并起名为 send。当我们需要返回 JSON 数据给客户端时候，
* 只需要调用此方法，并把 JSON 对象作为参数传入到方法中就行了.
*
*   ctx.send({
      status: 'success',
      data: 'hello ikcmap'
    })

    bind 将 this 指向 ctx，相当于执行了

    ctx.set("Content-Type", "application/json")
    ctx.body = JSON.stringify(json)
* */

module.exports = () => {
    function render(json) {
        this.set("Content-Type", "application/json");
        this.body = JSON.stringify(json)
    }
    return async (ctx, next) => {
        ctx.send = render.bind(ctx);
        await next()
    };
};