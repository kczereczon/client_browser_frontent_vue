<template>
  <div class="uk-card uk-margin-top uk-card-default uk-card-body">
    <h3 class="uk-card-title">{{ title }}</h3>
    <form v-if="form" class="uk-form-stacked">
      <div class="uk-margin">
        <label
          :class="{
            'uk-form-danger': this.getError('name'),
          }"
          for="form-stacked-text"
          >Nazwa firmy</label
        >
        <div class="uk-form-controls">
          <input
            :class="{
              'uk-input': true,
              'uk-form-danger': this.getError('name'),
            }"
            v-model="form.name"
            id="form-stacked-text"
            type="text"
            placeholder="Nazwa twojej firmy"
          />
          <p
            v-for="item in getError('name')"
            :key="item"
            class="uk-text-danger"
          >
            {{ item }}
          </p>
        </div>
      </div>
      <div class="uk-margin">
        <label
          :class="{
            'uk-form-danger': this.getError('nip'),
          }"
          for="form-stacked-text"
          >NIP</label
        >
        <div class="uk-form-controls">
          <input
            :class="{
              'uk-input': true,
              'uk-form-danger': this.getError('nip'),
            }"
            v-model="form.nip"
            id="form-stacked-text"
            type="text"
            placeholder="Nip firmy"
          />
          <p
            v-for="item in getError('nip')"
            :key="item"
            class="uk-text-danger"
          >
            {{ item }}
          </p>
        </div>
      </div>
      <div v-if="!hideSubmit" class="uk-margin">
        <div class="uk-form-controls">
          <vk-button @click="submit">ZAPISZ</vk-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    form: { type: Object, default: () => ({ name: null, nip: null }) },
    hideSubmit: { type: Boolean, default: () => true },
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
      return this.errors[field] || this.errors["contractor." + field];
    },
  },
};
</script>

<style>
</style>