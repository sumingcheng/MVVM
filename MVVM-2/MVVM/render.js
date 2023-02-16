import { eventFormat, stateFormat } from '../index'

export function useDOM({ template, state, methods }, rootDOM) {
  console.log(template, state, methods, rootDOM)
  rootDOM.innerHTML = render(template, state)
}

export function render(template, state) {
  // 处理事件
  template = eventFormat(template)
  // 处理模板
  template = stateFormat(template, state)
  return template
}
