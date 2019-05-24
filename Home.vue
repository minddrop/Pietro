<template>
  <div>
    <p>home page</p>
    <router-link to="/hello">
      <a>go hello</a>
    </router-link>
    <router-link to="/oauth">
      <a>go oauth</a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
