import React,{useState} from 'react';
import { SafeAreaView,ScrollView,View,Text,FlatList,StyleSheet,Pressable,Image, StatusBar } from 'react-native';
import * as constant from '../utilities/constants'
import * as common_fn from '../utilities/common_fn'
import images from '../utilities/images';
import { CommonActions } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import * as Async from '../utilities/AsyncStorage'


const data =[
  {'key':1,"title":'Home','source':images.homeIcon,'screenName':'HomeScreen'},
  {'key':2,"title":'Active Offers','source':images.activeOffer,'screenName':'ActiveOfferScreen'},
  {'key':3,"title":'Dashboard','source':images.DashBoard,'screenName':'HomeScreen'},
  {'key':4,"title":'Emi Calculator','source':images.emiCalculatorIcon,'screenName':'EmiCalculatorScreen'},
  {'key':5,"title":'Group5','source':images.notify,'screenName':'HomeScreen'},
  {'key':6,"title":'Group6','source':images.aboutIcon,'screenName':'HomeScreen'},
  
]

export default function CustomSidebarMenu(props) {
  console.log(JSON.stringify(props))
  const {navigation} = props.props
  const [active,setActive] = useState(0)
  const {outlets,token,userData} = useSelector(state=>state.AuthReducer)

  const fn_click=(item,index)=>{
    navigation.navigate(item.screenName)
    props.props.navigation.closeDrawer(); 
  
  }

  const fn_Logout=()=>{
        Async.set_UserData('false', userData,token,outlets)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name:'LoginScreen' }],
        }),
      );
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#00000099',}}>
      <StatusBar backgroundColor={'#000'} />
        <View  style={[styles.menuTopView]}>
          <Pressable onPress={()=>{props.props.navigation.closeDrawer()}}>
             <FastImage source={images.backIcon} style={styles.drawerTopImage} resizeMode='contain' />
          </Pressable>
          <View style={styles.menuSubView}>
            <View style={styles.menuSubView2}>
            <Text style={styles.text1}>Mr. Sultan Singh</Text>
           <Text style={styles.text2}>Sale Executive</Text>
            </View>
          </View>
         

            </View>
      <ScrollView style={{paddingTop:'3%'}}>
        <FlatList 
        data={data}
        ListHeaderComponent={()=>common_fn.listSpace(constant.resW(2))}
        renderItem={({item,index})=>{
          return(
            <Pressable onPress={()=>{fn_click(item,index)}} style={[styles.listView,]}>
            <View style={styles.listSubView}>
             <FastImage source={item.source} style={styles.listImage} resizeMode='contain' />
            <Text style={styles.listTitle}>{item.title}</Text>
            </View>
            </Pressable>
          )
        }}
        />
        
 </ScrollView>
 <Pressable onPress={()=>{null}} style={[styles.listView,]}>
            <View style={styles.listSubView}>
             <FastImage source={images.DashBoard} style={styles.listImage} resizeMode='contain' />
            <Text style={styles.listTitle}>Setting</Text>
            </View>
            </Pressable>
            <Pressable onPress={()=>{fn_Logout()}} style={[styles.listView,{marginBottom:constant.moderateScale(20)}]}>
            <View style={styles.listSubView}>
             <FastImage source={images.DashBoard} style={styles.listImage} resizeMode='contain' />
            <Text style={styles.listTitle}>Logout</Text>
            </View>
            </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
listView:{
  flexDirection:'row',
  alignItems:'center',
  marginLeft:constant.moderateScale(15),
  paddingVertical:'4%',
  marginRight:"3%",
},
text1:{
fontFamily:constant.typeRegular,
fontSize:constant.moderateScale(17),
color:constant.whiteColor,
// marginLeft:'8%',
// marginTop:'10%'

},
menuTopView:{
paddingTop:'5%',
backgroundColor:'#00000090',
flexDirection:'row',
paddingHorizontal:constant.moderateScale(15),
// alignItems:'center',
justifyContent:'space-between',
// marginBottom:constant.moderateScale(10)
},
menuSubView2:{

},
menuSubView:{
  flexDirection:'row',
 alignItems:'center',
 justifyContent:'flex-end',

},

text2:{
  fontFamily:constant.typeThin,
  fontSize:constant.moderateScale(13),
  color:constant.whiteColor,
  // marginLeft:'8%',
  marginBottom:'2%',
  alignSelf:'flex-end',
  },

  drawerTopImage:{
    height:constant.moderateScale(25),
    width:constant.moderateScale(25),
  },
  listSubView:{
  flexDirection:'row',
  alignItems:'center',
  flex:1,
  },
  listImage:{
    height:constant.moderateScale(20),
    width:constant.moderateScale(20),
  },
  listTitle:{
    fontFamily:constant.typeLight,
    fontSize:constant.moderateScale(16),
    color:'#ffffff',
    marginLeft:'5%',
  },
  leftIconStyle:{
    height:constant.resW(6),
    width:constant.resW(6),
  },
  bottomView:{
  backgroundColor:constant.baseColor,
  marginBottom:constant.resW(18),
  paddingVertical:"4%"
  },
  bottomViewText:{
    fontFamily:constant.typeBold,
    fontSize:constant.font15,
    color:constant.whiteColor,
    alignSelf:'center'
  },
})