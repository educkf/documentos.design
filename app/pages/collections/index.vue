<template>
  <div class="container mx-auto">

    <h1 class="mt-10 mb-6">Acervos</h1>
    <div class="flex justify-center flex-wrap -mx-10">

      <nuxt-link  
        v-if="authUser" 
        to="/collections/add"
        class="block w-1/4 h-64 rounded overflow-hidden shadow-md bg-grey-lighter hover:bg-grey-lightest m-4 no-underline text-grey-darkest"
      >
        <div class="px-6 py-4">
          <div class="font-bold text-2xl mt-4 mb-6">Criar novo</div>
          <p class="leading-relaxed text-grey-darker text-base"></p>
        </div>
      </nuxt-link>

      <nuxt-link :to="`/collections/${collection.key}`" 
        v-for="collection in collections" 
        :key="collection._id" 
        class="block w-1/4 h-64 rounded overflow-hidden shadow-md hover:bg-grey-lightest m-4 no-underline text-grey-darkest"
      >
        <div class=" px-6 py-4">
          <div class="font-bold text-2xl mt-4 mb-6">{{ collection.name }}</div>
          <p class="leading-normal text-grey-dark text-base">{{ collection.description }}</p>
        </div>
      </nuxt-link>

    </div>
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
    return {};
  },
  async fetch ({ store, params }) {
    // The fetch method is used to fill the store before rendering the page, it's like the asyncData method except it doesn't set the component data
    await store.dispatch('Collections/getCollections')
  },
  async asyncData ({ params, error }) {
    // You may want to fetch data and render it on the server-side. Nuxt.js adds an asyncData method that lets you handle async operations before setting the component data.
    // return { project: 'nuxt' }
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
      title: 'Acervos - Documentos.Design',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Acervos hospedados na plataforma.' }
      ]
    }
  }
};
</script>

<style lang="scss" scoped></style>
