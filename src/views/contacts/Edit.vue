<template>
  <div class="uk-container">
    <ContactsForm
      :hideSubmit="false"
      :hideRelation="false"
      :form="contact"
      @submit="onSubmit"
      :title="'Edytuj kontakt'"
      :errors="errors"
    ></ContactsForm>
  </div>
</template>

<script>
import ContactsForm from "../../components/contacts/Form";
import axios from "axios";

export default {
  data() {
    return {
      contact: null,
      errors: {}
    };
  },
  components: {
    ContactsForm,
  },
  beforeMount() {
    this.getContact();
  },
  methods: {
    getContact: async function () {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/web/contact/" + this.$route.params.id
      );
      this.contact = response.data;
    },
    onSubmit: async function (data) {
      try {
        const response = await axios.put(
          "http://127.0.0.1:8000/api/web/contact/" + this.$route.params.id,
          data
        );
        if (response.data) {
          this.$router.push({name: "ContactsDetails", params: {id: this.contact.id}})
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