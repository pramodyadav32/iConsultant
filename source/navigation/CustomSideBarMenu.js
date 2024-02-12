import React,{useState} from 'react';
import { SafeAreaView,ScrollView,View,Text,FlatList,StyleSheet,Pressable,Image } from 'react-native';
import * as constant from '../utilities/constants'
import * as common_fn from '../utilities/common_fn'
import images from '../utilities/images';
import { CommonActions } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';


const data =[
  {'key':1,"title":'About-us','source':images.about,'screenName':'HomeScreen'},
  {'key':2,"title":'Orders','source':images.order,'screenName':'HomeScreen'},
  {'key':3,"title":'Terms & Condition','source':images.term,'screenName':'HomeScreen'},
  {'key':4,"title":'Privacy Policy','source':images.policy,'screenName':'HomeScreen'},
  {'key':5,"title":'Support','source':images.support,'screenName':'HomeScreen'},
]

export default function CustomSidebarMenu(props) {
  console.log(JSON.stringify(props))
  const {navigation} = props.props
  const [active,setActive] = useState(0)

  const fn_click=(item,index)=>{
    props.props.navigation.closeDrawer(); 
    // if(item.key!=12){
    // setActive(index)
    // props.props.navigation.closeDrawer();
    // navigation.navigate(item.screenName)
    // }else{
    //   Async.set_UserData('false', userData,token,outlets)
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{ name:'SignInScreen' }],
    //     }),
    //   );
    // }
  }

  return (
    <SafeAreaView style={{flex:1}}>
        <View  style={[styles.menuTopView]}>
             <FastImage source={images.drawerImage} style={styles.drawerTopImage} resizeMode='contain' />
           <Text style={styles.text1}>Johan doe</Text>
           <Text style={styles.text2}>Location of user here</Text>

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
            <FastImage source={images.leftIcon} style={styles.leftIconStyle} resizeMode='contain' />
            </Pressable>
          )
        }}
        />
        
 </ScrollView>
     <View style={styles.bottomView}>
        <Text style={styles.bottomViewText}>Version 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
listView:{
  flexDirection:'row',
  alignItems:'center',
  marginLeft:'8%',
  paddingVertical:'4%',
  marginRight:"3%",
},
text1:{
fontFamily:constant.typeSemibold,
fontSize:constant.font16,
color:constant.blackColor,
marginLeft:'8%',
marginTop:'10%'

},
menuTopView:{
paddingTop:'18%',
backgroundColor:constant.baseLight,
},

text2:{
  fontFamily:constant.typeMedium,
  fontSize:constant.font15,
  color:constant.gray,
  marginLeft:'8%',
  marginBottom:'2%'
  },

  drawerTopImage:{
    height:constant.resW(19),
    width:'100%',
  },
  listSubView:{
  flexDirection:'row',
  alignItems:'center',
  flex:1,
  },
  listImage:{
    height:constant.resW(6),
    width:constant.resW(6),
  },
  listTitle:{
    fontFamily:constant.typeRegular,
    fontSize:constant.font15,
    color:'#717171',
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