<template>
  <div class="uk-container">
    <ContactsForm
      :hideSubmit="true"
      :hideRelation="false"
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
import ContactsForm from "../../components/contacts/Form";
import axios from "axios";

export default {
  data() {
    return {
      contact: null,
      errors: null
    };
  },
  components: {
    ContactsForm,
  },
  methods: {
    onSubmit: async function () {
      this.$emit("submit");
      console.log(this.departament);
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/web/contact",
          {
            departament: this.departament,
            contact: this.contact,
            contractor: this.contractor,
          }
        );
        this.$router.push({ name: "ContactsDetails" , params: {id: response.data.id}});
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    setContractorData: function (data) {
      this.contractor = data;
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