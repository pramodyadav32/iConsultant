import AsyncStorage from '@react-native-async-storage/async-storage';

export const set_UserData=(status,data,token,outlet)=>{
  let p = new Promise(function(resolve, reject) 
  {
      AsyncStorage.multiSet([
       ['isLogin',status],
       ['userData',JSON.stringify(data)],
       ['token',JSON.stringify(token)],
       ['outlets',JSON.stringify(outlet)]

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


export const set_SelectBranch = async(selectedOutlet)=>{
  // try {
  //   await AsyncStorage.setItem('selectedOutlet', selectedOutlet)
  // } catch (e) {
  //   console.log("error async set_SelectBranch = "+error)
  //   alert('Failed to save the data to the storage')
  // }
  let p = new Promise(function(resolve, reject) 
  {
      AsyncStorage.setItem(
       'selectedOutlet',JSON.stringify(selectedOutlet)
      )
        .then(resolve)
        .catch(reject); 
  });
  p.then((result)=>{
     console.log('result'+JSON.stringify(result))
  }).catch((error)=>{
    console.log("error"+error)
  })
}
