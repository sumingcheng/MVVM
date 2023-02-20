import { eventFormat, stateFormat } from '../index'
import { bindEvent } from './compiler/event'

export function useDOM({ template, state, methods }, rootDOM) {
  rootDOM.innerHTML = render(template, state)
  bindEvent(methods)
}

export function render(template, state) {
  // 处理事件
  template = eventFormat(template)
  // 处理模板
  template = stateFormat(template, state)
  return template
}
