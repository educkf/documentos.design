<template>
  <div class="container mx-auto">
    <h1 class="mt-10 mb-6">Novo acervo</h1>
    <div class="flex justify-left -mx-5">

    <form class="px-4 pt-4 pb-4 mb-4 w-1/2" @submit.prevent="onSubmit()">
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
        Nome
      </label>
      <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight text-sm focus:outline-none focus:shadow-outline" :class="{'border-red': error.includes('name')}" id="name" type="text" placeholder="Nome da coleção">
    </div>
    <div class="mb-6">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
        Descrição
      </label>
      <textarea v-model="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red': error.includes('description')}" id="description"></textarea>
      <p class="text-red text-xs italic" :class="{'border-red': error.includes('error')}">{{ error_message }}</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Criar acervo
      </button>
    </div>
  </form>

    </div>
  </div>
</template>

<script>
//import { mapState, mapGetters  } from 'vuex';

export default {
  name: "CollectionsAdd",
  layout: "default",
  middleware: 'auth',
  components: {},
  filters: {},
  props: {},
  data: function() {
    return {
      name: '',
      description: '',
      error: [],
      error_message: ''
    };
  },
  async fetch ({ store, params }) {
    // The fetch method is used to fill the store before rendering the page, it's like the asyncData method except it doesn't set the component data
  },
  async asyncData ({ params, error }) {
    // You may want to fetch data and render it on the server-side. Nuxt.js adds an asyncData method that lets you handle async operations before setting the component data.
    // return { project: 'nuxt' }
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
  methods: {
    async onSubmit() {

      this.error = [];

      if (this.name == '') {
        this.error.push('name')
      }
      if (this.description == '') {
        this.error.push('description')
      }
      
      if (this.error.length == 0) {
        const response = await this.$store.dispatch('Collections/create', {
          name: this.name, 
          description: this.description
        });
        if (response) {
          this.$router.push('/collections/my_collections')
        } else {
          this.error_message = response
        }
      }
    }
  },
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
