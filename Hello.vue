<template>
  <div class="container">
    <p>hello page</p>
    <div>Hello vuejs. It's {{ now }}</div>
    <router-link to="/">
      <a>go home</a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data: () => {
    const now = new Date()
    return {
      now: now
    }
  }
}
</script>

<style lang="scss" scoped>
@import './Hello.scss';
</style>
