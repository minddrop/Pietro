<template>
  <div class="container">
    <p>slack-oauth page</p>
    <p>Give permission to message as you.</p>

    <a :href="'https://slack.com/oauth/authorize?scope='+ scope +'&client_id='+ clientId">
      <img
        alt="Add to Slack"
        height="40"
        width="139"
        src="https://platform.slack-edge.com/img/add_to_slack.png"
        srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
      >
    </a>
    <input v-model="clientId" placeholder="Enter client_id">
    <div>client_id is {{ clientId ? clientId : '...' }}</div>
    <div>{{'scope is '+ scope}}</div>
    <router-link to="/">
      <a>go home</a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SlackOauth',
  data() {
    return {
      clientId: '',
      scope: 'chat:write:user'
    }
  }
}
</script>

<style lang="scss" scoped>
@import './SlackOauth.scss';
</style>
