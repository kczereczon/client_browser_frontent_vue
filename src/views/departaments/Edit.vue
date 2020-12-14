<template>
  <div class="uk-container">
    <DepartamentsForm
      :hideSubmit="false"
      :form="contractor"
      @submit="onSubmit"
      :title="'Edytuj departament'"
      :errors="errors"
    ></DepartamentsForm>
  </div>
</template>

<script>
import DepartamentsForm from "../../components/departaments/Form";
import axios from "axios";

export default {
  data() {
    return {
      departament: null,
      errors: {}
    };
  },
  components: {
    DepartamentsForm,
  },
  beforeMount() {
    this.getDepartament();
  },
  methods: {
    getDepartament: async function () {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/web/departament/" + this.$route.params.id
      );
      this.departament = response.data;
    },
    onSubmit: async function (data) {
      try {
        const response = await axios.put(
          "http://127.0.0.1:8000/api/web/departament/" + this.$route.params.id,
          data
        );
        if (response.data) {
          this.$router.push({name: "DepartamentsDetails", params: {id: this.departament.id}})
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