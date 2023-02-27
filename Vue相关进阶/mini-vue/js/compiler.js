class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compiler(this.el)
  }
  compiler(el) {
    // 编译模板 处理文本节点和元素节点
    let childNodes = el.childNodes
    Array.from(childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        this.compilerText(node)
      } else if (this.isElementNode(node)) {
        this.compilerElement(node)
      }

      // 判断是否又子节点， 如果有，要递归调用compiler
      if (node.childNodes && node.childNodes.length) {
        this.compiler(node)
      }
    })
  }
  // 编译元素节点，处理指令
  compilerElement(node) {
    // console.log(node.attributes)
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach((attr) => {
      // 判断是否是指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        attrName = attrName.substr(2)
        let key = attr.value
        this.updater(node, key, attrName)
      }
    })
  }
  updater(node, key, attrName) {
    let updateFn = this[`${attrName}Updater`]
    updateFn && updateFn.apply(this, [node, this.vm[key], key])
  }
  textUpdater(node, value, key) {
    // 处理v-text指令
    node.textContent = value

    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
  modelUpdater(node, value, key) {
    // 处理v-model指令
    node.value = value

    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })

    // 双向绑定
    node.addEventListener('input', (e) => {
      this.vm[key] = e.target.value
    })
  }
  // 编译文本节点，处理插值表达式
  compilerText(node) {
    // console.dir(node)
    // {{ variableName }}
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      console.log(key)
      node.textContent = value.replace(reg, this.vm[key])

      // 创建watcher对象，当数据改变时更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }
  // 判断元素是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 判断节点是否为文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }
  // 判断节点是否为元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}
