<template>
 <div class="container mx-auto">
    <div class="container has-text-centered border-t mt-6 pt-6">
      <p class="text-grey-dark">documentos.design 2019</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['footer']),
  }
}
</script>

