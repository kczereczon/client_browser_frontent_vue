<template>
  <div class="uk-container">
    <ContractorsForm
      :hideSubmit="false"
      :form="contractor"
      @submit="onSubmit"
      :title="'Edytuj kontraktora'"
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
        "http://127.0.0.1:8000/api/web/contractor/" + this.$route.params.id
      );
      this.contractor = response.data;
    },
    onSubmit: async function (data) {
      try {
        const response = await axios.put(
          "http://127.0.0.1:8000/api/web/contractor/" + this.$route.params.id,
          data
        );
        if (response.data) {
          this.getContractor();
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