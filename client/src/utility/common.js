import moment from 'moment';

export function formatDate(val){
        let newDate = new Date(val);
        return newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear()
      } 

export function formatTime(val){
        let newDate = new Date(val);
        var am = newDate.getHours() >= 12 ? false : true;
        var minutes = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes().toString() : newDate.getMinutes()
        let retString = (newDate.getHours() > 12 ? newDate.getHours() % 12 : newDate.getHours()) + ':' + minutes
        return retString + (am ? "AM" : "PM")
      }

      
export function formatDateTime(timeVal, dateVal){
        if(dateVal == null || timeVal == null) return null;
        let dateObj = new Date(dateVal);
        let hours = parseInt(timeVal.substr(0,2));
        let minutes = parseInt(timeVal.substr(3,5));
        return moment(new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1, 
        hours, minutes, 0, 0)).format();
      }