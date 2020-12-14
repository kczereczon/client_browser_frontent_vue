<template>
    <div class="uk-card uk-margin-top uk-card-default uk-card-body">
      <h3 class="uk-card-title">Detale użytkownika</h3>
      <vk-grid class="uk-margin-top">
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Nazwa oddziału:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{departament.name}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Ulica:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{departament.street}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Miasto:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{departament.city}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Kraj:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{departament.country}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Kod pocztowy:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{departament.postal_code}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Data utworzenia w systemie:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{departament.created_at | formatDate}}
              </span>
          </div>
          <div class="uk-width-1-5">
              <span class="uk-text-bold">
                  Ostatnia modyfikacja w systemie:
              </span>
          </div>
          <div class="uk-width-4-5">
              <span class="uk-text-light">
                  {{departament.updated_at | formatDate}}
              </span>
          </div>
          <div class="uk-width-auto">
              <vk-button type="primary" @click="openEdit(departament.id)">EDYTUJ</vk-button>
          </div>
          <div class="uk-width-auto">
              <vk-button type="danger" @click="remove(departament.id)">USUŃ</vk-button>
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
      departament: {},
    };
  },
  beforeMount() {
    this.getDepartament();
  },
  methods: {
    getDepartament: async function () {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/web/departament/" + this.id
      );
      this.departament= response.data;
    },
    openEdit: function(id) {
      this.$router.push({name: "DepartamentsEdit", params: {id: id}});
    },
    remove: function(id) {
      if(confirm("Czy napewno chcesz usunąć oddział?")) {
        this.deleteDepartament(id);
      }
    },
    deleteDepartament: async function(id) {
      await axios.delete("http://127.0.0.1:8000/api/web/departament/"+id);
      this.$router.push({name: "Departaments"});
    },
  },
};
</script>

<style>
</style>