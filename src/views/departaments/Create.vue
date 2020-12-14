<template>
  <div class="uk-container">
    <DepartamentsForm
      :hideSubmit="true"
      :hideRelation="false"
      @submit="setDepartmentData"
      :title="'Dane oddziału'"
      :errors="this.errors ? this.errors : {}"
    ></DepartamentsForm>
    <ContactsForm
      :hideSubmit="true"
      :hideRelation="true"
      @submit="setContactData"
      :title="'Dane kontaktu'"
      :errors="this.errors ? this.errors : {}"
    ></ContactsForm>
    <div class="uk-card uk-margin-top uk-card-default uk-card-body">
      <div class="uk-margin">
        <div class="uk-form-controls">
          <vk-button @click="onSubmit">ZAPISZ</vk-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DepartamentsForm from "../../components/departaments/Form";
import ContactsForm from "../../components/contacts/Form";
import axios from "axios";

export default {
  data() {
    return {
      departament: null,
      contact: null,
      errors: null
    };
  },
  components: {
    DepartamentsForm,
    ContactsForm,
  },
  methods: {
    onSubmit: async function () {
      this.$emit("submit");
      console.log(this.departament);
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/web/departament",
          {
            departament: this.departament,
            contact: this.contact,
          }
        );
        this.$router.push({ name: "DepartamentsDetails" , params: {id: response.data.id}});
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    setDepartmentData: function (data) {
      this.departament = data;
    },
    setContactData: function (data) {
      this.contact = data;
    },
  },
};
</script>

<style>
</style>