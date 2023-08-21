<template>
  <div class="page-container">
    <ul class="drug-list">
      <li
        v-for="item in drugList"
        :key="item.id"
        class="drug-item"
      >
        <div class="drug-dosage">每天{{ item.dosage }}次</div>
        <div class="drug-info">

          <div class="drug-name">{{ item.name }}</div>
          <div class="drug-inventory">
            规格: {{ item.size }}片/盒
          </div>
          <div class="drug-inventory">
            余量: {{ item.inventory }}片
          </div>
        </div>
        <div class="button-container">
          <div class="left" @click="clickEditItem(item)">
            <svg-icon icon-class="edit" />编辑
          </div>
          <div class="right" @click="clickRemoveItem(item)">
            <svg-icon icon-class="remove" />删除
          </div>
        </div>
      </li>
    </ul>
    <div class="add-button" @click="clickAddItem">
      <i class="el-icon-plus" />
    </div>
    <edit-dialog
      :visible.sync="isShowEditDialog"
      :item.sync="currentEditItem"
    />
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import editDialog from './editDialog'
import Drug from './drugList.js'

export default {
  name: 'DrugList',
  components: {
    editDialog
  },
  data() {
    return {
      drug: Drug.getInstance(),
      isShowEditDialog: false,
      currentEditItem: {}
    }
  },
  computed: {
    drugList() {
      return this.drug.list
    }
  },
  methods: {
    clickAddItem() {
      this.currentEditItem = {
        name: '',
        size: undefined,
        dosage: undefined, // 每天x次
        inventory: undefined // 余量
      }
      this.isShowEditDialog = true
    },
    clickEditItem(item) {
      console.log('cloneDeep(item)', cloneDeep(item))
      this.currentEditItem = cloneDeep(item)
      this.isShowEditDialog = true
    },
    clickRemoveItem(item) {
      this.$confirm(`确认删除 ${item.name}?`, '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.drug.removeDrugItem(item.id)
        this.$notify.success('删除成功')
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
