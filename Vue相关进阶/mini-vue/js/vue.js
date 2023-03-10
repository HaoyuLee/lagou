class Vue {
  data() {}
  constructor(options) {
    // 通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el =
      typeof options.el === 'string'
        ? document.querySelector(options.el)
        : options.el
    // 把data中的成员转换成getter和setter， 注入到Vue实例中
    this._proxyData(options.data)
    // 调用observe对象 监听数据变化
    new Observer(this.$data)
    // 调用compiler对象 解析指令和插值表达式
    new Compiler(this)
  }
  _proxyData(data) {
    for (let key in data) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        setter() {},
        get() {
          return data[key]
        },
        set(newValue) {
          if (newValue === data[key]) {
            return
          }
          data[key] = newValue
        },
      })
    }
  }
}
