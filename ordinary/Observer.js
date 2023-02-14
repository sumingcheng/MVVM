class Observer {
  constructor(data) {
    this.observe(data);
  }

  observe(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    console.log(data);
  }
}
