class Router {
    constructor() {
        this.routes = {};
        this.currentUrl = '';
    }
    router(path, callback) {
        this.routes[path] = callback || (() => {});
    }
    updateView(url) {
        this.currentUrl = url;
        let cb = this.routes[url];
        cb && cb();
    }

    bindLink() {
        let alinks = document.querySelectorAll('a[data-href]');
        for (let i = 0; i < alinks.length; i++) {
            let alink = alinks[i];
            alink.addEventListener('click', (e) => {
                e.preventDefault();
                let url = alink.getAttribute('data-href');
                history.pushState({}, null, url);
                this.updateView(url); 
            }, false);
        }
    }
    init() {
        this.bindLink();
        window.addEventListener('popstate', () => {
            this.updateView(window.location.pathname);
        }, false);
        window.addEventListener('load', () => {
            this.updateView('/')
        }, false);
    }
}