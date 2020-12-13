<template>
    <div class="uk-container">
        <ContractorDetails :id="id"/>
    </div>
</template>

<script>
import ContractorDetails from "../../components/contractors/Details";

export default {
    components: {
        ContractorDetails
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