import React from 'react'
import store from '../redux/configureStore';
import axios from 'react-native-axios'

const businessOwnerCode = 'ISUZU'
const brandCode = 'ISUZU'
const baseUrlLogin = 'https://orbitsys-demo-apimanagementservice.azure-api.net/OrbitsysIdentityApi/api/'

export const baseUrl = 'https://g2.orbitsys.com/OrbitsysLmsApi/api/'
export const imageUrl = 'http://3.111.186.19/media/category/'


export const APIName = {
  login: baseUrlLogin + 'Identity/AppAuthenticate',
  GetProspectsList : baseUrl + 'Prospect/GetProspectsList',
  GetDataCounts : baseUrl + 'Prospect/GetDataCounts',
  GetCustomerSearchResults : baseUrl + 'Prospect/GetCustomerSearchResults',
  ProspectTagList : baseUrl + 'Prospect/ProspectTagList',
  GetProspectMaster : baseUrl + 'Prospect/GetProspectMaster',
  GeneralMasterList : baseUrl + 'Prospect/GeneralMasterList',
  SaveNewProspect : baseUrl + 'Prospect/SaveNewProspect',
  GetProspectBasicInfo : baseUrl + 'Prospect/GetProspectBasicInfo',
  GetProspectDetails : baseUrl + 'Prospect/GetProspectDetails',
  GetVehicleMaster : baseUrl + 'Prospect/GetVehicleMaster',
  GetDemoVehicleList : baseUrl + 'Action/GetDemoVehicleList',
  GetActionSlots : baseUrl + 'Action/GetActionSlots',
  GetProspectBasicInfo: baseUrl + 'Prospect/GetProspectBasicInfo',
  GetActionsList : baseUrl + 'Action/GetActionsList',
  GetActionMaster : baseUrl +'Action/GetActionMaster',
  SaveProspectBasicInfo : baseUrl +'Prospect/SaveProspectBasicInfo',
  GetTestDriveFeedbackQuestions : baseUrl +'Action/GetTestDriveFeedbackQuestions',
  GetTestDriveFeedbackDetails : baseUrl + 'Action/GetTestDriveFeedbackDetails',
  

  GetProformaVehicleMasters : baseUrl + 'Proforma/GetProformaVehicleMasters',
  GetProformaTaxMasters : baseUrl + 'Proforma/GetProformaTaxMasters',
}

export const apiCall = (callback, url, method, param, data) => {
  console.log("base url of global  : "+url, method,JSON.stringify(param))
  var options = {
    url: url,
    method: 'POST',
    data: param,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'countryCode': 'IN',
      'BusinessOwnerCode': businessOwnerCode,
      'x-api-key': '6138571815404a49a8bc1339d2e16aca',
    }
  }
  console.log("header" + JSON.stringify(options))

  axios(options).then(function (response) {
    console.log(response.data);
    if (response.status === 200) {
      if (data != undefined)
        callback(response?.data)
      else
        callback(response?.data, data)
    }

  })
    .catch((error) => {
      console.log("error" + error);
      callback('', false)
    });
}

export const tokenApiCall = (callback, url, method, param, data) => {
  const state = store.getState();
  console.log("base url of global  : " + url + "  " + JSON.stringify(param))
  var options = {
    url: url,
    method: method,
    data: param,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'countryCode': 'IN',
      'BusinessOwnerCode': businessOwnerCode,
      'brandCode': brandCode,
      'Ocp-Apim-Subscription-Key': '6138571815404a49a8bc1339d2e16aca',
      'x-api-key': '6138571815404a49a8bc1339d2e16aca',
      "Authorization": state.AuthReducer.token
    },
  }
  // console.log("options"+JSON.stringify(options))
  axios(options).then(function (response) {
    console.log("aa" + JSON.stringify(response.data));
    if (response.status === 200) {
      if (data != undefined)
        callback(response?.data, data)
      else
        callback(response?.data)
    }

  })
    .catch((error) => {
      console.log("error" + error);
      callback('', false)
    });
}

export const apiFormDataCall = (callback, url, method, param, data) => {
  const state = store.getState();
  console.log("base url of global  : " + url + "  " + JSON.stringify(param)+ "  " + JSON.stringify(data))
  var options = {
    url: url,
    method: method,
    data: param,
    redirect: 'follow',
    headers: {
      'Accept': '*/*',
      // 'Content-Type': 'multipart/form-data; boundary=--------------------------304523290844997660831981',
      'countryCode': 'IN',
      'BusinessOwnerCode': 'ISUZU',
      'brandCode': 'ISUZU',
      'Ocp-Apim-Subscription-Key': '6138571815404a49a8bc1339d2e16aca',
      'x-api-key': '6138571815404a49a8bc1339d2e16aca',
      // "environmentType": "DEMO",
      // "Host": "g2.orbitsys.com",
      // "Content-Length": 141877,
      // 'Accept-Encoding': 'gzip, deflate, br',
      // "Connection": "keep-alive",
      // "Cache-Control": "no-cache",
      "Authorization": state.AuthReducer.token
    },
  }
  // console.log("options"+JSON.stringify(options))
  axios(options).then(function (response) {
    console.log("aa" + JSON.stringify(response.data));
    if (response.status === 200) {
      if (data != undefined)
        callback(response?.data, data)
      else
        callback(response?.data)
    }

  })
    .catch((error) => {
      console.log("error - " + JSON.stringify(error.response));
      callback('', false)
    });
}

