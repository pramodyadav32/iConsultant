import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, Text, useWindowDimensions, TextInput, StatusBar } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './CalenderStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';

const data =[
  {'key':1,"title":'Your Profile','source':images.profile,'screenName':'HomeScreen'},
  {'key':2,"title":'Help Center','source':images.info,'screenName':'HomeScreen'},
  {'key':3,"title":'Privacy Policy','source':images.lock,'screenName':'HomeScreen'},
  {'key':4,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
]

export default function VisitCustScreen(props) {
  const { navigation } = props
  const dispatch = useDispatch()
  const layout = useWindowDimensions();
  const [active,setActive] = useState(1)
  const [count,setCount] = useState(0)

  const renderItem=()=>{
    return(
        <View style={styles.driveListMainView}>
            <View style={styles.driveListTopView}>
                <Text style={styles.driveText1}>Mr. Amarjeet Singh</Text>
                <FastImage source={images.visitCust} resizeMode='contain' style={styles.listDriveIcon} />
            </View>

            <View style={styles.driveListDetailView}>
             <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Prospect ID</Text>
                <Text style={styles.listText3}>12247</Text>
             </View>
             <View style={styles.driveListDetailSubView2}>
                <Text style={styles.listText2}>Next Action</Text>
                <Text style={styles.listText3}>Call to Custumer</Text>
             </View>
            </View>

            <View style={[styles.driveListDetailView,{marginTop:constant.moderateScale(8)}]}>
             <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Mobile No</Text>
                <Text style={styles.listText3}>1234567898</Text>
             </View>
             <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Closure</Text>
                <Text style={styles.listText3}>10-Feb-2024 4:00 PM</Text>
             </View>
            </View>
        </View>
    )
  }

  return (  
<View style={styles.test_MainView}>
    <FlatList
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={()=>common_fn.listSpace(constant.moderateScale(5))}
      ItemSeparatorComponent={()=>common_fn.listSpace(constant.moderateScale(10))}
      ListFooterComponent={()=>common_fn.listSpace(constant.moderateScale(30))}
    />
</View>
  )
}
