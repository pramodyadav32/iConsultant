import React from "react"
import { View, Modal, StyleSheet,Text, FlatList, Pressable} from "react-native"
import * as constant from '../utilities/constants'
import { useSelector } from "react-redux"
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as common from '../utilities/common_fn'

const CustumerSearch = (props) => {
    const {isVisible,onRequestClose,data,mobile_Data} = props

    const renderItem=({item,index})=>{
        return(
        <Pressable style={{backgroundColor:constant.whiteColor,elevation:1,marginBottom:constant.moderateScale(10),paddingLeft:constant.moderateScale(10),borderRadius:constant.moderateScale(10),paddingBottom:constant.moderateScale(15)}} onPress={()=>null}>
              {/* <View style={styles.cardHorLine} /> */}
              {/* <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(15) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Source</Text>
                           <Text numberOfLines={2} style={[styles.listName3, { width: '90%' }]}>0</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Opened</Text>
                           <Text style={styles.listName3}>-</Text>
                        </View>
                     </View> */}

                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(15) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Name</Text>
                           <Text numberOfLines={2} style={[styles.listName3, { width: '90%' }]}>{item.title} {item.firstName}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Sales Person</Text>
                           <Text style={styles.listName3}>{item?.salesmanName}</Text>
                        </View>
                     </View>

                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(15) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Prospect ID</Text>
                           <Text numberOfLines={2} style={[styles.listName3, { width: '90%' }]}>{item?.prospectId}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Status</Text>
                           <Text style={styles.listName3}>{item?.prospectStatus}</Text>
                        </View>
                     </View>
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
              <AntDesign name='close' style={styles.closeIcon} onPress={()=>onRequestClose()} />
              <View style={styles.innerView}>
              <Text style={styles.listName}>{"Prospect Info for this Mobile Number ("+mobile_Data+") are below: "}</Text>

               <FlatList 
                data={data}
                style={{maxHeight:constant.moderateScale(500)}}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
               />
              </View>
              </View>
            </View>
        </Modal>
    )
}

CustumerSearch.defaultProps = {
    onRequestClose: function () { },
    isVisible: false,
}

export default CustumerSearch;

const styles = StyleSheet.create({
    modalMainView: {
        flex: 1,
        backgroundColor: "#00000090",
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        backgroundColor: constant.whiteColor,
        width: constant.screenWidth * 8.8 / 10,
        height: constant.screenWidth * 8 / 10,
    },
    closeIcon:{
        fontSize:constant.moderateScale(20),
        color:constant.red,
        fontFamily:constant.typeRegular,
        marginLeft:constant.moderateScale(5),
        alignSelf:'flex-end',
        paddingRight:constant.moderateScale(5),
        paddingLeft:constant.moderateScale(10),
        paddingBottom:constant.moderateScale(2),
        paddingTop:constant.moderateScale(10)
      },
      modalSubView:{
     width:constant.resW(96)
      },
      innerView:{
      backgroundColor:'#F9F9F9',
      paddingVertical:constant.moderateScale(13),
      paddingHorizontal:constant.moderateScale(10),
      borderRadius:15,
      },
      cardHorLine:{
        height:2,
        width:constant.moderateScale(40),
        backgroundColor:constant.red,
        borderRadius:30,
        marginTop:constant.moderateScale(3),
        marginRight:constant.moderateScale(20)
        },
        listName:{
            fontSize:constant.moderateScale(14),
            color:'#424242',
            fontFamily:constant.typeMedium,
            marginBottom:constant.moderateScale(10)
        },
        driveListDetailView:{
            // flex:1,
            flexDirection:"row",
            
           },
           driveListDetailSubView:{
           flex:1,
           },
           driveListDetailSubView2:{
               flex:1,
               },
           listText2:{
               fontSize:constant.moderateScale(10),
               color:'#434343',
               fontFamily:constant.typeRegular,
           },
           listText3:{
               fontSize:constant.moderateScale(12),
               color:'#434343',
               fontFamily:constant.typeMedium,
           },
           listName3:{
            fontSize:constant.moderateScale(12),
            color:'#434343',
            fontFamily:constant.typeMedium,
        },
})