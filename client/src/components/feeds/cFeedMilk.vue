<template>
  <div>
    <b-card>
      <template #header>
        <b-row align-v="center">
          <b-col cols="5">
            <h6 class="mb-0">Milk</h6>
          </b-col>
          <b-col cols="3" offset="4"> 
            <b-button v-if="milkCardVisible" v-b-toggle.milk-body size="sm">Hide</b-button>
            <b-button v-else v-b-toggle.milk-body size="sm" variant="primary">Show</b-button>
          </b-col>
        </b-row>
      </template>
      <b-collapse v-model="milkCardVisible" id="milk-body">
        <div class="pb-2">
          <b-row align-v="top">
            <b-col cols="4">
              <label for="_milkType">Type:</label>
            </b-col>
            <b-col>
              <b-form-select 
                class="w-100"
                v-model="milkObj.milkType" 
                :options="milkOptions" 
                id="_milkType"
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
              <label for="_milkAmount">Amount:</label>
            </b-col>
            <b-col>
              <b-input-group append="oz">
                <b-form-input v-model="milkObj.milkAmount" type="number" id="_milkAmount"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
        </div>
        <div class="pb-2">
          <b-row align-v="top">
            <b-col cols="4">
              <label for="_milkDetails">Details:</label>
            </b-col>
            <b-col>
              <b-form-textarea
                id="_milkDetails"
                type="text"
                v-model="milkObj.milkDetails"
                placeholder="Anything noteworthy about the bottle..?"
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
      milkCardVisible: true,
      milkOptions: [
        { value: 'Milk', text: 'Milk' },
        { value: 'Milk + Oats', text: 'Milk + Oats' },
        { value: 'Milk + Barley', text: 'Milk + Barley' },
        { value: 'Formula', text: 'Formula' }
      ]
    }
  },
  props: {
    milkObj: {
      type: Object,
      default: null
    }
  }
}
</script>