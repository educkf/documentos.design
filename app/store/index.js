import axios from 'axios';

export const state = () => ({
  authUser: null,
  user: null,
  posts: []
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  SET_USER_DATA: function (state, user) {
    state.user = user
  },
  SET_POSTS: function (state, posts) {
    state.posts = posts
  },
  SET_PRODUCTS: function (state, products) {
    state.products = products
  }
}


export const actions = {
  async nuxtServerInit({ dispatch, commit }, { req }) {
    
    if (req.session && req.session.userId) {
      axios.defaults.headers.common.cookie = req.headers.cookie
      commit('SET_USER', req.session.userId)
      await dispatch('getUser', req.session.userId)

    } else {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('Dont have req.session... :(')
      console.log('\n\n\n\n\#####\n\n\n\n')
    }
  },

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
        await dispatch('getPosts')
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
      commit('SET_POSTS', [])
      
    } catch(err) {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('erro logout(): ', err)
      console.log('\n\n\n\n\#####\n\n\n\n')
    }
  },

  async getPosts({ state, commit }) {
    if (state.authUser) {
      try {
        const response = await axios.get(`${process.env.KEYSTONE_URL}/api/v1/posts`, { withCredentials: true })
        const posts = response.data.posts
        commit('SET_POSTS', posts)

      } catch(err) {
        console.log('\n\n\n\n\#####\n\n\n\n')
        console.log('erro getPosts(): ', err)
        console.log('\n\n\n\n\#####\n\n\n\n')
      }
    }    
  },

  async getPost({ state }, postId) {
    if (state.authUser) {
      try {
        const response = await axios.get(`${process.env.KEYSTONE_URL}/api/v1/posts/${postId}`, { withCredentials: true })
        return response.data.post

      } catch(err) {
        console.log('\n\n\n\n\#####\n\n\n\n')
        console.log('erro getPost(): ', err)
        console.log('\n\n\n\n\#####\n\n\n\n')
      }
    }    
  },

  async getPostBySlug({ state }, slug) {
    if (state.authUser) {
      try {
        const response = await axios.get(`${process.env.KEYSTONE_URL}/api/v1/posts/${slug}`, { withCredentials: true })
        return response.data.post

      } catch(err) {
        console.log('\n\n\n\n\#####\n\n\n\n')
        console.log('erro getPost(): ', err)
        console.log('\n\n\n\n\#####\n\n\n\n')
      }
    }    
  }
}