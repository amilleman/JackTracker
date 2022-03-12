import * as _coreService from "./coreService"; 
import { sleep_url } from "../config";
require('dotenv').config()

export let getDailySleeps = (callback) => {
  _coreService.callGet(sleep_url + 'today', res => {
    return callback(res);
  });
}

export let getCurrentSleep = (callback) => {
  _coreService.callGet(sleep_url + 'current', res => {
    return callback(res);
  });
}

export let getSleepById = (id, callback) => {
  _coreService.callGet(sleep_url + id, res => {
    return callback(res);
  });
}

export let patchSleep = (data, callback) => {
  let postParams = {
    EndedAt: data.EndedAt,
    Details: data.Details
  }
  _coreService.callPatch(sleep_url + data.id, postParams, res => {
    return callback(res);
  });
}

export let postSleep = (data, callback) => {
  let postParams = {
    StartedAt: data.StartedAt != null ? data.StartedAt : null,
    EndedAt: data.EndedAt != null ? data.EndedAt : null,
    Details: data.Details != null ? data.Details : null
  }
  _coreService.callPost(sleep_url, postParams, res => {
    return callback(res);
  });
}
