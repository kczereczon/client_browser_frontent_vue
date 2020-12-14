<template>
    <div class="uk-container">
        <DepartamentsDetails :id="id"/>
    </div>
</template>

<script>
import DepartamentsDetails from "../../components/departaments/Details";

export default {
    components: {
        DepartamentsDetails
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