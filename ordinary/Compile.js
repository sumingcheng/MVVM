class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    if (this.el) {
      // 元素转为文档碎片
      this.compile(this.nodeToFragment(this.el));
    }
  }

  // 编译
  compile(docFragment) {
    let childNodes = docFragment.childNodes;
    // 将文档碎片类数组，转换为数组方便后续处理
    Array.from(childNodes).forEach((node) => {
      // 判断是否为元素节点
      if (this.isElementNode(node)) {
        // 元素节点 递归判断嵌套元素
        this.compileElement(node);
        this.compile(node);
      } else {
        // 文本节点
        this.compileText();
      }
    });
  }

  // 编译元素节点
  compileElement(node) {
    let attrs = node.attributes;
    Array.from(attrs).forEach(e => {
      // e.name,e.value 获取键值对
      let attrName = e.name;
      if (this.idDirective(attrName)) {
        let attrValue = e.value;
      }
    });
  }

  // 编译文本节点
  compileText(node) {

  }

  // 判读 v- 指令
  idDirective(name) {
    return name.includes('v-');
  }

  nodeToFragment(el) {
    let docFragment = document.createDocumentFragment();
    let firstChild;
    // 选择app下的第一个元素，直到全部的元素都处理完
    while (firstChild = el.firstChild) {
      docFragment.appendChild(firstChild);
    }
    return docFragment;
  }

// 判断是否是元素节点,对非元素进行处理
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
