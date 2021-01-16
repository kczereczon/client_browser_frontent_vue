<template>
  <div class="uk-margin-top">
    <vk-grid class="uk-child-width-expand@s uk-text-center">
      <div>
        <vk-card
          ><vk-card-title>Zapłacone faktury</vk-card-title>
          <vk-label
            :type="'success'"
            ><span style="font-size: 5vh">{{paidTotal}} zł</span></vk-label></vk-card
        >
      </div>
      <div>
        <vk-card
          ><vk-card-title>Niezapłacone faktury</vk-card-title>
          <vk-label
            :type="'danger'"
            ><span style="font-size: 5vh">{{unpaidTotal}} zł</span></vk-label>
          </vk-card
        >
      </div>
    </vk-grid>

    <div class="uk-card uk-margin-top uk-card-default uk-card-body">
      <div class="uk-card-title uk-text-left">{{ title }}</div>
      <vk-grid>
        <div class="uk-width-auto@m">
          <flat-pickr
            placeholder="Data od"
            class="uk-input"
            :config="config"
            v-model="params.date_from"
          />
          <!-- <input v-model="params.date_from" class="uk-input" type="text" data-uk-datepicker="{format:'DD.MM.YYYY'}" placeholder="Data od" /> -->
        </div>
        <div class="uk-width-auto@m">
          <flat-pickr
            placeholder="Data do"
            class="uk-input"
            :config="config"
            v-model="params.date_to"
          />
          <!-- <input v-model="params.date_to" class="uk-input" type="text" placeholder="Data do" /> -->
        </div>
        <div class="uk-width-auto@m">
          <button @click="loadInvoices()" class="uk-button uk-button-default">
            SZUKAJ
          </button>
        </div>
      </vk-grid>
      <vk-table :data="invoices" justified>
        <vk-table-column
          class="uk-width-large"
          title="Numer faktury"
          cell="invoice_number"
        >
        </vk-table-column>
        <vk-table-column class="uk-width-large" title="Wartość" cell="total">
          <div slot-scope="{ cell }">{{ cell }} zł</div></vk-table-column
        >
        <vk-table-column
          class="uk-width-large"
          title="Status"
          cell="invoice_status"
          ><vk-label
            slot-scope="{ cell }"
            :type="cell == 'paid' ? 'success' : 'danger'"
            >{{ cell }}</vk-label
          >
        </vk-table-column>
        <vk-table-column
          class="uk-width-large"
          title="Data wystawienia"
          cell="invoice_date"
          ><div slot-scope="{ cell }">
            {{ cell | formatDate }}
          </div></vk-table-column
        >
      </vk-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
// localization is optional
import { Polish } from "flatpickr/dist/l10n/pl";
export default {
  components: {
    flatPickr,
  },
  props: {
    id: Number,
    title: String,
    info: Object,
  },
  data() {
    return {
      params: {
        date_from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        date_to: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ),
      },
      invoices: {},
      // Get more form https://flatpickr.js.org/options/
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "Y-m-d",
        locale: Polish, // locale for this instance only
      },
      paidTotal: 0,
      unpaidTotal: 0,
    };
  },
  mounted() {
    this.loadInvoices();
  },
  methods: {
    loadInvoices: async function () {
      this.paidTotal = 0;
      this.unpaidTotal = 0;

      const params = { ...this.params };
      const response = await axios.get(
        process.env.VUE_APP_API_SERVER + "/api/web/invoices/" + this.id,
        { params: params }
      );

      this.invoices = response.data;

      this.invoices.forEach((element) => {
        if (element.invoice_status == "paid") {
          this.paidTotal += element.total;
        } else {
          this.unpaidTotal += element.total;
        }
      });
    },
  },
};
</script>

<style>
</style>