<template>
  <div class="p-2">
    <h5><u>Diaper Details:</u></h5>
    <div v-if="!diaperDetails">
      Loading...
    </div>
    <div v-else>
      <div>
        Type: {{ this.diaperDetails.Type }}
      </div>
      <div>
        Details: {{ this.diaperDetails.Details }}
      </div>
      <div>
        Date-Time: {{ convertTime(diaperDetails.CreatedModifiedAt) }}
      </div>
    </div>
  </div>
</template>

<script>
import * as _diaperService from '../../services/diaperService';
import * as _utility from '../../utility/common'
export default {
  props: {
    id: null
  },
  data(){
    return {
      diaperDetails: null
    }
  },
  created(){
    console.log("in created");
    _diaperService.getDiaperById(this.id, res => {
      this.diaperDetails = res.data;
    })
  },
  methods:{
    convertTime(val){
      return _utility.formatDate(val) + " " + _utility.formatTime(val);
    }
  }
}
</script>