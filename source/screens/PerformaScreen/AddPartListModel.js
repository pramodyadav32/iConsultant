import React, { useState } from "react"
import { View, Modal, StyleSheet, Text, Pressable, TextInput, ScrollView, FlatList } from "react-native"
import * as constant from '../../utilities/constants'
import { useSelector } from "react-redux"
import AntDesign from 'react-native-vector-icons/AntDesign'
import SelectDropList from "../../components/SelectDropList"
import FastImage from "react-native-fast-image"
import images from "../../utilities/images"
import Button from "../../components/Button"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

let data=[
    {"key":1,},
    {"key":2,},
    {"key":3,},
    {"key":4,},

]
const AddPartListModel = (props) => {
    const { isVisible, onRequestClose } = props
    const [active,setActive] = useState(-1)


 const fn_Header=()=>{
    return(
        <View style={styles.listMainView}>
          <View style={styles.listSubView}>
           <Text style={styles.listText}>Tag</Text>
          </View>
          <View style={styles.listSubView2}>
           <Text style={styles.listText}>Part# / Description</Text>
          </View>
          <View style={styles.listSubView3}>
           <Text style={styles.listText}>Unit</Text>
          </View>
          <View style={styles.listSubView3}>
           <Text style={styles.listText}>Stock</Text>
          </View>
          <View style={styles.listSubView4}>
           <Text style={styles.listText}>MRP</Text>
          </View>
        </View>
    )
 }

    const renderItem=({item,index})=>{
      return(
        <View style={styles.listMainView}>
        <Pressable style={styles.listSubView} onPress={()=>fn_Select(item,index)}>
        <MaterialCommunityIcons name={active=== index ? 'radiobox-marked' : 'radiobox-blank'} style={active=== index ? styles.radioIcon2 :styles.radioIcon} />
        </Pressable>
        <View style={styles.listSubView2}>
         <Text style={styles.listText2}>5867018090 FLOOR MAT</Text>
        </View>
        <View style={styles.listSubView3}>
         <Text style={styles.listText2}>NOS</Text>
        </View>
        <View style={styles.listSubView3}>
         <Text style={styles.listText2}>20</Text>
        </View>
        <View style={styles.listSubView4}>
         <Text style={styles.listText2}>5500</Text>
        </View>
      </View>
      )
    }

    const fn_Select=(item,index)=>{
     setActive(index)
    }

    const fn_Save=()=>{
        onRequestClose()
    }

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={styles.modalMainView}>
                <View style={styles.modalSubView}>
                    <AntDesign name='close' style={styles.closeIcon} onPress={() => onRequestClose()} />
                    <View style={styles.innerView}>
                        <View style={styles.detailMainView}>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.inputView}>
                                <TextInput style={styles.input} onChangeText={(d) => null} selectionColor={'#3B3B3B'} placeholder='Search...' placeholderTextColor={'#3B3B3B'} ></TextInput>
                                <FastImage source={images.search} resizeMode='contain' style={styles.searchIcon} />
                            </View>
                            <FlatList 
                             data={data}
                             renderItem={renderItem}
                             ListHeaderComponent={()=>fn_Header()}
                            />
                        </ScrollView>

                        <View style={[styles.detailMainView,{justifyContent:'center',marginTop:constant.moderateScale(20)}]}>
           <Button title='Save'
            click_Action={()=>fn_Save()}
            buttonExt={styles.SaveButton}
           />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

AddPartListModel.defaultProps = {
    onRequestClose: function () { },
    isVisible: false,
}

export default AddPartListModel;

const styles = StyleSheet.create({
    modalMainView: {
        flex: 1,
        backgroundColor: "#00000090",
        alignItems: "center"
    },
    modalView: {
        backgroundColor: constant.whiteColor,
        width: constant.screenWidth * 8.8 / 10,
        height: constant.screenWidth * 8 / 10,
    },
    closeIcon: {
        fontSize: constant.moderateScale(20),
        color: constant.red,
        fontFamily: constant.typeRegular,
        marginLeft: constant.moderateScale(5),
        alignSelf: 'flex-end',
        paddingRight: constant.moderateScale(5),
        paddingLeft: constant.moderateScale(10),
        paddingBottom: constant.moderateScale(2),
        paddingTop: constant.moderateScale(10)
    },
    modalSubView: {
        width: constant.resW(96),
        maxHeight: constant.resH(60),
        marginTop: constant.moderateScale(70)
    },
    innerView: {
        backgroundColor: constant.whiteColor,
        // paddingVertical: constant.moderateScale(13),
        paddingHorizontal: constant.moderateScale(3),
        borderRadius: 15,
    },
    detailMainView: {
        paddingHorizontal: "0%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: constant.moderateScale(5),
        paddingHorizontal: constant.moderateScale(8)
    },
    inputView:{
        backgroundColor:constant.whiteColor,
        marginHorizontal:constant.moderateScale(10),
        borderRadius:constant.moderateScale(200),
        flexDirection:'row',
        alignItems:'center',
        marginTop:constant.moderateScale(2),
        height:constant.moderateScale(40),
        elevation:1
        // paddingBottom:constant.moderateScale(10)
        },
        input:{
            fontSize:constant.moderateScale(14),
            color:'#434343',
            fontFamily:constant.typeLight,
            flex:1,
            paddingHorizontal:constant.moderateScale(10)
        },
        searchIcon:{
            height:constant.moderateScale(50),
            width:constant.moderateScale(50),
            // marginRight:constant.moderateScale(2)
        },
        listMainView:{
         flexDirection:'row',
         paddingVertical:constant.moderateScale(7),
         paddingHorizontal:constant.moderateScale(5),
        },
        listSubView:{
         flex:0.3,
        //  alignItems:'center'
        },
        listSubView2:{
            flex:1
           },
           listSubView3:{
            flex:0.4,
            alignItems:'center'
           },
           listSubView4:{
            flex:0.4,
            alignItems:'center'
           },
        listText:{
            fontSize:constant.moderateScale(14),
            color:'#000',
            fontFamily:constant.typeRegular,
        },
        listText2:{
            fontSize:constant.moderateScale(13),
            color:'#000',
            fontFamily:constant.typeLight,
        },
        radioIcon:{
            fontSize:constant.moderateScale(20),
            color:'#BEBEBE',
        },
        radioIcon2:{
            fontSize:constant.moderateScale(20),
            color:constant.red,
        },
        SaveButton:{
            width:constant.moderateScale(180),
            marginBottom:constant.moderateScale(15),
            marginTop:constant.moderateScale(10)
        }



})