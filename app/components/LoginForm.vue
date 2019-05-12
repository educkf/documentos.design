<template>
  <form class="px-4 pt-4 pb-4 mb-4 w-64" @submit.prevent="onSubmit()" v-if="!recoverPassword">
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
        Seu e-mail
      </label>
      <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight text-sm focus:outline-none focus:shadow-outline" :class="{'border-red': error.includes('email')}" id="username" type="text" placeholder="email@email.com">
    </div>
    <div class="mb-6">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
        Senha
      </label>
      <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red': error.includes('password')}" id="password" type="password" placeholder="******">
      <p class="text-red text-xs italic" :class="{'border-red': error.includes('error')}">{{ error_message }}</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Login
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#" @click.prevent="recoverPassword = true">
        Recuperar senha
      </a>
    </div>
  </form>

  <form class="px-4 pt-4 pb-4 mb-4 w-64" @submit.prevent="onRecover()" v-else>
    <p class="mb-4 text-sm leading-tight text-grey-dark">Insira seu e-mail que enviaremos o link para recuperar sua senha:</p>
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
        Seu e-mail
      </label>
      <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight text-sm focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="">
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Recuperar senha
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#" @click.prevent="recoverPassword = false">
        Voltar
      </a>
    </div>
  </form>
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
      open: false,
      error: [],
      error_message: '',
      email: '',
      password: '',
      recoverPassword: false    };
  },
  computed: {
    authUser() {
      return this.$store.state.authUser
    },
    user() {
      return this.$store.state.user
    }
  },
  watch: {},
  async created() {},
  async mounted() {},
  methods: {
    async onSubmit() {
      this.error = [];

      if (this.email == '') {
        this.error.push('email')
      }
      if (this.password == '') {
        this.error.push('password')
      }

      console.log(this.error)
      
      if (this.error.length == 0) {
        try {
          const response = await this.$store.dispatch('User/login', { username: this.email, password: this.password })
          this.error.push('error')
          this.error_message = response;

        } catch(err) {}
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
