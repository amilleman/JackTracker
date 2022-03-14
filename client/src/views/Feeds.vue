<template>
  <b-container fluid>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="submitted">
      <Success>
        <template v-slot:header>
          <i class="fas fa-utensils"></i>
        </template>
          Feed Logged Successfully
        <div class="pt-2">
          <b-button @click="load()">Return to Feeds</b-button>
        </div>
      </Success>
    </div>
    <div v-else>

      <h1 class="pt-3 pb-3">Hungry Jack!</h1>

      <b-button-group class="pb-3" size="sm">
        <b-button variant="outline-dark" :pressed="addFeed" @click="setCard('addFeed')">Add Feed</b-button>
        <b-button variant="outline-dark" :pressed="editOptions" @click="setCard('editOptions')">Edit Feed Options</b-button>
      </b-button-group>
      
      <div v-if="addFeed">
        <b-row>
          <b-col md="8" xl="6" class="pb-3">
            <b-row>
              <b-col md="8" xl="6" class="pb-3">
                <MilkCard 
                  :milkObj="postMilkObj"
                />
              </b-col>
              <b-col md="8" xl="6" class="pb-3">
                <SolidsCard 
                  :solidsObj="postSolidsObj"
                  :solidsTypes="solidsTypes"
                />
              </b-col>  
            </b-row>
            <b-row>
              <b-col class="pt-2" xl="4">
                <b-button 
                  variant="success" 
                  :disabled=" (!postMilkObj.milkType && !postSolidsObj.solidsType ) || 
                  (postMilkObj.milkType && (postMilkObj.milkAmount == 0)) || 
                  (postSolidsObj.solidsType && (postSolidsObj.solidsAmount == 0)) || 
                  loading || 
                  posting "
                  @click="logFeed((postMilkObj.milkType && (postMilkObj.milkAmount != 0)), 
                  (postSolidsObj.solidsType && (postSolidsObj.solidsAmount != 0)))"
                >
                    Log this Feed
                </b-button>           
              </b-col>
            </b-row>
          </b-col>
          <b-col md="6" xl="4">
            <div v-if="todaysFeeds.length > 0">
              <InfoTable :details="this.todaysFeeds" :dynamicFields="this.dynamicFields">Feeds</InfoTable>
            </div>
          </b-col>
        </b-row>
      </div>
      <div v-if="editOptions">
        <b-row>
          <b-col md="6" xl="4">
            <b-row>
              <b-col md="6" class="pb-2"> 
                <b-form-input v-model="typeToAdd" id="_addFood" placeholder="Enter A Food"></b-form-input>
              </b-col>
              <b-col class="pb-2">
                <b-button variant="success" @click="addFoodType()" :disabled="!typeToAdd">Add Food Type</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="8" xl="4" class="pb-5">
            <DisplayTypes
              :types="solidsTypes"
            />
          </b-col>
        </b-row>
      </div>
      
    </div>
  </b-container>   
</template>

<script>
import InfoTable from '../components/shared/cDynamicTable.vue'
import DisplayTypes from '../components/shared/cDisplayTypes.vue'
import MilkCard from '../components/feeds/cFeedMilk.vue'
import SolidsCard from '../components/feeds/cFeedSolids.vue'
import Success from '../components/shared/Success.vue';
import * as _feedService from '../services/feedService';
  export default {
    components: { InfoTable, Success, MilkCard, SolidsCard, DisplayTypes },
    data() {
      return {
        dynamicFields: [
          {key: 'Type'},
          {key: 'CreatedModifiedAt', label: 'When', type: 'timeString'},
          {key: 'Details'}
        ],
        loading: false,
        submitted: false,
        posting: false,
        postMilkObj: {
          milkType: null,
          milkDetails: null,
          milkAmount: 0
        },
        postSolidsObj: {
          solidsType: null,
          solidsDetails: null,
          solidsAmount: 0
        },
        solidsTypes: null,
        todaysFeeds: [],
        addFeed: true,
        editOptions: false,
        typeToAdd: null
      }
    },
    created(){
      this.load();
      this.getSolidsTypes();
    },
    methods: {            
      logFeed(postMilk, postSolids) {
        this.posting = true;

        if(postMilk && postSolids){
          let solidsResolved = false;
          let milkResolved = false;
          
          _feedService.postFeed({
            Type: this.postMilkObj.milkType,
            Amount: this.postMilkObj.milkAmount,
            Details: this.postMilkObj.milkDetails
          }, res => {
            console.log(res);
            milkResolved = true;
            if(solidsResolved){
              this.submitted = true;
              this.posting = false;
            }
          })

          _feedService.postFeed({
            Type: this.postSolidsObj.solidsType,
            Amount: this.postSolidsObj.solidsAmount,
            Details: this.postSolidsObj.solidsDetails
          }, res => {
            console.log(res);
            solidsResolved = true;
            if(milkResolved){
              this.submitted = true;
              this.posting = false;
            }
          })

        }else if(postMilk){
          _feedService.postFeed({
            Type: this.postMilkObj.milkType,
            Amount: this.postMilkObj.milkAmount,
            Details: this.postMilkObj.milkDetails
          }, res => {
            console.log(res);
            this.submitted = true;
            this.posting = false;
          })
        }else{
          _feedService.postFeed({
            Type: this.postSolidsObj.solidsType,
            Amount: this.postSolidsObj.solidsAmount,
            Details: this.postSolidsObj.solidsDetails
          }, res => {
            console.log(res);
            this.submitted = true;
            this.posting = false;
          })
        }
      },
      setCard(val){
        this.addFeed = false;
        this.editOptions = false;
        switch(val) {
          case 'addFeed':
            this.addFeed = true;
            break;
          case 'editOptions':
            this.editOptions = true;
            break;
          default:
            break;
        }
      },
      load(){
        this.loading = true;
        this.submitted = false;
        this.posting = false;
        this.postMilkObj = {
          milkType: null,
          milkDetails: null,
          milkAmount: 0
        };
        this.postSolidsObj = {
          solidsType: null,
          solidsDetails: null,
          solidsAmount: 0
        }
        this.todaysFeeds = [];
        _feedService.getDailyFeeds(res => {
          this.todaysFeeds = res.data;
          this.loading = false;
        })
      },
      getSolidsTypes(){
        _feedService.getFeedTypes(res => {
          this.solidsTypes = res.data;
          this.loading = false
        })
      },
      addFoodType(){
        _feedService.postFeedType({typeToAdd: this.typeToAdd}, res => {
          console.log(res);
          this.getSolidsTypes();
        })  
      }
    }
  }
</script>