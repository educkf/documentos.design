<template>
  <div class="container mx-auto">
    <h1 class="mt-10 mb-6">Login</h1>
    <div class="flex justify-left -mx-5">

      <LoginForm class="wider" />

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoginForm from "@/components/LoginForm";

export default {
  name: "Login",
  layout: "lean",
  components: {
    LoginForm
  },
  filters: {},
  props: {},
  data: function() {
    return {};
  },
  async fetch ({ store, params }) {
    // The fetch method is used to fill the store before rendering the page, it's like the asyncData method except it doesn't set the component data
  },
  async asyncData ({ params, error }) {
    // You may want to fetch data and render it on the server-side. Nuxt.js adds an asyncData method that lets you handle async operations before setting the component data.
    // return { project: 'nuxt' }
  },
  computed: {
    ...mapState({
      authUser: state => state.User.authUser
    }),
    // ...mapGetters({
    //   item: "namespace/item"
    // })
  },
  watch: {
    authUser: function(newVal) {
      if (newVal) {
        this.$router.push('/')
      }
    }
  },
  async created() {},
  async mounted() {},
  methods: {},
  head () {
    return {
      title: 'Page title',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
};
</script>

<style lang="scss" scoped></style>
