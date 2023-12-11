<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <div class="button" @click="clickUploadList"><svg-icon icon-class="upload" /></div>
      <div
        class="button"
        @click="clickCopyDrugList"
      >
        <svg-icon icon-class="download" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import drugDBMixin from '@/views/drugList/drugDB.js'
import refChildrenMixin from '@/mixins/ref-children-mixin'

import Clipboard from 'clipboard'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  mixins: [drugDBMixin, refChildrenMixin],
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 下载当前列表
    clickCopyDrugList(e) {
      const list = JSON.stringify(this.drugList)
      const clipboard = new Clipboard(e.target, {
        text: () => {
          return JSON.stringify(list)
        }
      })
      clipboard.on('success', () => {
        clipboard.destroy()
        this.$notify.success('复制成功')
      })
      clipboard.on('error', () => {
        clipboard.destroy()
        this.$notify.error('复制失败')
      })
      clipboard.onClick(e) // 解决第一次点击失败的问题
    },
    // 上传列表
    clickUploadList() {
      this.$prompt('请输入数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async({ value }) => {
        try {
          const list = JSON.parse(value)
          console.log('list', list)
          const drugComponent = this.getChildrenRef('routerView')
          await drugComponent.dbInstance.delete_table(drugComponent.tableName)
          list.forEach(item => {
            drugComponent.addDrugItem(item, false)
          })
          drugComponent.getDrugList()
          this.$notify.success('导入成功')
        } catch (error) {
          console.error(error)
        }
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    padding-right: 10px;
    .button {
      padding: 0 5px;
      height: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      .svg-icon {
        width: 28px;
        height: 28px;
        pointer-events: none;
      }
    }
  }
}
</style>
