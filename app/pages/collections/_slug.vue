<template>
  <div class="container mx-auto">

    <h1 class="mt-10 mb-6">Acervos</h1>
    
    <pre>{{ collection }}</pre>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Collections",
  layout: "default",
  components: {},
  filters: {},
  props: {},
  data: function() {
    return {
      collection: {}
    };
  },
  async fetch ({ store, params }) {
    // The fetch method is used to fill the store before rendering the page, it's like the asyncData method except it doesn't set the component data
    await store.dispatch('Collections/getCollections')
  },
  async asyncData ({ params, error, store }) {
    // You may want to fetch data and render it on the server-side. Nuxt.js adds an asyncData method that lets you handle async operations before setting the component data.
    const response = await store.dispatch('Collections/getCollectionBySlug', params.slug)
    return { collection: response }
  },
  computed: {
    ...mapState({
      authUser: state => state.User.authUser,
      collections: state => state.Collections.list
    })
  },
  watch: {},
  async created() {},
  async mounted() {},
  methods: {},
  head () {
    return {
      title: this.collection.name + ' - Documentos.Design',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: this.collection.description }
      ]
    }
  }
};
</script>

<style lang="scss" scoped></style>
