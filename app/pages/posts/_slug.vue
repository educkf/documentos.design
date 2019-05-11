<template>
<div class="hero-body">
  <div class="container " v-if="post">
    <div class="columns is-multiline is-mobile is-centered">
      <div class="column is-8 is-centered">
          <div class="has-text-centered">
            <h1 class="title">
              {{ post.title }}
            </h1>
          </div>
      
          <div class="subheader-content has-text-centered">
            <p>{{ post.publishedDate}} <span>{{ post.categories }}</span></p>
            <hr/>
          </div>

          <pre>{{ post }}</pre>

          <div class="single-content" v-html="post.content.extended">

          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {
    authUser() {
      return this.$store.state.authUser
    }
  },
  async asyncData({ app, params, store }) {
    try {
      const response = await store.dispatch('getPost', params.slug);
      return { 
        post: response 
      }
    } catch(err) {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('erro _slug asyncData(): ', err)
      console.log('\n\n\n\n\#####\n\n\n\n')
    }
  },
  created() {
    !this.authUser ? this.$router.push('/') : null
  },
  watch: {
    authUser: function(newVal, oldVal) {
      !newVal ? this.$router.push('/') : null
    }
  }
}
</script>
