<template>
  <div>
    <b-card>
      <template #header>
        <b-row align-v="center">
          <b-col cols="5">
            <h6 class="mb-0">Solids</h6>
          </b-col>
          <b-col cols="3" offset="4">
            <b-button v-if="solidsCardVisible" v-b-toggle.solids-body size="sm">Hide</b-button>
            <b-button v-else v-b-toggle.solids-body size="sm" variant="primary">Show</b-button>
          </b-col>
        </b-row>
      </template>
      <b-collapse v-model="solidsCardVisible" id="solids-body">
        <div class="pb-2">
          <b-row align-v="top">
            <b-col cols="4">
              <label for="_solidsType">Type:</label>
            </b-col>
            <b-col >
              <b-form-select 
                class="w-100"
                v-model="solidsObj.solidsType" 
                :options="solidsTypes" 
                id="_solidsType"
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
              <label for="_solidsAmount">Amount:</label>
            </b-col>
            <b-col>    
              <b-input-group append="oz">
                <b-form-input v-model="solidsObj.solidsAmount" type="number" id="_solidsAmount"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </div>
        <div class="pb-2">
          <b-row align-v="top">
            <b-col cols="4">
              <label for="_solidsDetails">Details:</label>
            </b-col>
            <b-col>
              <b-form-textarea
                id="_solidsDetails"
                type="text"
                v-model="solidsObj.solidsDetails"
                placeholder="Anything noteworthy about the feed..?"
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
      solidsCardVisible: true
    }
  },
  props: {
    solidsObj: {
      type: Object,
      default: null
    },
    solidsTypes: []
  }
}
</script>