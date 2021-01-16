<template>
  <div class="uk-container">
    <DepartamentsDetails :id="id" @gotDepartament="loadDepartament"/>
    <ContactSmallList :id="id" :title="'Kontakty oddziału'" :info="contacts" @pageChanged="loadContacts" />
    <ContractorDetails :id="departament.contractor_id" :hideButtons="true" v-if="departament"/> 
  </div>
</template>

<script>
import axios from "axios";
import DepartamentsDetails from "../../components/departaments/Details";
import ContactSmallList from "../../components/contacts/SmallList";
import ContractorDetails from "../../components/contractors/Details";

export default {
    data() {
        return{
        contacts:null, 
        departament:null}
    },
  components: {
    DepartamentsDetails,
    ContactSmallList,
    ContractorDetails

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
        process.env.VUE_APP_API_SERVER+"/api/web/contact/departament/" + this.id,
        { params: params }
      );
      this.contacts = response.data;
    },
     loadDepartament:function(data){
            this.departament=data;
        }
  },
  beforeMount() {
    this.loadContacts();
  },
};
</script>

<style>
</style>