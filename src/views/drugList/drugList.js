export default class Drug {
  constructor() {
    this.list = []
    this.getList()
  }
  static getInstance(name) {
    if (!this.instance) { this.instance = new Drug(name) }
    return this.instance
  }
  // 获取list
  getList() {
    this.list = JSON.parse(localStorage.getItem('drugList') || '[]')
  }
  // 设置list
  setList(drugList) {
    localStorage.setItem('drugList', JSON.stringify(drugList))
    this.getList()
  }
  // 根据ID获取项
  getDrugItem(id) {
    return this.list.find(item => item.id === id)
  }
  // 根据ID移除项
  removeDrugItem(id) {
    this.setList(this.list.filter(item => item.id !== id))
    this.getList()
  }
  // 添加项
  addDrugItem(item) {
    this.setList(this.list.concat([item]))
    this.getList()
  }
  // 更新项
  updateDrugItem(item) {
    const targetItemIndex = this.list.findIndex(drug => drug.id === item.id)
    this.list[targetItemIndex] = item
    this.setList(this.list)
    this.getList()
  }
}
