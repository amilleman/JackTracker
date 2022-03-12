import * as _coreService from "./coreService"; 
import { feed_url, feed_types_url } from "../config";
require('dotenv').config()

export let getDailyFeeds = (callback) => {
  _coreService.callGet(feed_url + 'today', res => {
    return callback(res);
  });
}

export let getFeedTypes = (callback) => {
  _coreService.callGet(feed_types_url, res => {
    return callback(res);
  });
}

export let postFeedType = (data, callback) => {
  let postParams = {
    Type: data.typeToAdd
  }
  _coreService.callPost(feed_types_url, postParams, res => {
    return callback(res);
  });
}

export let getFeedById = (id, callback) => {
  _coreService.callGet(feed_url + id, res => {
    return callback(res);
  });
}

export let postFeed = (data, callback) => {
  let postParams = {
    Type: data.Type,
    Amount: data.Amount,
    Details: data.Details == null ? "" : data.Details
  }
  _coreService.callPost(feed_url, postParams, res => {
    return callback(res);
  });
}

