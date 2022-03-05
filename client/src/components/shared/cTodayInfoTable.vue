<template>
  <div>
    <b-table 
      striped 
      outlined 
      hover 
      selectable
      select-mode="single"
      @row-selected="rowClicked"
      :items="details" 
      :fields="fields">
      <template #cell(Type)="data">
        <div class="text-nowrap">
          {{ data.value }}
        </div>
      </template> 
      <template #cell(Details)="data">
        <div v-if="data.value.length > 0">
          <i class="fas fa-check"></i>
        </div>
      </template> 
      <template #cell(CreatedModifiedAt)="data">
        <div class="text-nowrap">
          {{ data.value | fromNow }}
        </div>
      </template> 
    </b-table>
  </div>
</template>

<script>
export default {  
  data: () => ({
    fields: [
      {
        key: 'Type'
      },
      {
        key: 'Details'
      },
      {
        key: 'CreatedModifiedAt',
        label: 'When'
      }
    ]
  }),
  props: {
    details: []
  },
  methods:{
    rowClicked(item){
      this.$router.push({name: this.$router.history.current.name + "-Details", params: {id: item[0]._id}}); 
      // this.$emit("rowSelected", item);
    }
  }
}
</script>