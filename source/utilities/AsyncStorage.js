import AsyncStorage from '@react-native-async-storage/async-storage';

export const set_UserData=(status,data,token)=>{
  let p = new Promise(function(resolve, reject) 
  {
      AsyncStorage.multiSet([
       ['isLogin',status],
       ['userData',JSON.stringify(data)],
       ['token',JSON.stringify(token)],
      ])
        .then(resolve)
        .catch(reject); 
  });
  p.then((result)=>{
     console.log('result'+JSON.stringify(result))
  }).catch((error)=>{
    console.log("error"+error)
  })
}

