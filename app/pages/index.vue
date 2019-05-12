<template>
  <div>
    <div class="hero-body">

      <div class="container ">
        <h3 class="mt-60">Posts</h3>
        <div class="columns col-12">
          <div class="col-6" v-for="post in posts" :key=post._id >
            <div class="card">
              <div class="card-header">
                <h5 class="card-title h5">
                  {{ post.title }}
                </h5>
              </div>

              <div class="card-body">
                <p>{{ post.publishedDate}}</p>
                <div v-html="post.content.brief"></div>
              </div>
              <div class="card-footer">
                <nuxt-link class="btn btn-primary" :to="`/posts/${ post._id }`">Read More</nuxt-link>
              </div>
            </div>
          </div>
          <!--  end of post -->
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  computed: {
    posts() {
      return this.$store.state.Posts.posts
    },     
  },
  async fetch ({ store, params }) {
    try {
      await store.dispatch('Posts/getPosts')

    } catch(err) {
      console.log('\n\n\n\n\#####\n\n\n\n')
      console.log('erro index.vue fetch: ', err)
      console.log('\n\n\n\n\#####\n\n\n\n')
    }
  }
}
</script>

<style lang="scss" scoped>
.mt-60 {
  margin-top: 60px;
}
</style>
