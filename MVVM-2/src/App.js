import {render,createApp} from '../MVVM/render'

function App() {
  const state = useReactive({
    count: 0,
    name: 'yyds'
  })

  const add = (num) => {
    state.count += num
  }
  const minus = (num) => {
    state.count -= num
  }

  const changeName = (name) => {
    state.name = name
  }

  return {
    template: `
    <h1>{{ count }}</h1>
    <h2>{{ name }}</h2>
    <button onClick="add(2)">+</button>
    <button onClick="minus(1)">-</button>
    <button onClick="changeName('YYDS')>ChangeName</button>
    `,
    state,
    method: {
      add,
      minus,
      changeName
    }
  }
}