<template>
  <div id="app">
    <vk-navbar>
      <vk-navbar-nav>
        <router-link tag="li" :to="{name: 'Contractors'}"><a href="">KONTRAHENCI</a> </router-link>
        <router-link tag="li" :to="{name: 'Departaments'}"><a href="">DEPARTAMENTY</a> </router-link>
        <router-link tag="li" :to="{name: 'Contacts'}"><a href="">KONTAKTY</a> </router-link>
      </vk-navbar-nav>
    </vk-navbar>
    <router-view />
  </div>
</template>

<style>
</style>
