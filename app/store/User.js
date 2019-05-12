import axios from 'axios';

export const state = () => ({
  authUser: null,
  user: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  SET_USER_DATA: function (state, user) {
    state.user = user
  }
}


export const actions = {
    async getUser({ commit }, userId) {
    try {
      const { data } = await axios.get(`${process.env.KEYSTONE_URL}/api/v1/users/` + userId, { withCredentials: true })
      commit('SET_USER_DATA', data.user)
      return data.user;

    } catch(err) {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('erro getUser(): ', err)
      console.log('\n\n\n\n\#####\n\n\n\n')
    }
  },

  async login({ state, dispatch, commit }, { username, password }) {
    try {
      
      const { data } = await axios.post(`${process.env.KEYSTONE_URL}/api/v1/signin`, { username, password }, { withCredentials: true })
      console.log(data)

      if (data.success && data.session) {
        commit('SET_USER', data.userId)
        await dispatch('getUser', state.authUser)
        await dispatch('Posts/getPosts', {}, { root: true })
        return true

      } else if (!data.success) {
        return 'Aconteceu um erro, tente novamente.'
        
      } else if (data.success && !data.session) {
        return 'Login ou Senha incorretos.'

      } else {
        return 'Aconteceu um erro, tente novamente.'
      }
      

    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout({ commit }) {
    try {
      await axios.post(`${process.env.KEYSTONE_URL}/api/v1/signout`)
      commit('SET_USER', null)
      commit('SET_USER_DATA', null)
      commit('Posts/SET_POSTS', [], { root: true })
      
    } catch(err) {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('erro logout(): ', err)
      console.log('\n\n\n\n\#####\n\n\n\n')
    }
  }
}