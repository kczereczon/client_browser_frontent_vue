<template>
    <div class="uk-card uk-margin-top uk-card-default uk-card-body">
      <h3 class="uk-card-title">Detale kontaktu</h3>
      <vk-grid class="uk-margin-top">
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Imię:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{contact.name}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Nazwisko:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{contact.last_name}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Email:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{contact.email}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Telefon:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{contact.phone}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Data utworzenia w systemie:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{contact.created_at | formatDate}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Ostatnia modyfikacja w systemie:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{contact.updated_at | formatDate}}
              </span>
          </div>
          <div class="uk-width-auto" v-if="!hideButtons">
              <vk-button type="primary" @click="openEdit(contact.id)">EDYTUJ</vk-button>
          </div>
          <div class="uk-width-auto" v-if="!hideButtons">
              <vk-button type="danger" @click="remove(contact.id)">USUŃ</vk-button>
          </div>
      </vk-grid>
</div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: Number,
    hideButtons: {type:Boolean, default: () => (false) },
  },
  data: function () {
    return {
      contact: {},
    };
  },
  beforeMount() {
    this.getContact();
  },
  methods: {
    getContact: async function () {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/web/contact/" + this.id
      );
      this.contact = response.data;
      this.$emit("gotContact", response.data)
    },
    openEdit: function(id) {
      this.$router.push({name: "ContactsEdit", params: {id: id}});
    },
    remove: function(id) {
      if(confirm("Czy napewno chcesz usunąć kontakt?")) {
        this.deleteContact(id);
      }
    },
    deleteContact: async function(id) {
      await axios.delete("http://127.0.0.1:8000/api/web/contact/"+id);
      this.$router.push({name: "Contacts"});
    },
  },
};
</script>

<style>
</style>
