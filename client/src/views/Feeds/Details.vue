<template>
  <div class="p-2">
    <h5><u>Feed Details:</u></h5>
    <div v-if="!feedDetails">
      Loading...
    </div>
    <div v-else>
      <div>
        Type: {{ this.feedDetails.Type }}
      </div>
      <div>
        Amount: {{ this.feedDetails.Amount }}
      </div>
      <div>
        Details: {{ this.feedDetails.Details }}
      </div>
      <div>
        Date-Time: {{ convertTime(feedDetails.CreatedModifiedAt) }}
      </div>
    </div>
  </div>
</template>

<script>
import * as _feedService from '../../services/feedService';
import * as _utility from '../../utility/common'
export default {
  props: {
    id: null
  },
  data(){
    return {
      feedDetails: null
    }
  },
  created(){
    console.log("in created");
    _feedService.getFeedById(this.id, res => {
      this.feedDetails = res.data;
    })
  },
  methods:{
    convertTime(val){
      return _utility.formatDate(val) + " " + _utility.formatTime(val);
    }
  }
}
</script>