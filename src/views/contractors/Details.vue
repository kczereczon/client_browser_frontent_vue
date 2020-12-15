<template>
  <div class="uk-container">
    <ContractorDetails :id="id" />
    <ContactSmallList :id="id" :title="'Kontakty Kontrahenta'" :info="contacts" @pageChanged="loadContacts"/>
  </div>
</template>

<script>
import axios from "axios";
import ContractorDetails from "../../components/contractors/Details";
import ContactSmallList from "../../components/contacts/SmallList";

export default {
    data() {
        return {
            contacts:null
        }
    },
  components: {
    ContractorDetails,
    ContactSmallList,
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
  },
  beforeMount() {
    this.loadContacts();
  },
};
</script>

<style>
</style>