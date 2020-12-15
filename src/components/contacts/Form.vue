<template>
  <div class="uk-card uk-margin-top uk-card-default uk-card-body">
    <h3 class="uk-card-title">{{ title }}</h3>
    <vk-grid>
      <div class="uk-width-1-2">
        <label :class="{
            'uk-form-danger': this.getError('name'),
          }">Imie</label>
        <input
          :class="{
            'uk-input': true,
            'uk-form-danger': this.getError('name'),
          }"
          type="text"
          placeholder="Imie nowego kontaktu"
          v-model="form.name"
          @keypress="removeError('name')"
        />
        <p v-for="item in getError('name')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
      <div class="uk-width-1-2@s">
        <label :class="{
            'uk-form-danger': this.getError('last_name'),
          }">Nazwisko</label>
        <input
          :class="{
            'uk-input': true,
            'uk-form-danger': this.getError('last_name'),
          }"
          type="text"
          placeholder="Nazwisko kontaktu"
          v-model="form.last_name"
          @keypress="removeError('last_name')"
        />
         <p v-for="item in getError('last_name')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
      <div class="uk-width-1-2@s">
        <label :class="{
            'uk-form-danger': this.getError('email'),
          }">Email</label>
        <input
          :class="{
            'uk-input': true,
            'uk-form-danger': this.getError('email'),
          }"
          type="text"
          placeholder="Adres email"
          v-model="form.email"
          @keypress="removeError('email')"
        />
         <p v-for="item in getError('email')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
      <div class="uk-width-1-2@s">
        <label :class="{
            'uk-form-danger': this.getError('phone'),
          }">Telefon</label>
        <input
          :class="{
            'uk-input': true,
            'uk-form-danger': this.getError('phone'),
          }"
          type="text"
          placeholder="Numer telefonu"
          v-model="form.phone"
          @keypress="removeError('phone')"
        />
         <p v-for="item in getError('phone')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
      <div v-if="!hideRelation" class="uk-width-1-1@s">
        <label :class="{
            'uk-form-danger':  this.getError('departament_id'),
          }">Odział</label>
        <select :class="{
            'uk-select': true,
            'uk-form-danger': this.getError('departament_id'),
          }" type="text" placeholder="50" v-model='form.departament_id'>
          <option v-for="departament in departaments" :key="departament"  :value="departament.id">{{departament.name}}</option>
        </select>
        <p v-for="item in getError('departament_id')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
    </vk-grid>
    <div v-if="!hideSubmit" class="uk-margin">
        <div class="uk-form-controls">
          <vk-button @click="submit">ZAPISZ</vk-button>
        </div>
      </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  props: {
    title: String,
    form: {
      type: Object,
      default: () => ({
        name: null,
        last_name: null,
        email: null,
        phone: null,
        departament_id: null
      }),
    },
    hideSubmit: { type: Boolean, default: () => true },
    hideRelation: { type: Boolean, default: () => false },
    errors: { type: Object, default: () => ({}) },
  },
  data: function(){
    return {
      departaments: {}
    }
  },
  created: function () {
    this.getDepartaments();
    this.$parent.$on("submit", this.submit);
  },
  methods: {
    submit: function () {
      this.$emit("submit", this.form);
    },
    getError: function (field) {
      return this.errors[field] || this.errors["contact." + field];
    },
    removeError: function(field) {
      if(this.errors[field]) {
        delete this.errors[field];
      } else if(this.errors["contact." + field]) {
        delete this.errors["contact." + field];
      }
    },
    getDepartaments: async function(){
      const response = await axios.get('http://127.0.0.1:8000/api/web/departament/all');
      this.departaments = response.data;
    }
  },
};
</script>

<style>
</style>