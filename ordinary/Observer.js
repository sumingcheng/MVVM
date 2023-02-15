class Observer {
  constructor(data) {
    this.observe(data);
  }

  observe(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach((key) => {
      // 数据劫持
      this.defineReactive(data, key, data[key]);
      // 递归 监听内部的值
      this.observe(data[key]);
    });
  }

  defineReactive(obj, key, value) {
    let _this = this;
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      // 控制台内可以看到被劫持的getter和setter
      get() {
        return value;
      },
      set(newValue) {
        // 值改变才设置
        if (newValue !== value) {
          // 新增加的值，也要增加getter和setter
          _this.observe(newValue);
          value = newValue;
        }
      }
    });
  }
}
