<template>
  <div class="container">
    <p>token page</p>
    <router-link to="/">
      <a>go home</a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Token',
  data: () => {
    const now = new Date()
    return {
      now: now
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('component: beforeRouteEnter')
    next()
  }
}
</script>

<style lang="scss" scoped>
@import './Token.scss';
</style>

