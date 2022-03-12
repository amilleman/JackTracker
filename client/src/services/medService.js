import * as _coreService from "./coreService"; 
import { medVit_url, medVit_types_url } from "../config";
require('dotenv').config()

export let getDailyDoses = (callback) => {
  _coreService.callGet(medVit_url + 'today', res => {
    return callback(res);
  });
}

export let getMedVitTypes = (callback) => {
  _coreService.callGet(medVit_types_url, res => {
    return callback(res);
  });
}

export let postMedVitType = (data, callback) => {
  let postParams = {
    Type: data.typeToAdd
  }
  _coreService.callPost(medVit_types_url, postParams, res => {
    return callback(res);
  });
}

export let getMedVitById = (id, callback) => {
  _coreService.callGet(medVit_url + id, res => {
    return callback(res);
  });
}

export let postMedVitDose = (data, callback) => {
  let postParams = {
    Type: data.Type,
    Amount: data.Amount,
    Details: data.Details == null ? "" : data.Details
  }
  _coreService.callPost(medVit_url, postParams, res => {
    return callback(res);
  });
}

