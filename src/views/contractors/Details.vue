<template>
  <div class="uk-container">
    <ContractorDetails :id="id" />
    <ContactSmallList :id="id" :title="'Kontakty kontrahenta'" :info="contacts" @pageChanged="loadContacts"/>
    <DepartamentsSmallList :id="id" :title="'Oddziały kontrahenta'" :info="departaments" @pageChanged="loadDepartaments"/>
  </div>
</template>

<script>
import axios from "axios";
import ContractorDetails from "../../components/contractors/Details";
import ContactSmallList from "../../components/contacts/SmallList";
import DepartamentsSmallList from "../../components/departaments/SmallList";

export default {
    data() {
        return {
            contacts:null,
            departaments:null
        }
    },
  components: {
    ContractorDetails,
    ContactSmallList,
    DepartamentsSmallList 
  },
  computed: {
    id: function () {
      return parseInt(this.$route.params.id);
    },
  },
  methods: {
    loadContacts: async function (newPage) {
      const params = { ...this.params, page: newPage };
      const response = await axios.get(
        "http://127.0.0.1:8000/api/web/contact/contractor/" + this.id,
        { params: params }
      );
      this.contacts = response.data;
    },
    loadDepartaments: async function (newPage) {
      const params = { ...this.params, page: newPage };
      const response = await axios.get(
        "http://127.0.0.1:8000/api/web/departament/contractor/" + this.id,
        { params: params }
      );
      this.departaments = response.data;
    },
  },
  beforeMount() {
    this.loadContacts();
    this.loadDepartaments();
  },
};
</script>

<style>
</style>