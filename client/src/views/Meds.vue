<template>
  <b-container fluid>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="submitted">
      <Success>
        <template v-slot:header>
          <i class="fas fa-prescription-bottle-alt"></i>
        </template>
          Dose Logged Successfully
        <div class="pt-2">
          <b-button @click="load()">Return to Meds</b-button>
        </div>
      </Success>
    </div>
    <div v-else>

      <h1 class="pt-3 pb-3">Jack's Meds/Viteys</h1>

      <b-button-group class="pb-3" size="sm">
        <b-button variant="outline-dark" :pressed="addMedVitaminDosage" @click="setCard('addMedVitaminDosage')">Add Dose</b-button>
        <b-button variant="outline-dark" :pressed="editOptions" @click="setCard('editOptions')">Edit Options</b-button>
        <b-button variant="outline-dark" :pressed="logTemperature" @click="setCard('logTemperature')">Log Temp</b-button>
      </b-button-group>
      
      <div v-if="addMedVitaminDosage">
        <b-row>
          <b-col md="8" xl="6" class="pb-3">
            <b-row>
              <b-col md="8" xl="6" class="pb-3">
                <MedVitCard 
                  :medVitObj="postMedVitObj"
                  :medVitOptions="medVitTypes"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col class="pt-2" xl="4">
                <b-button 
                  variant="success" 
                  :disabled=" (!postMedVitObj.medVitType) || 
                  (postMedVitObj.medVitType && (postMedVitObj.doseAmount == 0)) || 
                  loading || 
                  posting "
                  @click="logDose()"
                >
                    Log this Dose
                </b-button>           
              </b-col>
            </b-row>
          </b-col>
          <b-col md="6" xl="4">
            <div v-if="todaysDoses.length > 0">
              <InfoTable :details="this.todaysDoses" :dynamicFields="this.dynamicFields">Doses</InfoTable>
            </div>
          </b-col>
        </b-row>
      </div>
      <div v-if="editOptions">
        <b-row>
          <b-col md="6" xl="4">
            <b-row>
              <b-col md="6" class="pb-2"> 
                <b-form-input v-model="typeToAdd" id="_addMedVit" placeholder="Enter A Medicine/Vitamin"></b-form-input>
              </b-col>
              <b-col class="pb-2">
                <b-button variant="success" @click="addMedType()" :disabled="!typeToAdd">Add Type</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="8" xl="4" class="pb-5">
            <DisplayTypes
              :types="medVitTypes"
            />
          </b-col>
        </b-row>
      </div>
      <div v-if="logTemperature">
        <b-row>
          <b-col md="6" xl="4">
            <b-row>
              <b-col md="6" class="px-4"> 
                <b-row>
                  <b-form-input v-model="temperature" type="number" id="_addTemperature" placeholder="Temperature"></b-form-input>
                </b-row>
                <b-row class="py-2">
                  <b-form-textarea
                    id="_temperatureDetails"
                    type="text"
                    v-model="temperatureDetails"
                    placeholder="Any details about the fever..?"
                    rows="5"
                  ></b-form-textarea>
                </b-row>
              </b-col>
              <b-col class="pb-2">
                <b-button variant="success" @click="postTemperatureReading()" :disabled="!temperature">Add Temp Reading</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="8" xl="4" class="pb-5">
            <div v-if="this.todaysTemps.length > 0">
              <InfoTable :details="this.todaysTemps" :dynamicFields="this.dynamicFieldsTemp">Temperatures</InfoTable>
            </div>
          </b-col>
        </b-row>
      </div>
      
    </div>
  </b-container>   
</template>

<script>
import InfoTable from '../components/shared/cDynamicTable.vue'
import DisplayTypes from '../components/shared/cDisplayTypes.vue'
import MedVitCard from '../components/meds/cMedVit.vue'
import Success from '../components/shared/Success.vue';
import * as _medVitService from '../services/medService';
  export default {
    components: { InfoTable, Success, MedVitCard, DisplayTypes },
    data() {
      return {
        //general data
        dynamicFields: [
          {key: 'Type'},
          {key: 'CreatedModifiedAt', label: 'When', type: 'fromNow'}
        ],
        dynamicFieldsTemp: [
          {key: 'Temperature'},
          {key: 'CreatedModifiedAt', label: 'When', type: 'timeString'}
        ],
        loading: false,
        submitted: false,
        posting: false,
        //medVit
        addMedVitaminDosage: true,
        postMedVitObj: {
          medVitType: null,
          medVitDetails: null,
          doseAmount: 0
        },
        todaysDoses: null,
        //medvit options
        editOptions: false,
        medVitTypes: null,
        typeToAdd: null,
        //temperatures
        logTemperature: false,
        todaysTemps: null,
        temperature: null,
        temperatureDetails: null
      }
    },
    created(){
      this.load();
      this.getMedVitTypes();
    },
    methods: {            
      logDose() {
        this.posting = true;
        _medVitService.postMedVitDose({
          Type: this.postMedVitObj.medVitType,
          Amount: this.postMedVitObj.doseAmount,
          Details: this.postMedVitObj.medVitDetails
        }, res => {
          console.log(res);
          this.submitted = true;
          this.posting = false;
        })
      },
      setCard(val){
        this.addMedVitaminDosage = false;
        this.editOptions = false;
        this.logTemperature = false;
        switch(val) {
          case 'addMedVitaminDosage':
            this.addMedVitaminDosage = true;
            break;
          case 'editOptions':
            this.editOptions = true;
            break;
          case 'logTemperature':
            this.getTodaysTemperatures();
            this.logTemperature = true;
            break;
          default:
            break;
        }
      },
      load(){
        this.loading = true;
        this.submitted = false;
        this.posting = false;
        this.postMedVitObj = {
          medVitType: null,
          medVitDetails: null,
          doseAmount: 0
        };
        this.todaysDoses = [];
        _medVitService.getDailyDoses(res => {
          this.todaysDoses = res.data;
          this.loading = false;
        })
        this.loading = false;
      },
      getMedVitTypes(){
        _medVitService.getMedVitTypes(res => {
          this.typeToAdd = null;
          this.medVitTypes = res.data;
          this.loading = false
        })
      },
      addMedType(){
        _medVitService.postMedVitType({typeToAdd: this.typeToAdd}, res => {
          console.log(res);
          this.getMedVitTypes();
        })  
      },
      getTodaysTemperatures(){
        this.todaysTemps = [];
        _medVitService.getDailyTemperatureReadings(res => {
          this.todaysTemps = res.data;
        })        
      },
      postTemperatureReading(){
        _medVitService.postTemperatureReading(
          {Temperature: this.temperature,
           Details: this.temperatureDetails}, res => {
            console.log(res.data);
            this.getTodaysTemperatures();
            this.temperature = null;
            this.temperatureDetails = null;
          });
      }
    }
  }
</script>