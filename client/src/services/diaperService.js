import * as _coreService from "./coreService"; 
import { diaper_url } from "../config";
require('dotenv').config()

export let getDailyDiapers = (callback) => {
  _coreService.callGet(diaper_url + 'today', res => {
    return callback(res);
  });
}

export let getDiaperById = (id, callback) => {
  _coreService.callGet(diaper_url + id, res => {
    return callback(res);
  });
}

export let postDiaper = (data, callback) => {
  let postParams = {
    Type: data.Type,
    Details: data.Details
  }
  _coreService.callPost(diaper_url, postParams, res => {
    return callback(res);
  });
}

