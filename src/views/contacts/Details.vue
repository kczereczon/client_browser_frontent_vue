<template>
    <div class="uk-container">
        <ContactDetails :id="id" @gotContact="loadContact"/>
        <ContractorDetails :id="contact.departament.contractor_id" :hideButtons="true" v-if="contact"/>
    </div>
</template>

<script>
import ContactDetails from "../../components/contacts/Details";
import ContractorDetails from "../../components/contractors/Details";

export default {
    data () {
        return {contact:null};
    },
    components: {
        ContactDetails,
        ContractorDetails,

    },
    methods: {
        loadContact:function(data){
            this.contact=data;
        }
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