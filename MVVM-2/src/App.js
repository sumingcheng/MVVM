function App() {
  return {
    template: `
    <h1>{{ count }}</h1>
    <h2>{{ name }}</h2>
    <button onClick="add(2)">+</button>
    <button onClick="minus(1)">-</button>
    <button onClick="changeName('YYDS')>ChangeName</button>
    `,
    state,
    method: {}
  }
}
