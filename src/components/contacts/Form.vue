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
            'uk-form-danger': errors.phone || errors['contact.phone'],
          }">Odział</label>
        <select class="uk-select" type="text" placeholder="50" name='departaments.id'>
          @foreach($contacts->departaments as $departament)
          <option  value="1">{{$departament=>name}}</option>
        </select>
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
        departament_id: null,
        nip: null,
      }),
    },
    hideSubmit: { type: Boolean, default: () => true },
    hideRelation: { type: Boolean, default: () => false },
    errors: { type: Object, default: () => ({}) },
  },
  created: function () {
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
    getDepartament: async function(){
      await axios.get('/api/web/departament/all')
    }
  },
};
</script>

<style>
</style>