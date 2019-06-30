import User from './components/User.vue'
import Main from './components/Main.vue'
import UserList from './components/UserList.vue'
import UserDetails from './components/UserDetails.vue'
import UserEdit from './components/UserEdit.vue'

export const routes = [
  { name: "home", path: '', component: Main },
  { name: "user", path: '/user', component: User, children: [
    { name: "user-list", path: '/users', component: UserList },
    { name: "user-details", path: ':id', component: UserDetails, props: true },
    { name: "user-edit", path: ':id/edit', component: UserEdit, props: true }
  ]},
];
