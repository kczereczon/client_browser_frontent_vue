import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import ContractorsMain from "../views/contractors/Main.vue";
import ContractorsEdit from "../views/contractors/Edit.vue";
import ContractorsCreate from "../views/contractors/Create.vue";
import ContractorsDetails from "../views/contractors/Details.vue";
import ContactsMain from "../views/contacts/Main.vue";
import ContactsEdit from "../views/contacts/Edit.vue";
import ContactsCreate from "../views/contacts/Create.vue";
import ContactsDetails from "../views/contacts/Details.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: {name: 'Contractors'}
  },
  {
    path: '/contractors',
    name: 'Contractors',
    component: ContractorsMain
  },
  {
    path: '/contractors/edit/:id',
    name: 'ContractorsEdit',
    component: ContractorsEdit
  },
  {
    path: '/contractors/create',
    name: 'ContractorsCreate',
    component: ContractorsCreate
  },
  {
    path: '/contractors/:id',
    name: 'ContractorsDetails',
    component: ContractorsDetails
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: ContactsMain
  },
  {
    path: '/contacts/edit/:id',
    name: 'ContactsEdit',
    component: ContactsEdit
  },
  {
    path: '/contacts/create',
    name: 'ContactsCreate',
    component: ContactsCreate
  },
  {
    path: '/contacts/:id',
    name: 'ContactsDetails',
    component: ContactsDetails
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
