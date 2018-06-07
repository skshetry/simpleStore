export default class Store {
  constructor(key, init_func) {
    this.data = undefined
    this.key = key
    this.callBacks = []
    if (init_func) init_func()
  }

  get() {
    // Should check for `undefined` by the receiver
    return this.data
  }

  async set(data) {
    this.data = data
    await this.callBackAll()
    return this.data
  }

  connect(component, callback) {
    if (!this.callBacks.includes(component)) this.callBacks.push(component)
    // initialize state if it isn't
    component.state = component.state || {}
    if (callback) callback()
  }

  connections() {
    // list connections
    return this.callBacks
  }

  async disconnect(component) {
    this.callBacks = await this.callBacks.filter(
      callback => component !== callback
    )
    console.warn("Disconnected.")
  }

  async callBackAll() {
    await Promise.all(
      this.callBacks.map(async component => {
        component.setState({
          [this.key]: this.data
        })
      })
    )
  }
}