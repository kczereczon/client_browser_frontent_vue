<template>
  <div class="uk-card uk-margin-top uk-card-default uk-card-body">
    <div class="uk-card-title uk-text-left">{{ title }}</div>
    <vk-table :data="info.data" v-if="info.data" justified>
      <vk-table-column class="uk-width-large" title="Imię" cell="name"
        ><vk-button
          slot-scope="{ cell, row }"
          @click="openDetails(row.id)"
          type="text"
          >{{ cell }}</vk-button
        >
        </vk-table-column
      ><vk-table-column class="uk-width-large" title="Nazwisko" cell="last_name"
        ><vk-button
          slot-scope="{ cell, row }"
          @click="openDetails(row.id)"
          type="text"
          >{{ cell }}</vk-button
        >
        </vk-table-column
      >
    </vk-table>
    <vk-pagination
      :page.sync="page"
      :per-page="info.per_page"
      :total="info.total"
    >
      <vk-pagination-page-first expanded></vk-pagination-page-first>
      <vk-pagination-pages></vk-pagination-pages>
      <vk-pagination-page-last expanded></vk-pagination-page-last>
    </vk-pagination>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    info: Object,
  },
  data() {
    return {
      params: {},
      page: 1,
    };
  },
  methods: {
    openDetails: function (id) {
      this.$router.push({ name: "ContactsDetails", params: { id: id } });
    },
  },
  watch: {
    page(newValue) {
      this.$emit("pageChanged", newValue);
    },
  },
};
</script>

<style>
</style>
