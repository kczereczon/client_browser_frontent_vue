<template>
  <div class="uk-card uk-margin-top uk-card-default uk-card-body">
    <h3 class="uk-card-title">{{ title }}</h3>
    <vk-grid>
      <div class="uk-width-1-1">
        <label
          :class="{
            'uk-form-danger': this.getError('name'),
          }"
          >Nazwa</label
        >
        <input
          :class="{
            'uk-input': true,
            'uk-form-danger': this.getError('name'),
          }"
          type="text"
          placeholder="Nazwa oddziału"
          v-model="form.name"
        />
        <p v-for="item in getError('name')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
      <div class="uk-width-1-3@s">
        <label
          :class="{
            'uk-form-danger': this.getError('street'),
          }"
          >Ulica i numer budunku</label
        >
        <input
          :class="{
            'uk-input': true,
            'uk-form-danger': this.getError('street'),
          }"
          type="text"
          placeholder="Ulica wraz z numerem budynku"
          v-model="form.street"
        />
        <p v-for="item in getError('street')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
      <div class="uk-width-1-4@s">
        <label
          :class="{
            'uk-form-danger': this.getError('city'),
          }"
          >Miasto</label
        >
        <input
          :class="{
            'uk-input': true,
            'uk-form-danger': this.getError('city'),
          }"
          type="text"
          placeholder="Miasto oddziału"
          v-model="form.city"
        />
        <p v-for="item in getError('city')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
      <div class="uk-width-1-4@s">
        <label
          :class="{
            'uk-form-danger': this.getError('postal_code'),
          }"
          >Kod pocztowy</label
        >
        <input
          :class="{
            'uk-input': true,
            'uk-form-danger': this.getError('postal_code'),
          }"
          type="text"
          placeholder="Kod pocztowy"
          v-model="form.postal_code"
        />
        <p v-for="item in getError('postal_code')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
      <div class="uk-width-1-6@s">
        <label
          :class="{
            'uk-form-danger': this.getError('country'),
          }"
          >Kraj</label
        >
        <input
          :class="{
            'uk-input': true,
            'uk-form-danger': this.getError('country'),
          }"
          type="text"
          placeholder="Kraj oddziału"
          v-model="form.country"
        />
        <p v-for="item in getError('country')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
      <div v-if="!hideRelation" class="uk-width-1-1@s">
        <label
          :class="{
            'uk-form-danger':
              this.getError('contractor_id'),
          }"
          >Kontraktor</label
        >
        <select
          class="uk-select"
          type="text"
          placeholder="50"
          v-model="form.contractor_id"
        ></select>
        <p v-for="item in getError('contractor_id')" :key="item" class="uk-text-danger">
          {{ item }}
        </p>
      </div>
    </vk-grid>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    errors: { type: Object, default: () => {} },
    form: {
      type: Object,
      default: () => ({
        city: null,
        street: null,
        postal_code: null,
        country: null,
        name: null,
        contractor_id: null,
      }),
    },
    hideSubmit: { type: Boolean, default: () => true },
    hideRelation: { type: Boolean, default: () => true },
  },
  created: function () {
    this.$parent.$on("submit", this.submit);
  },
  methods: {
    submit: function () {
      this.$emit("submit", this.form);
    },
    getError: function (field) {
      return this.errors[field] || this.errors["departament." + field];
    },
  },
};
</script>

<style>
</style>