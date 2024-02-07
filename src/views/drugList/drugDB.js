import { init, getInstance } from 'ts-indexdb'
export default {
  data() {
    return {
      dbName: 'drug',
      tableName: 'drugList',
      dbInstance: null,
      drugList: []
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    async init() {
      await this.initDB()
      await this.getDrugList()
    },
    // 初始化数据库
    async initDB() {
      await init({
        dbName: this.dbName, // 数据库名称
        version: 1, // 版本号
        tables: [
          {
            tableName: this.tableName, // 表名
            option: { keyPath: 'id', autoIncrement: true } // 指明主键为id
          }
        ]
      })
      this.dbInstance = getInstance()
    },
    // 获取最新的药品列表
    async getDrugList() {
      const res = await this.dbInstance.queryAll({
        tableName: this.tableName
      })
      console.log('res', res)
      this.drugList = res
    },
    // 根据ID获取项
    async getDrugItem(id) {
      const res = await this.dbInstance.query_by_keyValue({
        tableName: this.tableName,
        key: 'id',
        value: id
      })
      return res
    },
    // 根据ID移除项
    async removeDrugItem(id) {
      await this.dbInstance.delete({
        tableName: this.tableName,
        condition: item => item.id === id
      })
      await this.getDrugList()
    },
    // 添加项
    async addDrugItem(item, isGetDrugList = true) {
      await this.dbInstance.insert({
        tableName: this.tableName,
        data: item
      })
      isGetDrugList && await this.getDrugList()
    },
    // 更新项
    async updateDrugItem(item, isGetDrugList = true) {
      await this.dbInstance.update_by_primaryKey({
        tableName: this.tableName,
        value: item.id,
        handle: data => {
          Object.keys(item).forEach(key => {
            data[key] = item[key]
          })
          console.log('data', data)
          return data
        }
      })
      isGetDrugList && await this.getDrugList()
    }
  }

}
