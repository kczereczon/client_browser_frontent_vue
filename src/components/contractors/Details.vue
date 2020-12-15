<template>
    <div class="uk-card uk-margin-top uk-card-default uk-card-body">
      <h3 class="uk-card-title">Detale kontrahenta</h3>
      <vk-grid class="uk-margin-top">
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Nazwa firmy:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{contractor.name}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  NIP:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{contractor.nip}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Data dołączenia:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{contractor.join_date | formatDate}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Data utworzenia w systemie:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{contractor.created_at | formatDate}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Ostatnia modyfikacja w systemie:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{contractor.updated_at | formatDate}}
              </span>
          </div>
          <div class="uk-width-auto">
              <vk-button type="primary" @click="openEdit(contractor.id)">EDYTUJ</vk-button>
          </div>
          <div class="uk-width-auto">
              <vk-button type="danger" @click="remove(contractor.id)">USUŃ</vk-button>
          </div>
      </vk-grid>
</div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: Number,
  },
  data: function () {
    return {
      contractor: {},
    };
  },
  beforeMount() {
    this.getContractor();
  },
  methods: {
    getContractor: async function () {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/web/contractor/" + this.id
      );
      this.contractor = response.data;
    },
    openEdit: function(id) {
      this.$router.push({name: "ContractorsEdit", params: {id: id}});
    },
    remove: function(id) {
      if(confirm("Czy napewno chcesz usunąć kontrahenta?")) {
        this.deleteContractor(id);
      }
    },
    deleteContractor: async function(id) {
      await axios.delete("http://127.0.0.1:8000/api/web/contractor/"+id);
      this.$router.push({name: "Contractors"});
    },
  },
};
</script>

<style>
</style>