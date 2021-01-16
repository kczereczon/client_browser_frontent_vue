<template>
  <div class="uk-container">
    <div class="uk-card uk-margin-top uk-card-default uk-card-body">
      <h3 class="uk-card-title">Lista kontrahenta</h3>
        <vk-grid>
          <div class="uk-width-expand@m">
            <input v-model="params.name" class="uk-input" type="text" placeholder="Nazwa firmy" />
          </div>
          <div class="uk-width-auto@m">
            <input v-model="params.nip" class="uk-input" type="text" placeholder="Nip" />
          </div>
          <div class="uk-width-auto@m">
            <button @click="loadConstructors(1)" class="uk-button uk-button-default">SZUKAJ</button>
          </div>
        </vk-grid>
    </div>
    <div v-if="info.data" class="uk-card uk-margin-top uk-card-default uk-card-body">
      <div class="uk-card-title uk-text-right"><vk-button type="secondary" @click="openCreate">NOWY KONTRAHENT</vk-button></div>
      <vk-table :data="info.data" justified>
        <vk-table-column
          class="uk-width-large"
          title="Nazwa"
          cell="name"
        ><vk-button slot-scope="{ cell, row }" @click="openDetails(row.id)" type="text">{{cell}}</vk-button></vk-table-column>
        <vk-table-column title="NIP" cell="nip"></vk-table-column>
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
  name: "ContractorsMain",
  data() {
    return {
      info: [],
      params: {
      },
      page: 1
    };
  },
  beforeMount() {
    this.loadConstructors(this.page);
  },
  methods: {
    loadConstructors: async function (newPage) {
        const params = {...this.params, page: newPage};
        const response = await axios.get(process.env.VUE_APP_API_SERVER+"/api/web/contractor", {params: params});
        this.info = response.data;
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
      await axios.delete(process.env.VUE_APP_API_SERVER+"/api/web/contractor/"+id);
      this.loadConstructors(this.page);
    },
    openCreate: function() {
      this.$router.push({name: "ContractorsCreate"});
    },
    openDetails: function(id) {
      this.$router.push({name: "ContractorsDetails", params: {id: id}});
    }
  },
  watch: {
    page: function (newPage){
      console.log(this.info);
      this.loadConstructors(newPage);
    }
  }
};
</script>

<style>
</style>