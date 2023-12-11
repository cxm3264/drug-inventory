export default {
    provide() {
      return {
        // vue-ref
        // https://www.jb51.net/article/204731.htm
        setChildrenRef: this.setChildrenRef,
        getChildrenRef: this.getChildrenRef,
        getRootRef: this.getRootRef
      }
    },
    data() {
      return {
        refComponent: {}
      }
    },
    methods: {
      setChildrenRef(name, ref) {
        this.$set(this.refComponent, name, ref)
      },
      getChildrenRef(name) {
        return this.refComponent[name]
      },
      getRootRef() {
        return this
      }
    }
  }

