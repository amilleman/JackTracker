<template>
  <div>
    <h4>Today's <slot></slot>:</h4>
    <b-table 
      striped 
      outlined 
      hover 
      selectable
      select-mode="single"
      @row-selected="rowClicked"
      :items="details" 
      :fields="fields">
      <template v-for="(field, idx) in dynamicFields" v-slot:[`cell(${field.key})`]="data">
        <div :key="idx">
          <div v-if="moment(data.value, moment.ISO_8601, true).isValid()">
            <div v-if="field.type == 'timeString'">
              {{ formatTime(data.value) }}
            </div>
            <div v-else-if="field.type == 'fromNow'">
              {{ data.value | fromNow }}
            </div>
          </div>
          <div v-else>
            {{ data.value }} 
          </div>
        </div>
      </template>
      <template #cell(Details)="data">
        <div v-if="data.value.length > 0">
          <i class="fas fa-check"></i>
        </div>
      </template> 
    </b-table>
  </div>
</template>

<script>
import * as _utility from '../../utility/common'
export default {  
  data: () => ({
    fields: [
      {
        key: 'Details'
      }
    ]
  }),
  created(){
    this.dynamicFields.forEach(element => {
      this.fields.push(element);
    });
  },
  props: {
    details: null,
    dynamicFields: null
  },
  methods:{
    rowClicked(item){
      console.log(item[0]._id);
      this.$router.push({name: this.$router.history.current.name + "-Details", params: {id: item[0]._id}}); 
      // this.$emit("rowSelected", item);
    },
    formatTime(val){ 
      return _utility.formatTime(val);
    }
  }
}
</script>