<template>
  <div class="layouts__frame">
    <layout-header :lean="true"></layout-header>
    <div class="content-area">
      <nuxt/>
    </div>
    <layout-footer></layout-footer>
  </div>
</template>


<script>
import '@/assets/tailwind.css'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'

export default {
  components: {
    LayoutHeader,
    LayoutFooter
  },
  async created() {}
}
</script>

<style lang="scss">

.content-area {
  min-height: calc(100vh - 230px);
}

</style>