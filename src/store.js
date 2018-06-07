import regeneratorRuntime from "regenerator-runtime";

export default class Store {
  constructor(key, init_func) {
    this._data = undefined
    this.key = key
    this._callBacks = []
    if (init_func) init_func()
  }

  get() {
    // Should check for `undefined` by the receiver
    return this._data
  }

  async set(data) {
    this._data = data
    await this._callBackAll()
    return this._data
  }

  connect(component, callback) {
    if (!this._callBacks.includes(component)) this._callBacks.push(component)
    // initialize state if it isn't
    component.state = component.state || {}
    if (callback) callback()
  }

  connections() {
    // list connections
    return this._callBacks
  }

  async disconnect(component) {
    this._callBacks = await this._callBacks.filter(
      callback => component !== callback
    )
    console.warn("Disconnected.")
  }

  async _callBackAll() {
    await Promise.all(
      this._callBacks.map(async component => {
        component.setState({
          [this.key]: this._data
        })
      })
    )
  }
}