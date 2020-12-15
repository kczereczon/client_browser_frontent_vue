<template>
  <div class="uk-container">
    <div class="uk-card uk-margin-top uk-card-default uk-card-body">
      <h3 class="uk-card-title">Lista departamentów</h3>
        <vk-grid>
          <div class="uk-width-expand@m">
            <input v-model="params.name" class="uk-input" type="text" placeholder="Nazwa oddziału" />
          </div>
          <div class="uk-width-expand@m">
            <input v-model="params.street" class="uk-input" type="text" placeholder="Ulica" />
          </div>
          <div class="uk-width-expand@m">
            <input v-model="params.city" class="uk-input" type="text" placeholder="Miasto" />
          </div>
          <div class="uk-width-expand@m">
            <input v-model="params.postal_code" class="uk-input" type="text" placeholder="Kod Pocztowy" />
          </div>
          <div class="uk-width-expand@m">
            <input v-model="params.contrahent_id" class="uk-input" type="text" placeholder="ID Kontrahenta" />
          </div>
          <div class="uk-width-auto@m">
            <button @click="loadDepartaments(1)" class="uk-button uk-button-default">SZUKAJ</button>
          </div>
        </vk-grid>
    </div>
    <div v-if="info.data" class="uk-card uk-margin-top uk-card-default uk-card-body">
      <div class="uk-card-title uk-text-right"><vk-button type="secondary" @click="openCreate">NOWY ODDZIAŁ</vk-button></div>
      <vk-table :data="info.data" justified>
        <vk-table-column
          class="uk-width-auto"
          title="Nazwa"
          cell="name"
        ><vk-button slot-scope="{ cell, row }" @click="openDetails(row.id)" type="text">{{cell}}</vk-button></vk-table-column>
        <vk-table-column
          class="uk-width-auto"
          title="Ulica"
          cell="street"
        ></vk-table-column>
         <vk-table-column
          class="uk-width-auto"
          title="Miasto"
          cell="city"
        ></vk-table-column>
        <vk-table-column
          class="uk-width-auto"
          title="Kraj"
          cell="country"
        ></vk-table-column>
        <vk-table-column
          class="uk-width-auto"
          title="Kontrahent"
          cell="contractor.name"
        ><vk-button slot-scope="{ cell, row }" @click="openContractorDetails(row.contractor.id)" type="text">{{cell}}</vk-button></vk-table-column>
        <vk-table-column cell="id">
          <vk-button type="primary" slot-scope="{ cell }" @click="openEdit(cell)">EDYTUJ</vk-button>
        </vk-table-column>
        <vk-table-column cell="id">
          <vk-button type="danger" slot-scope="{ cell }" @click="remove(cell)">USUŃ</vk-button>
        </vk-table-column>
      </vk-table>
      <vk-pagination
        :page.sync="page"
        :per-page="info.per_page"
        :total="info.total"
      >
        <vk-pagination-page-first expanded></vk-pagination-page-first>
        <vk-pagination-pages></vk-pagination-pages>
        <vk-pagination-page-last expanded></vk-pagination-page-last>
      </vk-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DepartamentsMain",
  data() {
    return {
      info: [],
      params: {
      },
      page: 1
    };
  },
  beforeMount() {
    this.loadDepartaments(this.page);
  },
  methods: {
    loadDepartaments: async function (newPage) {
        const params = {...this.params, page: newPage};
        const response = await axios.get("http://127.0.0.1:8000/api/web/departament/", {params: params});
        this.info = response.data;
    },
    openEdit: function(id) {
      this.$router.push({name: "DepartamentsEdit", params: {id: id}});
    },
    remove: function(id) {
      if(confirm("Czy napewno chcesz usunąć departament?")) {
        this.deleteDepartament(id);
      }
    },
    deleteDepartament: async function(id) {
      await axios.delete("http://127.0.0.1:8000/api/web/departament/"+id);
      this.loadConstructors(this.page);
    },
    openCreate: function() {
      this.$router.push({name: "DepartamentsCreate"});
    },
    openDetails: function(id) {
      this.$router.push({name: "DepartamentsDetails", params: {id: id}});
    },
    openContractorDetails: function(id) {
      this.$router.push({name: "ContractorsDetails", params: {id: id}});
    }
  },
  watch: {
    page: function (newPage){
      console.log(this.info);
      this.loadDepartaments(newPage);
    }
  }
};
</script>

<style>
</style>