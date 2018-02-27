/**
 * routes 用来存放不同路由对应的回调函数
   init 用来初始化路由，在 load 事件发生后刷新页面，并且绑定 hashchange 事件，当 hash 值改变时触发对应回调函数
 * 
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentUrl = '';
    }
    route(path, callback) {
        this.routes[path] = callback || (() => {});
    }
    updateView(e) { // 通知相应路径对应的回调函数执行 从而更新对应视图
        this.currentUrl = location.hash.slice(1) || '/';
        let cb = this.routes[this.currentUrl];
        cb && cb()
    }
    init() {
        window.addEventListener('load', this.updateView.bind(this), false);
        window.addEventListener('hashchange', this.updateView.bind(this), false);
    }
}