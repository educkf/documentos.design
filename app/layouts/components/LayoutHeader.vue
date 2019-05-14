<template>
  <div class="hero-head">
    
    <header class="w-100 bg-black p-6 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">

        <h1 class="text-s font-bold text-white">
          <nuxt-link to="/" class="no-underline text-white hover:opacity-75">documentos.design</nuxt-link>
        </h1>

        <ul class="list-reset flex" v-if="!lean">
          <li class="mr-6">
            <nuxt-link to="/collections" class="text-white no-underline opacity-75 hover:opacity-100">Acervos</nuxt-link>
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

        <div v-if="authUser && !lean">
          <Dropdown>
            <span slot="link" class="appearance-none flex items-center inline-block text-white font-medium border border-white px-4 py-2 rounded">
              <span class="mr-1" v-if="user && user.name">Olá, {{ user.name.first }}</span>
              <span class="mr-1" v-else><div class="loading s25"></div></span>
              <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
            <div slot="dropdown" class="bg-white shadow rounded border overflow-hidden w-48">

              <a class="block p-4 border-b w-100 text-black no-underline opacity-75 hover:opacity-100" href="#">Minha conta</a>
              <nuxt-link to="/collections/my_collections" class="block p-4 border-b text-black no-underline opacity-75 hover:opacity-100" href="#">Meus acervos</nuxt-link>
              <div class="block p-4 text-black no-underline opacity-75 hover:opacity-100 cursor-pointer" @click.prevent="logout()">Sair</div>

            </div>
          </Dropdown>
        </div>

        <div class="flex" v-if="!authUser && !lean">
          <ul class="list-reset flex mt-2">
            <li class="mr-6">
              <a class="text-white no-underline opacity-75 hover:opacity-100" href="#">Cadastrar</a>
            </li>
          </ul>

          <Dropdown>
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
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Dropdown from '@/components/Dropdown'
import LoginForm from '@/components/LoginForm'

export default {
  props: {
    lean: Boolean
  },
  components: {
    Dropdown,
    LoginForm
  },
  data: function() {
    return {}
  },
  computed: {
    authUser() {
      return this.$store.state.User.authUser
    },
    user() {
      return this.$store.state.User.user
    }
  },
  methods: {
    async logout() {
      try {
        const response = await this.$store.dispatch('User/logout')
        this.$router.push('/')
      } catch(err) {
        this.error = err
      }
    }
  }
}
</script>
