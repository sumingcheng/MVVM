class Observer {
  constructor(data) {
    this.observe(data)
  }

  observe(data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach((key) => {
      // 数据劫持
      this.defineReactive(data, key, data[key])
      // 递归 监听内部的值
      this.observe(data[key])
    })
  }

  defineReactive(obj, key, value) {
    let _this = this
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      // 控制台内可以看到被劫持的getter和setter
      get() {
        // 获取
        Dep.target && dep.addSubs(Dep.target)
        return value
      },
      set(newValue) {
        // 值改变才设置
        if (newValue !== value) {
          // 新增加的值，也要增加getter和setter
          _this.observe(newValue)
          value = newValue
          dep.notify()
        }
      }
    })
  }
}

class Dep {
  constructor() {
    // 订阅者数组
    this.subs = []
  }

  // 订阅
  addSubs(watcher) {
    this.subs.push(watcher)
  }

  // 发布
  notify() {
    this.subs.forEach(watcher => watcher.updater())
  }
}
