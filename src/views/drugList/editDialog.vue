<template>
  <el-dialog
    custom-class="drug-dialog"
    :title="title"
    :visible.sync="localVisible"
    :close-on-click-modal="false"
    width="80vw"
    append-to-body
  >
    <el-form ref="form" label-position="top" :model="localItem" label-width="80px">
      <el-form-item required label="药品名称">
        <el-input v-model="localItem.name" placeholder="" />
      </el-form-item>
      <el-form-item label="mg">
        <el-input-number v-model="localItem.mg" :min="0" controls-position="right" />
      </el-form-item>
      <el-form-item required label="规格(片/盒)">
        <el-input-number v-model="localItem.size" :min="0" controls-position="right" />
      </el-form-item>
      <el-form-item required label="用量(片/天)">
        <el-input-number v-model="localItem.dosage" :min="0" controls-position="right" />
      </el-form-item>
      <el-form-item required label="余量">
        <el-input-number v-model="localItem.inventory" :min="0" controls-position="right" />
      </el-form-item>
      <el-form-item required label="状态">
        <el-radio-group v-model="localItem.disabled">
          <el-radio :label="false">启用</el-radio>
          <el-radio :label="true">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="localVisible = false">取 消</el-button>
      <el-button type="primary" @click="clickSave">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getUUID, getNow } from '@/utils'

export default {
  name: 'EditDialog',
  inject: ['root'],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(v) {
        this.$emit('update:visible', v)
      }
    },
    localItem: {
      get() {
        return this.item
      },
      set(v) {
        this.$emit('update:item', v)
      }
    },
    isEdit() {
      return this.item.id
    },
    title() {
      return this.isEdit ? '编辑' : '新增'
    }
  },
  methods: {
    validateForm() {
      const { name, size, dosage } = this.localItem
      if (!name) {
        return { status: 'error', message: '请填写药品名称' }
      }
      if (!size) {
        return { status: 'error', message: '请填写药品规格' }
      }
      if (!dosage) {
        return { status: 'error', message: '请填写用量' }
      }
      return { status: 'success' }
    },
    clickSave() {
      const { status, message } = this.validateForm()
      if (status !== 'success') {
        this.$notify.error(message)
        return
      }
      if (this.isEdit) {
        this.updateItem()
      } else {
        this.addItem()
      }
      this.$notify.success(this.isEdit ? '更新成功' : '添加成功')
      this.localVisible = false
    },
    addItem() {
      this.root.addDrugItem({
        id: getUUID(),
        cratedTime: getNow(),
        modifyTime: undefined,
        ...this.localItem
      })
    },
    updateItem() {
      this.root.updateDrugItem({
        modifyTime: getNow(),
        ...this.localItem
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
