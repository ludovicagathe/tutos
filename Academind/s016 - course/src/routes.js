import User from './components/User.vue'
import Main from './components/Main.vue'
import UserList from './components/UserList.vue'
import UserDetails from './components/UserDetails.vue'
import UserEdit from './components/UserEdit.vue'
import LinkBarTop from './components/LinkBar'
import LinkBarBot from './components/LinkBar'

export const routes = [
  { name: "home", path: '', components: {
    default: Main,
    'link-bar-top': LinkBarTop
   }},
  { name: "user", path: '/user', components: {
    default: User,
    'link-bar-bot': LinkBarBot
  }, children: [
    { name: "user-list", path: '/users', components: {
      default: UserList,
      'link-bar-top': LinkBarTop
      }
    },
    { name: "user-details", path: ':id', components: {
      default: UserDetails,
      'link-bar-bot': LinkBarBot
      },
      props: true
    },
    { name: "user-edit", path: ':id/edit', components: {
      default: UserEdit,
      'link-bar-bot': LinkBarBot
      },
      props: true
    }
  ]},
  { name: 'no-route', path: '/no-route', redirect: { name : 'home'}},
  { path: '*', redirect: {name: 'home'}}
];
