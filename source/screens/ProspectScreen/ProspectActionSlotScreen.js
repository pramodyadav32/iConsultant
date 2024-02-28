import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable,StyleSheet,Text,Modal,ImageBackground} from 'react-native';
import * as constant from '../../utilities/constants'
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';


const data = [
    { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 2, "title": 'Help Center', 'source': images.info, 'screenName': 'HomeScreen' },
    { 'key': 3, "title": 'Privacy Policy', 'source': images.lock, 'screenName': 'HomeScreen' },
    { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
    { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 2, "title": 'Help Center', 'source': images.info, 'screenName': 'HomeScreen' },
    { 'key': 3, "title": 'Privacy Policy', 'source': images.lock, 'screenName': 'HomeScreen' },
    { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
]

const ProspectActionSlotScreen = (props) => {
    const {isVisible,onRequestClose,date,vehicleList,slotList} = props
    let isTablet = DeviceInfo.isTablet();
    const [active,setActive] = useState(-1)

 const fn_Click=(item,index)=>{
     setActive(index)
 }

    const renderItem = ({item,index}) => {
        return (
           <ImageBackground source={images.listImage2} imageStyle={{borderRadius:10}} resizeMode='contain' style={[styles.listImage,{}]} >
           <Pressable style={styles.listImageMainView} onPress={()=>fn_Click(item,index)}>
            <FastImage style={styles.listSubImage} resizeMode='contain' source={{uri:item?.modelUrl}} />
            <Text numberOfLines={1} style={styles.listText}>{item?.modelName}</Text>
            </Pressable>
           </ImageBackground>
        )
    }

    const listRender=()=>{
        return(
            <View style={styles.eventMainView}>
                <Text style={styles.eventText}>09:00 AM</Text>
                <Text style={styles.eventText2}>Test Drive [Mr. Amarjeet Singh]</Text>
            </View>
        )
    }

    const slotListRender=({item,index})=>{
        return(
            <Pressable style={styles.slotButton}>
                <Text style={styles.slotText}>{item?.slot}</Text>
            </Pressable>
        )

    }

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={styles.modalMainView}>
              <View style={styles.modalSubView}>
              <View style={styles.innerView}>
              <View style={[styles.detailMainView,{paddingTop:0,alignItems:'flex-start'}]}>
            <View style={[styles.driveListDetailSubView, {}]}>
                        <Text style={styles.listText3}>{moment(date.dateString).format("MMMM DD, YYYY")}</Text>
                        <View style={styles.horizontalLine} />
                    </View>
                    <AntDesign name='close' style={styles.closeIcon} onPress={()=>onRequestClose()} />

        </View>
<ScrollView showsVerticalScrollIndicator={false}>
 
<View>
                <FlatList
                    data={vehicleList}
                    horizontal
                    renderItem={renderItem}
                   showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => common_fn.listVer_Space(constant.moderateScale(3))}
                    ItemSeparatorComponent={() => common_fn.listVer_Space(constant.moderateScale(5))}
                    ListFooterComponent={() => common_fn.listVer_Space(constant.moderateScale(10))}
                />
                </View>
                <View style={styles.slotMainView}>
                <FlatList
                     data={slotList}
                     numColumns={isTablet ? 6 : 4}
                     renderItem={slotListRender}
                     ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(8))}
                     ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(10))}
                     ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}
                
                    />
                </View>
                <View style={styles.eventListMainView}>
                    <FlatList
                     data={data}
                     renderItem={listRender}
                     ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(8))}
                     ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(0))}
                     ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}
                
                    />
                </View>
        </ScrollView>
        <View style={[styles.detailMainView,{alignItems:'center',justifyContent:'center',marginTop:constant.moderateScale(20)}]}>
           <Button title='Done'
            buttonExt={styles.SaveButton}
           />
        </View>
              </View>
              </View>
            </View>
        </Modal>
    )
}

ProspectActionSlotScreen.defaultProps = {
    onRequestClose: function () { },
    isVisible: false,
}

export default ProspectActionSlotScreen;

const styles = StyleSheet.create({
    modalMainView: {
        flex: 1,
        backgroundColor: "#00000090",
        alignItems: "center"
    },
    modalView: {
        backgroundColor:'#F9F9F9',
        width: constant.screenWidth * 8.8 / 10,
        height: constant.screenWidth * 8 / 10,
    },
    closeIcon:{
        fontSize:constant.moderateScale(20),
        color:constant.red,
        fontFamily:constant.typeRegular,
        paddingRight:constant.moderateScale(5),
        paddingLeft:constant.moderateScale(10),
      },
      modalSubView:{
     width:constant.resW(96),
     maxHeight:constant.resH(70),
     marginTop:constant.moderateScale(70)
      },
      innerView:{
      backgroundColor:constant.whiteColor,
      paddingVertical:constant.moderateScale(13),
      paddingHorizontal:constant.moderateScale(3),
      borderRadius:15,
      },
      detailMainView:{
        paddingHorizontal:"0%",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:constant.moderateScale(5),
        paddingHorizontal:constant.moderateScale(8),
        },
       
        SaveButton:{
            width:constant.moderateScale(150)
        },
       
            listText3:{
                fontSize:constant.moderateScale(12),
                color:'#434343',
                fontFamily:constant.typeMedium,
            },
            horizontalLine:{
                height:constant.moderateScale(2),
                width:constant.moderateScale(48),
                backgroundColor:constant.red,
                borderRadius:constant.moderateScale(100),
                marginTop:constant.moderateScale(3)
              },
              listImage:{
                height:constant.moderateScale(100),
                width:constant.moderateScale(100),
                },
                listSubImage:{
                    height:constant.moderateScale(70),
                    width:constant.moderateScale(80),
                    marginLeft:constant.moderateScale(5)
                   
                },
                listImageMainView:{
                 flex:1,
                //  justifyContent:'space-between',
                //  backgroundColor:'red'
                },
                listText:{
                    fontFamily: constant.typeRegular,
                    fontSize: constant.moderateScale(8),
                    color:'#3B3B3B',
                    alignSelf:'center',
                },
                eventListMainView:{
                 backgroundColor:constant.whiteColor,
                 borderRadius:10,
                 elevation:1,
                 marginVertical:constant.moderateScale(6),
                 marginHorizontal:constant.moderateScale(5)
                },
                eventMainView:{
                borderBottomWidth:0.5,
                borderBottomColor:'#434343',
                marginHorizontal:constant.moderateScale(12),
                paddingTop:constant.moderateScale(5),
                paddingBottom:constant.moderateScale(5)
                },
                eventText:{
                    fontSize:constant.moderateScale(10),
                    color:'#434343',
                    fontFamily:constant.typeMedium,
                },
                eventText2:{
                    fontSize:constant.moderateScale(9),
                    color:'#434343',
                    fontFamily:constant.typeRegular,
                    marginTop:constant.moderateScale(2)
                },
                slotMainView:{
                    marginHorizontal:constant.moderateScale(0),

                },
                slotButton:{
                flex:1,
                alignItems:'center',
                justifyContent:'center',
                borderWidth:1,
                borderRadius:5,
                borderColor:'#ABABAB',
                paddingVertical:constant.moderateScale(8),
                marginHorizontal:constant.moderateScale(5)
                },
                slotText:{
                    fontSize:constant.moderateScale(10),
                    color:'#434343',
                    fontFamily:constant.typeLight,
                },
             
})