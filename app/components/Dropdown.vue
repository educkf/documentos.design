<template>
  <div class="relative">
    <div role="button" class="inline-block select-none" @click="open = !open">
      <slot name="link"></slot>
    </div>
    <div class="absolute pin-r mt-px" v-show="open">
      <slot name="dropdown"></slot>
    </div>
  </div>
</template>

<script>
//import { mapState, mapGetters  } from 'vuex';

export default {
  name: "Dropdown",
  components: {},
  filters: {},
  props: {},
  data: function() {
    return {
      open: false
    };
  },
  computed: {
    // ...mapState({
    //   item: state => state.namespace.item
    // }),
    // ...mapGetters({
    //   item: "namespace/item"
    // })
  },
  watch: {},
  async created() {},
  async mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
