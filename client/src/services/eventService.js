import * as _coreService from "./coreService"; 
import { event_url } from "../config";
require('dotenv').config()

export let getDailyEvents = (callback) => {
  _coreService.callGet(event_url + 'today', res => {
    return callback(res);
  });
}

export let getThisWeekEvents = (callback) => {
  _coreService.callGet(event_url + 'weekly', res => {
    return callback(res);
  });
}

export let getEventById = (id, callback) => {
  _coreService.callGet(event_url + id, res => {
    return callback(res);
  });
}

export let postEvent = (data, callback) => {
  let postParams = {
    What: data.What,
    When: data.When
  }
  _coreService.callPost(event_url, postParams, res => {
    return callback(res);
  });
}

