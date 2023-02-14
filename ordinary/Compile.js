CompileUtils = {
  // 处理data
  model(node, vm, exp) {
    let upDateFn = this.updater['modelUpdater'];
    upDateFn && upDateFn(node, this.getValue(vm, exp));
  },
  // 编译{{}}
  text(node, vm, exp) {
    let reg = /\{\{([^}]+)\}\}/g;
    let value = exp.replace(reg, (...args) => {
      return args[1];
    });
    // 使用textUpdater处理器
    let upDateFn = this.updater['textUpdater'];
    upDateFn && upDateFn(node, this.getValue(vm, value));
  },
  // 替换节点内容
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    textUpdater(node, value) {
      node.textContent = value;
    }
  },
  getValue(vm, exp) {
    let arr = exp.split('.');
    // 生成数组，找vm.$data.massage.a
    return arr.reduce((previousValue, currentValue) => {
      return previousValue[currentValue];
    }, vm.$data);
  }
};

class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    if (this.el) {
      let Fragment = this.nodeToFragment(this.el);
      // 元素转为文档碎片
      this.compile(Fragment);
      this.el.appendChild(Fragment);
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
        this.compileText(node);
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
        let type = attrName.slice(2);
        // 筛选指令
        CompileUtils[type](node, this.vm, attrValue);
      }
    });
  }

  // 编译文本节点
  compileText(node) {
    let text = node.textContent;
    // 匹配大括号内的内容
    let reg = /\{\{([^}]+)\}\}/g;
    if (reg.test(text)) {
      CompileUtils['text'](node, this.vm, text);
    }
  }

  // 判断 v- 指令
  idDirective(name) {
    return name.includes('v-');
  }

  // 节点转换为文档碎片
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


