<template>
  <div>
    <b-card>
      <template #header>
        <b-row align-v="center">
          <b-col cols="8">
            <h6 class="mb-0">Meds/Vitamin</h6>
          </b-col>
          <b-col cols="3" offset="1"> 
            <b-button v-if="medVitCardVisible" v-b-toggle.medVit-body size="sm">Hide</b-button>
            <b-button v-else v-b-toggle.medVit-body size="sm" variant="primary">Show</b-button>
          </b-col>
        </b-row>
      </template>
      <b-collapse v-model="medVitCardVisible" id="medVit-body">
        <div class="pb-2">
          <b-row align-v="top">
            <b-col cols="4">
              <label for="_medVitType">Type:</label>
            </b-col>
            <b-col>
              <b-form-select 
                class="w-100"
                v-model="medVitObj.medVitType" 
                :options="medVitOptions" 
                id="_medVitType"
                value-field="Type"
                text-field="Type"
              >
                <template #first>
                  <b-form-select-option value="" disabled>Select an Option</b-form-select-option>
                </template>
              </b-form-select>
            </b-col>
          </b-row>
        </div>
        <div class="pb-2">
          <b-row align-v="top">
            <b-col cols="4">
              <label for="_medVitAmount">Amount:</label>
            </b-col>
            <b-col>
              <b-input-group append="mL">
                <b-form-input v-model="medVitObj.doseAmount" type="number" id="_medVitAmount"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </div>
        <div class="pb-2">
          <b-row align-v="top">
            <b-col cols="4">
              <label for="_medVitDetails">Details:</label>
            </b-col>
            <b-col>
              <b-form-textarea
                id="_medVitDetails"
                type="text"
                v-model="medVitObj.medVitDetails"
                placeholder="Anything noteworthy about the dose..?"
                rows="5"
              ></b-form-textarea>
            </b-col>
          </b-row>
        </div>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      medVitCardVisible: true
    }
  },
  props: {
    medVitObj: {
      type: Object,
      default: null
    },
    medVitOptions: {
      type: Array,
      default: null
    }
  }
}
</script>