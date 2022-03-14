<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="submitted">
      <Success>
        <template v-slot:header>
          <i class="fas fa-list-alt"></i>
        </template>
          Event Created Successfully
        <div class="pt-2">
          <b-button @click="load()">Return to Events</b-button>
        </div>
      </Success>
    </div>
    <div v-else>
      <!-- Modal button -->
      <div class="py-2">
        <b-button v-b-modal.addEventModal variant="success">Add Event</b-button>
      </div>
      <!-- Modal -->
      <b-modal 
        id="addEventModal" 
        title="Add Event" 
        ok-title="Add" 
        ok-variant="success" 
        cancel-variant="danger"
        centered
        hide-header-close
        @ok="postEvent"
        :ok-disabled="eventInfo.whenDate == null || eventInfo.whenTime == null || eventInfo.what == null"
      >
        <b-col md="6" class="px-4"> 
          <b-row>
            <b-form-input v-model="eventInfo.whenDate" type="date" id="_eventDate"></b-form-input>
          </b-row>
          <b-row>
            <b-form-input v-model="eventInfo.whenTime" type="time" id="_eventTime"></b-form-input>
          </b-row>
          <b-row class="py-2">
            <b-form-textarea
              id="_eventWhat"
              type="text"
              v-model="eventInfo.what"
              placeholder="Event Description"
              rows="5"
            ></b-form-textarea>
          </b-row>
        </b-col>
      </b-modal>
      <div v-if="weeklyEvents">
        <div v-if="weeklyEvents.length > 0">
          <InfoTable :details="weeklyEvents" :dynamicFields="this.dynamicFields">This Week's Events</InfoTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as _utility from '../utility/common';
import * as _eventService from '../services/eventService';
import InfoTable from '../components/shared/cDynamicTable.vue';
import Success from '../components/shared/Success.vue';
export default {
  components: { InfoTable, Success },
  data(){
    return{
      //general data
      dynamicFields: [{key: 'What', label: 'Description'}, {key: 'When', type: 'dateTimeString'}],
      loading: false,
      posting: false,
      submitted: false,
      //event data
      weeklyEvents: [],
      eventInfo: {
        whenDate: null,
        whenTime: null,
        what: null
      }
    }
  },
  created(){
    this.load();
  },
  methods: {
    load(){
      this.loading = true;
      this.posting = false;
      this.submitted = false;

      this.weeklyEvents = null;
      this.eventInfo = {
        whenDate: null,
        whenTime: null,
        what: null
      };

      this.getWeeklyEvents();
    },
    getWeeklyEvents(){
      _eventService.getThisWeekEvents(res => {
        this.weeklyEvents = res.data;
        this.loading = false;
      })
    },
    postEvent(){
      let dbEventDate = this.formatDateTime(this.eventInfo.whenTime, this.eventInfo.whenDate);
      if(dbEventDate == null ) return;
      this.posting = true;
      _eventService.postEvent({What: this.eventInfo.what, When: dbEventDate}, res => {
        console.log(res);
        this.posting = false;
        this.submitted = true;
        this.$bvModal.hide('addEventModal');
      })
    },
    formatDateTime(timeVal, dateVal){
      return _utility.formatDateTime(timeVal, dateVal);
    },
    formatDate(val){
      return _utility.formatDate(val);
    },    
    formatTime(val){
      return _utility.formatTime(val);
    }  
  }
}
</script>