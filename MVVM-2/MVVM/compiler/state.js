// 取出大括号的内容
import { randomNum } from '../shared/utils'

const reg_html = /\<.+?>\{\{(.+?)\}\}\<\/.+?\>/g
const reg_tag = /\<(.+?)\>/
export const statePool = []

export function stateFormat(template) {
  let _state = {}
  template = template.replace(reg_html, function (node, key) {
    const matched = node.match(reg_tag)
    const _mark = randomNum()

    _state.mark = _mark
    statePool.push(_state)
    _state = {}
    return `<${matched[1]} data-mark="${_mark}">{{${key}}}</${matched[1]}>`
  })
  return template
}
