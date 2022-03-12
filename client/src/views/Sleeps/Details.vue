<template>
  <div class="p-2">
    <h5><u>Sleep Details:</u></h5>
    <div v-if="!sleepDetails">
      Loading...
    </div>
    <div v-else>
      <div v-if="this.sleepDetails.Details.length > 0">
        Details: {{ this.sleepDetails.Details }}
      </div>
      <div>
        Started: {{ convertTime(sleepDetails.StartedAt) }}
      </div>
      <div v-if="sleepDetails.EndedAt">
        Ended: {{ convertTime(sleepDetails.EndedAt) }}
      </div>
    </div>
  </div>
</template>

<script>
import * as _sleepService from '../../services/sleepService';
import * as _utility from '../../utility/common'
export default {
  props: {
    id: null
  },
  data(){
    return {
      sleepDetails: null
    }
  },
  created(){
    _sleepService.getSleepById(this.id, res => {
      this.sleepDetails = res.data;
    })
  },
  methods:{
    convertTime(val){
      return _utility.formatDate(val) + " " + _utility.formatTime(val);
    }
  }
}
</script>