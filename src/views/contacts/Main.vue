<template>
  <div class="uk-container">
    <div class="uk-card uk-margin-top uk-card-default uk-card-body">
      <h3 class="uk-card-title">Lista kontaktów</h3>
        <vk-grid>
          <div class="uk-width-auto@m">
            <input v-model="params.name" class="uk-input" type="text" placeholder="Imię" />
          </div>
          <div class="uk-width-auto@m">
            <input v-model="params.last_name" class="uk-input" type="text" placeholder="Nazwisko" />
          </div>
          <div class="uk-width-auto@m">
            <input v-model="params.email" class="uk-input" type="text" placeholder="Email" />
          </div>
          <div class="uk-width-auto@m">
            <input v-model="params.phone" class="uk-input" type="text" placeholder="Telefon" />
          </div>
          <div class="uk-width-expand@m">
            <input v-model="params.departament.name" class="uk-input" type="text" placeholder="Oddział" />
          </div>
          <div class="uk-width-auto@m">
            <button @click="loadContacts(1)" class="uk-button uk-button-default">SZUKAJ</button>
          </div>
        </vk-grid>
    </div>
    <div v-if="info.data" class="uk-card uk-margin-top uk-card-default uk-card-body">
      <div class="uk-card-title uk-text-right"><vk-button type="secondary" @click="openCreate">NOWY KONTAKT</vk-button></div>
      <vk-table :data="info.data" justified>
        <vk-table-column
          class="uk-width-large"
          title="Nazwa"
          cell="name"
        ><vk-button slot-scope="{ cell, row }" @click="openDetails(row.id)" type="text">{{cell}}</vk-button></vk-table-column>
         <vk-table-column
          class="uk-width-large"
          title="Nazwisko"
          cell="last_name"
        ><vk-button slot-scope="{ cell, row }" @click="openDetails(row.id)" type="text">{{cell}}</vk-button></vk-table-column>
         <vk-table-column
          class="uk-width-large"
          title="Email"
          cell="email"
        ><vk-button slot-scope="{ cell, row }" @click="openDetails(row.id)" type="text">{{cell}}</vk-button></vk-table-column>
         <vk-table-column
          class="uk-width-large"
          title="Telefon"
          cell="phone"
        ><vk-button slot-scope="{ cell, row }" @click="openDetails(row.id)" type="text">{{cell}}</vk-button></vk-table-column>
         <vk-table-column
          class="uk-width-large"
          title="Oddział"
          cell="departament.name"
        ><vk-button slot-scope="{ cell, row }" @click="openDetails(row.id)" type="text">{{cell}}</vk-button></vk-table-column>
        
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
  name: "ContactsMain",
  data() {
    return {
      info: [],
      params: {
      },
      page: 1
    };
  },
  beforeMount() {
    this.loadContacts(this.page);
  },
  methods: {
    loadContacts: async function (newPage) {
        const params = {...this.params, page: newPage};
        const response = await axios.get("http://127.0.0.1:8000/api/web/contact", {params: params});
        this.info = response.data;
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
      this.loadContacts(this.page);
    },
    openCreate: function() {
      this.$router.push({name: "ContactsCreate"});
    },
    openDetails: function(id) {
      this.$router.push({name: "ContactsDetails", params: {id: id}});
    }
  },
  watch: {
    page: function (newPage){
      console.log(this.info);
      this.loadContacts(newPage);
    }
  }
};
</script>

<style>
</style>