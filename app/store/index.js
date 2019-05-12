import axios from 'axios';


export const actions = {
  async nuxtServerInit({ dispatch, commit }, { req }) {
    
    if (req.session && req.session.userId) {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('Have req.session :D')
      console.log('\n\n\n\n\#####\n\n\n\n')

      axios.defaults.headers.common.cookie = req.headers.cookie
      commit('User/SET_USER', req.session.userId, { root: true })
      await dispatch('User/getUser', req.session.userId, { root: true })

    } else {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('Dont have req.session... :(')
      console.log('\n\n\n\n\#####\n\n\n\n')
    }
  }
}