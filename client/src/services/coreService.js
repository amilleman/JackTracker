import axios from 'axios'

let callGet = (url, callback) => {
  axios.get(url)
  .then(res => callback(res))
  .catch(err => callback(err))
  //set global loading to false
  //.finally()
}

let callPatch = (url, params, callback) => {
  console.log(url);
  console.log(JSON.stringify(params));
  axios.patch(url, JSON.stringify(params), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => callback(res))
  .catch(err => callback(err))
}

let callPost = (url, params, callback) => {
  axios.post(url, JSON.stringify(params), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => callback(res))
  .catch(err => callback(err))
}

export { callGet, callPost, callPatch };
