class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    return this.getValue(this.vm, this.exp);
  }

  getValue() {

  }

  upDate() {
    let newValue = this.getValue(this.vm, this.exp);
    let oldValue = this.value;
    if (newValue !== oldValue) {
      this.cb(newValue);
    }
  }
}
