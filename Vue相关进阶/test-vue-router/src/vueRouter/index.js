let _Vue = null
export default class VueRouter {
  static install(Vue) {
    // 判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 把Vue构造函数注册为全局变量
    _Vue = Vue
    // 把Vue构造函数传入的router对象注入到Vue实例上
    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      },
    })
  }
  constructor(options) {
    this.options = options
    this.routerMap = {}
    this.data = _Vue.observable({
      current: '/',
    })
  }
  init() {
    this.createRouterMap()
    this.initComponent(_Vue)
    this.initEvent()
  }
  createRouterMap() {
    this.options.routes.forEach((route) => {
      this.routerMap[route.path] = route.component
    })
  }
  initComponent(Vue) {
    const self = this
    Vue.component('router-link', {
      props: {
        to: {
          type: String,
          required: true,
        },
      },
      // template: '<a :href="to"><slot></slot></a>',
      render(h) {
        return h(
          'a',
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickHandler,
            },
          },
          [this.$slots.default]
        )
      },
      methods: {
        clickHandler(e) {
          e.preventDefault()
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
        },
      },
    })
    _Vue.component('router-view', {
      render(h) {
        const component = self.routerMap[self.data.current]
        return h(component)
      },
    })
  }
  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
