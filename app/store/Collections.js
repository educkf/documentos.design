import axios from 'axios';
import { create } from 'domain';

export const state = () => ({
  list: []
})

export const mutations = {
  SET_POSTS: function (state, collections) {
    state.list = collections
  }
}

export const getters = {
  my_collections: (state) => (userId) => {
    if (userId) {
      return state.list.filter(item => item.owner == userId)
    }
  }
}

export const actions = {

  async getCollections({ state, commit }) {
    try {
      const { data } = await axios.get(`${process.env.KEYSTONE_URL}/api/v1/doc_collections`, { withCredentials: true })
      const collections = data.doc_collections
      commit('SET_POSTS', collections)
      return collections

    } catch(err) {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('erro getCollections(): ', err)
      console.log('\n\n\n\n\#####\n\n\n\n')
    }    
  },

  async getCollection({ state }, collectionId) {
    try {
      const response = await axios.get(`${process.env.KEYSTONE_URL}/api/v1/doc_collections/${collectionId}`, { withCredentials: true })
      return response.data.collection

    } catch(err) {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('erro getCollection(): ', err)
      console.log('\n\n\n\n\#####\n\n\n\n')
    }    
  },

  async getCollectionBySlug({ state }, slug) {
    try {
      const { data } = await axios.get(`${process.env.KEYSTONE_URL}/api/v1/doc_collections/${slug}`, { withCredentials: true })
      return data.doc_collection

    } catch(err) {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('erro getCollectionBySlug(): ', err)
      console.log('\n\n\n\n\#####\n\n\n\n')
    }    
  },

  async create({ rootState }, collData) {
    try {
      const { data } = await axios.post(`${process.env.KEYSTONE_URL}/api/v1/doc_collections/`, {
        name: collData.name,
        description: collData.description,
        owner: rootState.User.authUser
      })
      console.log(data)
      return data

    } catch(err) {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('erro Collections/create(): ', err)
      console.log('\n\n\n\n\#####\n\n\n\n')
    }
  }
}