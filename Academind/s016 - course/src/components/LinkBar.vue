<template>
  <ul>
    <li><router-link class="ml-5" :to="{ name: 'home', params: {} }" active-class="active" exact>Home</router-link></li>
    <li><router-link class="ml-5" :to="{ name: 'user-list', params: {} }" active-class="active" exact>Users</router-link></li>
    <ul>
      <template v-for="user in users">
        <li :key="user.id"><router-link class="ml-5" :to="{ name: 'user-details', params: { id: user.id} }" active-class="active" exact>User with ID {{ user.id }}</router-link></li>
      </template>
    </ul>
  </ul>
</template>

<script>
export default {
  props: [
    'users'
  ]
}
</script>
