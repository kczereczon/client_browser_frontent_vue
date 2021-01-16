<template>
  <div class="uk-container">
    <ContractorDetails :id="id" />
    <InvoicesList :id="id" :title="'Faktury'" />
    <ContactSmallList :id="id" :title="'Kontakty kontrahenta'" :info="contacts" @pageChanged="loadContacts"/>
    <DepartamentsSmallList :id="id" :title="'Oddziały kontrahenta'" :info="departaments" @pageChanged="loadDepartaments"/>
  </div>
</template>

<script>
import axios from "axios";
import ContractorDetails from "../../components/contractors/Details";
import ContactSmallList from "../../components/contacts/SmallList";
import DepartamentsSmallList from "../../components/departaments/SmallList";
import InvoicesList from "../../components/invoices/List";

export default {
    data() {
        return {
            contacts:null,
            departaments:null,
        }
    },
  components: {
    ContractorDetails,
    ContactSmallList,
    DepartamentsSmallList,
    InvoicesList
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
        process.env.VUE_APP_API_SERVER+"/api/web/contact/contractor/" + this.id,
        { params: params }
      );
      this.contacts = response.data;
    },
    loadDepartaments: async function (newPage) {
      const params = { ...this.params, page: newPage };
      const response = await axios.get(
        process.env.VUE_APP_API_SERVER+"/api/web/departament/contractor/" + this.id,
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