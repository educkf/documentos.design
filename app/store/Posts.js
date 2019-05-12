import axios from 'axios';

export const state = () => ({
  posts: []
})

export const mutations = {
  SET_POSTS: function (state, posts) {
    state.posts = posts
  }
}


export const actions = {

  async getPosts({ rootState, commit }) {
    console.log(rootState.User.authUser)
    if (rootState.User.authUser) {
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

  async getPost({ rootState }, postId) {
    if (rootState.User.authUser) {
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

  async getPostBySlug({ rootState }, slug) {
    if (rootState.User.authUser) {
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