<template>
  <div class="container">
    <p>404. That’s an error.</p>
    <p>The requested URL {{ assignUrl() }} was not found on this server. That's all we know.</p>
    <router-link to="/">
      <a>go home</a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data: () => {
    return {
      url: ''
    }
  },
  methods: {
    assignUrl: function() {
      const url = this.$route.path
      return url
    }
  }
}
</script>

<style lang="scss" scoped>
@import './NotFound.scss';
</style>
