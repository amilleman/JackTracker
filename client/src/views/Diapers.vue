<template>
  <b-container fluid>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="submitted">
      <Success>
        <template v-slot:header>
          <i class="fas fa-toilet"></i>
        </template>
        Diaper Logged Successfully
        <div class="pt-2">
          <b-button @click="load()">Return to Diapers</b-button>
        </div>
      </Success>
    </div>
    <div v-else>
      <h1 class="pt-3 pb-3">Dirty Dooper!</h1>
      <b-row>
        <b-col xl="6" class="pb-4">
          <b-card>
            <template #header>
              <b-row align-v="center">
                <b-col cols="5">
                  <h6 class="mb-0">Diaper</h6>
                </b-col>
                <b-col cols="2" offset="4"> 
                  <b-button v-if="diaperCardVisible" v-b-toggle.diaper-body size="sm">Hide</b-button>
                  <b-button v-if="!diaperCardVisible" v-b-toggle.diaper-body size="sm" variant="primary">Show</b-button>
                </b-col>
              </b-row>
            </template>
            <b-collapse v-model="diaperCardVisible" id="diaper-body">
              <div class="pb-2">
                <b-row align-v="center">
                  <b-col cols="3">
                    <label for="_diaperType">Type:</label>
                  </b-col>
                  <b-col cols="9">
                    <b-form-select 
                      class="w-100"
                      v-model="diaperType" 
                      :options="diaperOptions" 
                      id="_diaperType"
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
                  <b-col cols="3">
                    <label for="_diaperDetails">Details:</label>
                  </b-col>
                  <b-col cols="9">
                    <b-form-textarea
                      class="w-100"
                      id="_diaperDetails"
                      type="text"
                      v-model="diaperDetails"
                      placeholder="Anything noteworthy about the doop..?"
                      rows="5"
                    ></b-form-textarea>
                  </b-col>
                </b-row>
              </div>
            </b-collapse>
          </b-card>
          <b-row>
            <b-col class="pt-2" xl="4">
              <b-button 
                variant="success" 
                :disabled=" !diaperType || loading || posting "
                @click="logDoop"
              >
                  Log this Doop
              </b-button>           
            </b-col>
          </b-row>
        </b-col>
        <b-col md="6" xl="4">
          <div v-if="todaysDiapers.length > 0">
            <InfoTable :details="this.todaysDiapers" @rowSelected="diaperSelected" />
          </div>
        </b-col>
      </b-row>
      
    </div>
  </b-container>   
</template>

<script>
import * as _diaperService from '../services/diaperService';
import InfoTable from '../components/shared/cTodayInfoTable.vue'
import Success from '../components/shared/Success.vue';
  export default {
    components: { InfoTable, Success },
    data() {
      return {
        //TODO
          //move these values to the global store
          //and handle in the core service calls
        loading: false,
        submitted: false,
        posting: false,

        diaperType: null,
        diaperDetails: null,
        todaysDiapers: [],
        diaperCardVisible: true,
        diaperOptions: [
          { value: 'Poop', text: 'Poop Doop' },
          { value: 'Pee', text: 'Pee Doop' }
        ]
      }
    },
    created(){
      this.load();
    },
    methods: {
      diaperSelected(diaper){
        console.log(diaper[0]._id);
      },
      clearData() {
        this.diaperType = null;
        this.diaperDetails = null;
        this.todaysDiapers = [];
      },
      logDoop() {
        this.posting = true;
        this.submitted = false;

        _diaperService.postDiaper({
          Type: this.diaperType,
          Details: this.diaperDetails
        }, res => {
          if(res.status === 201){
            this.submitted = true;
          }else{
            console.log(res);
          }
          this.posting = false;
        });
      },
      load(){
        this.loading = true;
        this.submitted = false;
        this.posting = false;

        this.clearData();
        _diaperService.getDailyDiapers(res => {
          if(res.status == 200){
            this.todaysDiapers = res.data;
          }else{
            console.log(res);
          }
          this.loading = false;
        });
      }
    }
  }
</script>