<template>
  <section>
    <transition name="fade-transform" mode="out-in">
      <router-view
        :key="key"
        v-ref="c => setChildrenRef('routerView', c)"
        class="app-main"
      />
    </transition>
  </section>
</template>

<script>
import refChildrenMixin from '@/mixins/ref-children-mixin'

export default {
  name: 'AppMain',
  mixins: [refChildrenMixin],
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 65px;
}

</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
