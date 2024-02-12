import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    drawerStyle:{
    borderBottomWidth:0
    },
    text1:{
        fontFamily:constant.typeSemibold,
        fontSize:constant.font22,
        color:constant.blackColor,
        marginLeft:'4%'
    },
    text2:{
        fontFamily:constant.typeMedium,
        fontSize:constant.font15,
        color:'#A5A7AC',
        marginLeft:'4%'
    },
    searchMainView:{
    backgroundColor:'#F4F4F5',
    marginHorizontal:'4%',
    borderWidth:1,
    borderRadius:10,
    borderColor:'#BBBBBB',
    flexDirection:'row',
    marginTop:constant.resW(7),
    marginBottom:constant.resW(5)
    },
    inputStyle:{
    paddingHorizontal:'3%',
    fontFamily:constant.typeMedium,
    fontSize:constant.font15,
    color:constant.blackColor,
    flex:1
    },
    searchImage:{
    height:constant.resW(5),
    width:constant.resW(5),
    },
    searchImageView:{
     backgroundColor:constant.baseColor,
     borderRadius:5,
     width:constant.resW(11),
     alignItems:'center',
     justifyContent:'center',
     marginVertical:'1%',
     height:constant.resW(11),
     marginRight:'1%'
    },
    text3:{
        fontFamily:constant.typeN_Bold,
        fontSize:constant.font20,
        color:constant.blackColor,
        marginLeft:'4%',
        marginTop:"3%"
    },
    custumButtinMainView:{
        borderWidth:1.5,
        borderRadius:10,
        borderColor:constant.blackColor,
        flexDirection:'row',
        marginHorizontal:'4%',
        backgroundColor:constant.baseColor,
        paddingVertical:'2%',
        paddingLeft:'2%',
        alignItems:'center',
        marginTop:'2%'
        
    },
    custumImage:{
        height:constant.resW(18),
        width:constant.resW(18),
    },
    custumButtinSubView:{
        paddingLeft:'2%'

    },
    text4:{
        fontFamily:constant.typeSemibold,
        fontSize:constant.font18,
        color:constant.blackColor,
        
    },
    text5:{
        fontFamily:constant.typeRegular,
        fontSize:constant.font14,
        color:constant.whiteColor,   
    },
    text6:{
        fontFamily:constant.typeN_Bold,
        fontSize:constant.font20,
        color:constant.blackColor,
    },
    profileMainViewTitle:{
        marginHorizontal:'4%',
        marginTop:'3%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    text7:{
        fontFamily:constant.typeRegular,
        fontSize:constant.font15,
        color:'#A5A7AC',
        paddingVertical:'2%',
    },
    orderD_BiderMainView:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:constant.gray,
        marginBottom:constant.resW(30),
        marginTop:constant.resW(3),
        width:constant.resW(85),
        // paddingVertical:'3.5%',
        // paddingHorizontal:'2.5%',
        borderRadius:15,
        height:constant.resW(25)
      },
      orderBiderImage:{
        width: constant.resW(21),
        height: constant.resW(21),
        borderRadius:10,
        marginLeft:constant.resW(2)
      },
      listBiderSubView:{
        flex:1,
        marginHorizontal:constant.resW(3),
        
        },
      orderBiderTitle:{
        fontFamily:constant.typeRegular,
        fontSize:constant.font16,
        color:constant.blackColor,
        // marginTop:'1%'
      },
      orderBiderDes:{
        fontFamily:constant.typeRegular,
        fontSize:constant.font13,
        color:'#8F9BB3',
        // marginVertical:"3.5%"
      },
    
      orderBiderText:{
        fontFamily:constant.typeSemibold,
        fontSize:constant.font18,
        color:constant.blue,
        includeFontPadding:false,
      },
      categoryMainView:{
        backgroundColor:'#CCFBF366',
        marginTop:"5%"
      },
      linearStyle:{
       height:constant.resW(25),
       width:constant.resW(44),
       borderRadius:10,
       paddingHorizontal:'3.5%',
       paddingVertical:'3.5%'
      },
      categoryImage:{
        width: constant.resW(10),
        height: constant.resW(10),
      },
      categoryText:{
        fontFamily:constant.typeN_Bold,
        fontSize:constant.font15,
        color:constant.whiteColor,
        marginTop:'2%'
      },
      listContainerStyle:{
      paddingHorizontal:'4%',
      },
})

export default styles;