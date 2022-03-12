<template>
  <b-container fluid>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="submitted">
      <Success>
        <template v-slot:header>
          <i class="fas fa-bed"></i>
        </template>
          Operation Successful
        <div class="pt-2">
          <b-button @click="load()">Return to Sleeps</b-button>
        </div>
      </Success>
    </div>
    <div v-else>

      <h1 class="pt-3 pb-3">Sleepy Jack...</h1>

      <b-button-group class="pb-3" size="sm">
        <b-button variant="outline-dark" :pressed="startSleep" @click="setCard('startSleep')">Start Sleep Session</b-button>
        <b-button variant="outline-dark" :pressed="logSleep" @click="setCard('logSleep')">Log Sleep Session</b-button>
      </b-button-group>
    
      <b-row>
        <div v-if="startSleep">
          <b-col class="pb-3">
            <div v-if="currentSleep == null">
              <b-button variant="success" @click="startSleepingSession()">
                Start <i class="far fa-moon"></i>
              </b-button>
            </div>
            <div v-else>
              <div class="pb-2">
                Sleep started at: {{ formatDate(currentSleep.StartedAt) }} {{ formatTime(currentSleep.StartedAt) }}
                <b-form-textarea 
                  v-model="sleepDetails" 
                  placeholder="anything noteworthy about the sleep..?"
                >
                </b-form-textarea>
              </div>
              <b-button variant="danger" @click="endSleepingSession()">
                Stop <i class="far fa-moon"></i>
              </b-button>
            </div>
          </b-col>
        </div>
        <div v-else>
          <b-row>
            <b-col class="pb-3">
              Log a Sleep Session from earlier!
              <b-row>
                <b-col cols="6" class="pr-2">
                  <b><u>Start</u></b>
                  <b-row>
                    <b-form-input v-model="startSleepDate" size="sm" type="date"></b-form-input>
                  </b-row>
                  <b-row>
                    <b-form-input v-model="startSleepTime" size="sm" type="time"></b-form-input>
                  </b-row>
                </b-col>
                <b-col cols="6" class="pl-2">
                  <b><u>End</u></b>
                  <b-row>
                    <b-form-input v-model="endSleepDate" size="sm" type="date"></b-form-input>
                  </b-row>
                  <b-row>
                    <b-form-input v-model="endSleepTime" size="sm" type="time"></b-form-input>
                  </b-row>
                </b-col>
              </b-row>
              <b-row class="py-2">
                <b><u>Details</u></b>
                <b-form-textarea 
                  v-model="sleepDetails" 
                  placeholder="anything noteworthy about the sleep..?"
                >
                </b-form-textarea>
              </b-row>
            </b-col>
            <b-col cols="7" offset="3" class="pb-3">
              <b-button variant="success" @click="logPastSleepingSession()">
                Log Sleep <i class="far fa-moon"></i>
              </b-button>
            </b-col>
          </b-row>
        </div>
        <b-col md="6" xl="4">
          <div v-if="todaysSleeps.length > 0">
            <InfoTable :details="this.todaysSleeps" :dynamicFields="this.dynamicFields">Sleeps</InfoTable>
          </div>
        </b-col>
      </b-row>
      
    </div>
  </b-container>   
</template>

<script>
import InfoTable from '../components/shared/cDynamicTable.vue'
import Success from '../components/shared/Success.vue';
import * as _sleepService from '../services/sleepService';
import * as _utility from '../utility/common';
  export default {
    components: { InfoTable, Success },
    data() {
      return {
        dynamicFields: [
          {key: 'StartedAt', label: 'Start', type: 'timeString'},
          {key: 'EndedAt', label: 'End', type: 'timeString'}
        ],
        loading: false,
        submitted: false,
        posting: false,

        todaysSleeps: [],
        startSleep: true,
        logSleep: false,
        currentSleep: null,
        sleepDetails: null,
        startSleepDate: null,
        startSleepTime: null,
        endSleepDate: null,
        endSleepTime: null
      }
    },
    created(){
      this.load();
    },
    methods: {  
      logPastSleepingSession(){
        let dbStartDate = this.formatDateTime(this.startSleepTime, this.startSleepDate);
        let dbEndDate = this.formatDateTime(this.endSleepTime, this.endSleepDate);
        if(dbStartDate == null || dbEndDate == null) return;

        this.posting = true;
        let postObj = {
          StartedAt: dbStartDate, 
          EndedAt: dbEndDate, 
          Details: this.sleepDetails
        }
        _sleepService.postSleep(postObj, res => {
          console.log(res.data)
          this.submitted = true;
          this.posting = false;
        });
      },
      formatDateTime(timeVal, dateVal){
        return _utility.formatDateTime(timeVal, dateVal);
      },
      formatDate(val){
        return _utility.formatDate(val);
      },    
      formatTime(val){
        return _utility.formatTime(val);
      },             
      setCard(val){
        this.startSleep = false;
        this.logSleep = false;
        switch(val) {
          case 'startSleep':
            this.startSleep = true;
            break;
          case 'logSleep':
            this.logSleep = true;
            break;
          default:
            break;
        }
      },
      startSleepingSession(){
        this.posting = true;
        let postObj = {
          Details: this.sleepDetails
        }
        _sleepService.postSleep(postObj, res => {
          console.log(res.data)
          this.submitted = true;
          this.posting = false;
        })
      },
      endSleepingSession(){
        this.posting = true;
        let patchParams = {
          EndedAt: Date.now(),
          Details: this.sleepDetails,
          id: this.currentSleep._id
        }
        console.log(patchParams);
        _sleepService.patchSleep(patchParams, res => {
          console.log(res);
          this.submitted = true;
          this.posting = false;
        }); 
      },
      load(){
        this.loading = true;
        this.submitted = false;
        this.posting = false;
        this.startSleepDate = null;
        this.startSleepTime = null;
        this.endSleepDate = null;
        this.endSleepTime = null;
        this.sleepDetails = null;

        this.todaysSleeps = [];
        _sleepService.getDailySleeps(res => {
          this.todaysSleeps = res.data;
        });

        _sleepService.getCurrentSleep(res => {
          this.currentSleep = res.data;
          this.loading = false
        });
      }
    }
  }
</script>