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
              <InfoTable :details="this.todaysFeeds" />
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
import InfoTable from '../components/shared/cTodayInfoTable.vue'
import DisplayTypes from '../components/shared/cDisplayTypes.vue'
import MilkCard from '../components/feeds/cFeedMilk.vue'
import SolidsCard from '../components/feeds/cFeedSolids.vue'
import Success from '../components/shared/Success.vue';
  export default {
    components: { InfoTable, Success, MilkCard, SolidsCard, DisplayTypes },
    data() {
      return {
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
          this.axios.all([
            this.axios.post(`http://localhost:3000/feeds`, {
              Type: this.postMilkObj.milkType,
              Amount: this.postMilkObj.milkAmount,
              Details: this.postMilkObj.milkDetails
            }), 
            this.axios.post(`http://localhost:3000/feeds`, {
              Type: this.postSolidsObj.solidsType,
              Amount: this.postSolidsObj.solidsAmount,
              Details: this.postSolidsObj.solidsDetails
            })
          ])
          .then(this.axios.spread((data1, data2) => {
            // output of req.
            console.log('data1', data1, 'data2', data2)
          }))
          .catch(err => console.log(err))
          .finally(() => {
            this.submitted = true;
            this.posting = false;
          });     
        }else if(postMilk){
          this.axios.post(`http://localhost:3000/feeds`, {
            Type: this.postMilkObj.milkType,
            Amount: this.postMilkObj.milkAmount,
            Details: this.postMilkObj.milkDetails
          })
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .finally(() => {
              this.submitted = true;
              this.posting = false;
            }); 
        }else{
          this.axios.post(`http://localhost:3000/feeds`, {
            Type: this.postSolidsObj.solidsType,
            Amount: this.postSolidsObj.solidsAmount,
            Details: this.postSolidsObj.solidsDetails
          })
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .finally(() => {
              this.submitted = true;
              this.posting = false;
            }); 
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
        this.axios.get('http://localhost:3000/feeds/today')
          .then(response => {
            console.log(response.data)
            this.todaysFeeds = response.data
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.loading = false
          });  
      },
      getSolidsTypes(){
        this.axios.get('http://localhost:3000/feedTypes')
          .then(response => {
            console.log(response.data)
            this.solidsTypes = response.data;
            // let emptyItem = {
            //   Type: ''
            // }
            // this.solidsTypes.splice(0, 0, emptyItem);
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.loading = false
          }); 
      },
      addFoodType(){
        this.axios.post('http://localhost:3000/feedTypes', {
          Type: this.typeToAdd
        })
          .then(response => {
            this.typeToAdd = null;
            console.log(response.data)
            this.getSolidsTypes();
          })
          .catch(err => console.log(err))
          .finally(() => {
          });         
      }
    }
  }
</script>