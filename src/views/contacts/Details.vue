<template>
    <div class="uk-container">
        <ContactDetails :id="id"/>
    </div>
</template>

<script>
import ContactDetails from "../../components/contacts/Details";

export default {
    components: {
        ContactDetails
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