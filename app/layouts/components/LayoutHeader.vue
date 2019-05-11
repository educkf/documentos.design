<template>
  <div class="hero-head">
    
    <header class="w-100 bg-black p-6 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">

        <h1 class="text-s font-bold text-white">
          <nuxt-link to="/" class="no-underline text-white hover:opacity-75">documentos.design</nuxt-link>
        </h1>

        <ul class="list-reset flex mt-2">
          <li class="mr-6">
            <a class="text-white no-underline opacity-75 hover:opacity-100" href="#">Acervos</a>
          </li>
          <li class="mr-6">
            <a class="text-white no-underline opacity-75 hover:opacity-100" href="#">Busca avançada</a>
          </li>
          <li class="mr-6">
            <a class="text-white no-underline opacity-75 hover:opacity-100" href="#">Linha do tempo</a>
          </li>
          <li class="mr-6">
            <a class="text-white no-underline opacity-75 hover:opacity-100" href="#">Sobre</a>
          </li>
        </ul>

        <ul class="list-reset flex mt-2"  v-if="authUser">
          <li class="mr-6">
            <a class="text-white no-underline opacity-75 hover:opacity-100" href="#">Minha conta</a>
          </li>
          <li class="mr-6">
            <a class="text-white no-underline opacity-75 hover:opacity-100" href="#">Meus acervos</a>
          </li>
          <li class="mr-6">
            <div class="text-white no-underline opacity-75 hover:opacity-100 cursor-pointer" @click.prevent="logout()">Sair</div>
          </li>
        </ul>

        <Dropdown  v-if="!authUser">
          <span slot="link" class="appearance-none flex items-center inline-block text-white font-medium border border-white px-4 py-2 rounded">
            <span class="mr-1">Login</span>
            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
          <div slot="dropdown" class="bg-white shadow rounded border overflow-hidden">

            <LoginForm />

          </div>
        </Dropdown>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Dropdown from '@/components/Dropdown'
import LoginForm from '@/components/LoginForm'

export default {
  components: {
    Dropdown,
    LoginForm
  },
  data: function() {
    return {}
  },
  computed: {
    authUser() {
      return this.$store.state.authUser
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async logout() {
      try {
        const response = await this.$store.dispatch('logout')
      } catch(err) {
        this.error = err
      }
    }
  }
}
</script>
