<template>
  <div class="px-3">
    <b-table striped sticky-header outlined bordered :items="types" :fields="fields">
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    types: null
  },
  data: () => ({
    fields: [
      {
        key: 'Type'
      }
    ]
  })
}
</script>