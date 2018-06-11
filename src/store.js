import regeneratorRuntime from "regenerator-runtime"

export default class Store {
  constructor(key, init_func) {
    this._data = undefined
    this.key = key
    this._connectedComponents = []
    Store.instances = { ...Store.instances, [key]: this }
    if (typeof init_func === "function") init_func()
  }

  get() {
    // Should check for `undefined` by the receiver
    if (Array.isArray(this._data)) return [...this._data]
    if (typeof this._data === "object") return { ...this._data }
    return this._data
  }

  connect(component, callback) {
    if (!this._connectedComponents.includes(component))
      this._connectedComponents = [...this._connectedComponents, component]
    // initialize state if it isn't
    component.state = component.state || {}
    if (typeof callback === "function") callback()
  }

  async set(data) {
    if (this._data !== data){
    this._data = data
    await this._syncState()
    }
    return this._data
  }

  async disconnect(component) {
    this._connectedComponents = await this._connectedComponents.filter(
      connectedComponent => component !== connectedComponent
    )
    console.warn("Disconnected.")
  }

  connections() {
    // list connections
    return this._connectedComponents
  }

  async _syncState() {
    await Promise.all(
      this._connectedComponents.map(async component => {
        component.setState({
          [this.key]: this._data
        })
      })
    )
  }

  static list(key) {
    if (key) return Store.instances[key] // check for undefined in case the key doesn't
    return Store.instances
  }
}
