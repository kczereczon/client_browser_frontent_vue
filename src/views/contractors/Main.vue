<template>
  <div class="uk-container">
    <div class="uk-card uk-margin-top uk-card-default uk-card-body">
      <h3 class="uk-card-title">Lista kontraktorów</h3>
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
      <vk-table :data="info.data" justified>
        <vk-table-column
          class="uk-width-large"
          title="Nazwa"
          cell="name"
        ></vk-table-column>
        <vk-table-column title="NIP" cell="nip"></vk-table-column>
        <vk-table-column cell="city">
          <vk-button slot-scope="">EDYTUJ</vk-button>
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
        const response = await axios.get("http://127.0.0.1:8000/api/web/contractor", {params: params});
        this.info = response.data;
    },
    
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