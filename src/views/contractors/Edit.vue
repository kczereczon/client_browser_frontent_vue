<template>
  <div class="uk-container">
    <ContractorsForm
      :hideSubmit="false"
      :form="contractor"
      @submit="onSubmit"
      :title="'Edytuj kontrahenta'"
      :errors="errors"
    ></ContractorsForm>
  </div>
</template>

<script>
import ContractorsForm from "../../components/contractors/Form";
import axios from "axios";

export default {
  data() {
    return {
      contractor: null,
      errors: {}
    };
  },
  components: {
    ContractorsForm,
  },
  beforeMount() {
    this.getContractor();
  },
  methods: {
    getContractor: async function () {
      const response = await axios.get(
        process.env.VUE_APP_API_SERVER+"/api/web/contractor/" + this.$route.params.id
      );
      this.contractor = response.data;
    },
    onSubmit: async function (data) {
      try {
        const response = await axios.put(
          process.env.VUE_APP_API_SERVER+"/api/web/contractor/" + this.$route.params.id,
          data
        );
        if (response.data) {
          this.$router.push({name: "ContractorsDetails", params: {id: this.contractor.id}})
        }
      } catch (error) {
          this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>