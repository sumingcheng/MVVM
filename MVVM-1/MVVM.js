class MVVM {
  // constructor 接收传入的配置项
  constructor(opt) {
    // $el 标记 表示为Vue内部的属性
    this.$el = opt.el;
    this.$data = opt.data;
    if (this.$el) {
      // 编译，传入this，为了方便处理其他的配置项，这里建议直接传入this
      new Observer(this.$data);
      new Compile(this.$el, this);
    }
  }
}
