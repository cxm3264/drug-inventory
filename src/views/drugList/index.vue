<template>
  <div class="page-container">
    <ul class="drug-list">
      <li
        v-for="item in drugList"
        :key="item.id"
        class="drug-item"
        :class="[item.disabled ? 'drug-item--disabled' : '']"
        :style="{ paddingBottom: listMode === 'simple' ? '10px' : '0px'}"
        @click="clickEditItem(item)"
      >
        <div class="drug-dosage">每天{{ item.dosage }}片</div>
        <div
          class="drug-remind"
          :class="[item.remainingDays <= 7 ? 'danger' : 'success']"
        >
          <i class="el-icon-warning" />
          剩余可用天数: {{ item.remainingDays }}天
        </div>
        <div class="drug-info">

          <div class="drug-name">
            {{ item.name }}
            <el-tag v-if="item.mg" type="primary" effect="plain">
              {{ item.mg }}mg
            </el-tag>
          </div>
          <div v-show="listMode === 'detail'">
            <div class="drug-inventory">
              规格: {{ item.size }}片/盒
            </div>
            <div class="drug-inventory">
              余量: {{ item.inventory }}片
            </div>
            <div class="">
              月用量: {{ replenishmentProposal(item) }}
            </div>
            <div class="memo">
              创建日期: {{ item.cratedTime }}
            </div>
            <div class="memo">
              更新日期: {{ item.modifyTime || '-' }}
            </div>
          </div>

        </div>
        <div v-show="listMode === 'detail'" class="button-container">
          <div class="left" @click.stop="clickEditItem(item)">
            <svg-icon icon-class="edit" />编辑
          </div>
          <div class="right" @click.stop="clickRemoveItem(item)">
            <svg-icon icon-class="remove" />删除
          </div>
        </div>
      </li>
    </ul>
    <div class="add-button" @click="clickAddItem">
      <i class="el-icon-plus" />
    </div>
    <div class="toggle-list" @click="clickToggleListMode">
      <svg-icon :icon-class="listMode" />
    </div>
    <div class="update-button" @click="clickUpdateItems">
      <svg-icon icon-class="update" />
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
import { getNow } from '@/utils'
export default {
  name: 'DrugList',
  components: {
    editDialog
  },
  data() {
    return {
      listMode: 'simple', // 列表展示模式 精简版 simple 详细版 detail
      drug: Drug.getInstance(),
      isShowEditDialog: false,
      currentEditItem: {},
      warningDay: 7 // 预警(用量小于7时预警)
    }
  },
  computed: {
    drugList() {
      return this.drug.list
    },
    // 补货建议 一个月所需的量
    replenishmentProposal() {
      return function(item) {
        const { dosage, size } = item
        return `${(dosage * 30 / size).toFixed(1)}盒/月`
      }
    }
  },
  methods: {
    clickAddItem() {
      this.currentEditItem = {
        name: '',
        size: undefined,
        dosage: undefined, // 每天x次
        inventory: undefined, // 余量
        mg: undefined, // 多少毫克
        disabled: false // 是否禁用
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
    },
    clickToggleListMode() {
      this.listMode = this.listMode === 'simple' ? 'detail' : 'simple'
    },
    // 更新所有药品(减一周的量)
    clickUpdateItems() {
      this.$confirm(`是否更新所有药品, 库存将减少一周的量?`, '提示', {
        confirmButtonText: '更新',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const stockOut = []
        const res = this.drugList.map(item => {
          if (item.disabled) {
            return item
          }
          const { dosage } = item
          const updateInventory = item.inventory - dosage * 7
          if (updateInventory < 0) {
            stockOut.push(item.name)
          }
          return {
            ...item,
            inventory: updateInventory, // 更新库存量
            modifyTime: getNow()
          }
        })
        this.drug.setList(res)
        this.$notify.success('更新成功')
        stockOut.forEach(item => {
          setTimeout(() => {
            this.$notify.warning(`药品[${item}] 库存不足`)
          }, 0)
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
