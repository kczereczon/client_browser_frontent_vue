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
        />
         <p v-for="item in getError('phone')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
      <div v-if="!hideRelation" class="uk-width-1-1@s">
        <label :class="{
            'uk-form-danger': errors.phone || errors['contact.phone'],
          }">Odział</label>
        <select class="uk-select" type="text" placeholder="50"></select>
      </div>
    </vk-grid>
  </div>
</template>

<script>
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
  },
};
</script>

<style>
</style>