<template>
    <div class="uk-container">
        <ContactDetails :id="id" @gotContact="loadContact" />
        <DepartamentsDetails :id="id" @gotDepartament="loadDepartament" :hideButtons="true"/>
        <ContractorDetails :id="contact.departament.contractor_id" :hideButtons="true" v-if="contact"/>
    </div>
</template>

<script>
import axios from "axios";
import ContactDetails from "../../components/contacts/Details";
import ContractorDetails from "../../components/contractors/Details";
import DepartamentsDetails from "../../components/departaments/Details";

export default {
    data () {
        return{
            contact:null,
            departaments:null};
    },
    components: {
        ContactDetails,
        ContractorDetails,        
        DepartamentsDetails,

    },
    methods: {
        loadContact:function(data){
            this.contact=data;
        },
        loadDepartaments: async function (newPage) {
      const params = { ...this.params, page: newPage };
      const response = await axios.get(
        "http://127.0.0.1:8000/api/web/departament/contact/" + this.id,
        { params: params }
      );
      this.departaments = response.data;
    },
     loadDepartament:function(data){
            this.departament=data;
        }
    },
    beforeMount() {
    this.loadDepartaments();
  },
    computed: {
        id: function() {
            return parseInt(this.$route.params.id);
        }
    }
}
</script>

<style>

</style>