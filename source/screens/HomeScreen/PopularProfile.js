import React, { useEffect, useState } from 'react';
import { FlatList, View,Pressable,Text} from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './HomeScreenStyle';
import { useDispatch, useSelector } from 'react-redux';
import * as common_fn from '../../utilities/common_fn'
import FastImage from 'react-native-fast-image';

export default function PopularProfile(props) {
  const { navigation,data } = props
  const dispatch = useDispatch()
 
  const renderItem=(item,index)=>{
    return(
      <Pressable onPress={()=>null} style={styles.orderD_BiderMainView}>
      <FastImage source={require('../../assets/dummy/profileImage.png')} style={styles.orderBiderImage} resizeMode='cover' />
      <View style={styles.listBiderSubView}>
         <Text style={styles.orderBiderTitle}>DNA lounge chair</Text>
         <Text style={styles.orderBiderDes}>Help you relax after work time </Text>
         <Text style={styles.orderBiderText}>$125</Text>     
      </View>
     </Pressable>
    )
    }

  return (
<View >
      <FlatList
       data={data}
       nestedScrollEnabled={true}
       horizontal={true}
       contentContainerStyle={{ flexDirection: 'row', paddingHorizontal: 16 }}
       showsHorizontalScrollIndicator={false}
       ListHeaderComponent={()=>common_fn.listVer_Space(constant.resW(0))}
       ListFooterComponent={()=>common_fn.listVer_Space(constant.resW(4))}
       ItemSeparatorComponent={()=>common_fn.listVer_Space(constant.resW(3))}
       renderItem={({item,index})=>renderItem(item,index)}
      />
     </View>  
  )
}
