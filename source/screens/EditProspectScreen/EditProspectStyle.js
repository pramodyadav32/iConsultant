import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
  
        driveListMainView:{
            // backgroundColor:'#F9F9F9',
            marginHorizontal:'2%',
            // paddingHorizontal:'2%',
            borderRadius:10,
            marginTop:constant.moderateScale(2),
            marginBottom:constant.moderateScale(20),
            flex:1,
            // backgroundColor:'red'
        
            },
            driveListTopView1:{
                flex:1,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                position:'absolute',
                top:-5,
                right:0,
                borderWidth:1,
                borderColor:'#727272',
                borderRadius:4,
                paddingHorizontal:constant.moderateScale(2),
                paddingVertical:constant.moderateScale(2)
        
            },
            closeIcon:{
              fontSize:constant.moderateScale(12),
              color:constant.red,
              fontFamily:constant.typeRegular,
              marginLeft:constant.moderateScale(5)
            },
            text2:{
              fontSize:constant.moderateScale(10),
              color:'#727272',
              fontFamily:constant.typeMedium,
              letterSpacing:0.5
            },
            driveText1:{
                fontSize:constant.moderateScale(18),
                color:'#2E2E2E',
                fontFamily:constant.typeRegular,
            },
            listDriveIcon2:{
                height:constant.moderateScale(20),
                width:constant.moderateScale(20),
                marginRight:constant.moderateScale(10),
            },
            driveListDetailView:{
             flex:1,
            // width:'100%',
             flexDirection:"row",
            //  alignItems:'center',
            //  justifyContent:'space-between',
            },
            driveListDetailSubView:{
              // width:'38%',
              // width:constant.resW(25)
            // alignItems:'center',
            // flex:1,
            height:constant.moderateScale(30),
            width:'50%'
            },
            driveListDetailSubView2:{
              // width:constant.resW(31),
              
              
                flex:1,
                height:constant.moderateScale(30)
                },
            listText2:{
                fontSize:constant.moderateScale(8),
                color:'#434343',
                fontFamily:constant.typeRegular,
            },
            listText4:{
              fontSize:constant.moderateScale(10),
              color:'#434343',
              fontFamily:constant.typeRegular,
          },
          listName3:{
            fontSize:constant.moderateScale(12),
            color:'#434343',
            fontFamily:constant.typeMedium,
        },
            fuelText2:{
              fontSize:constant.moderateScale(12),
              color:'#434343',
              fontFamily:constant.typeRegular,
            },
            listText3:{
                fontSize:constant.moderateScale(9.5),
                color:'#434343',
                fontFamily:constant.typeMedium,
            },
            ModelText3:{
              fontSize:constant.moderateScale(12),
              color:'#434343',
              fontFamily:constant.typeMedium,
            },
            listImageStyle:{
              // height:'100%',
              // width:'100%',
              position:'absolute',
              top:0,
              bottom:0,
              left:0,
              right:0,
              // flex:1,
              height:undefined,
              width:constant.resW(100)
              // backgroundColor:'transparent'
            },
            listBgStyle:{
            //   flex:1,
              height:undefined,
              width:undefined,
              // flexDirection:'row'
              marginHorizontal:constant.moderateScale(8),
              paddingTop:constant.moderateScale(9),
            },
            listCardMainView:{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            // justifyContent:'space-between'
            },
            carImage:{
              height:constant.moderateScale(110),
              width:constant.moderateScale(120),
            },
            horizontalLine:{
              height:constant.moderateScale(2),
              width:constant.moderateScale(70),
              backgroundColor:constant.red,
              borderRadius:constant.moderateScale(100),
              marginTop:constant.moderateScale(4)
            },

            cardHorLine:{
                height:constant.moderateScale(2),
                width:constant.moderateScale(30),
                backgroundColor:constant.red,
                borderRadius:constant.moderateScale(100),
                marginTop:constant.moderateScale(3),
                marginRight:constant.moderateScale(20)
            },

            //tabList
            cal_SubView:{
              flex:1,
              // backgroundColor:constant.whiteColor,
              marginHorizontal:constant.moderateScale(6),
              // borderRadius:8,
              // marginBottom:constant.moderateScale(6),
             },
             tabMainView:{
                 paddingBottom:'1%',
                 height:constant.moderateScale(50),
                 backgroundColor:constant.whiteColor,
                 borderTopLeftRadius:10,
                 borderTopRightRadius:10

                 },
                 tabSubView:{
                  flex:1,
                  borderBottomWidth:0.5,
                  borderBottomColor:'#FE0F1780',
                  flexDirection:'row',
                  justifyContent:'space-between',
                  marginHorizontal:'3%',
                  paddingTop:constant.moderateScale(7),
                 },
                 tabButton:{
                  flex:1,
                //  width:constant.resW(20),
                 justifyContent:'center'
                 },
                 tabButtonText:{
                     fontSize:constant.moderateScale(15),
                     color:constant.red,
                     fontFamily:constant.typeMedium,
                 marginTop:constant.moderateScale(4),
             
                 },
                 tabButton2:{
                     flex:1,
                     justifyContent:'center'  
                 },
                 tabButtonText2:{
                 fontSize:constant.moderateScale(15),
                 color:constant.textColor,
                 fontFamily:constant.typeLight,
                 marginTop:constant.moderateScale(4),
             
                 },
                 horixontalLine:{
                     height:constant.moderateScale(2.5),
                     width:constant.moderateScale(45),
                     backgroundColor:'red',
                     position:'absolute',
                     bottom:-constant.moderateScale(1),
                     borderRadius:constant.resW(20)
                 },
                 performaButton: {
                    marginBottom: constant.moderateScale(30),
                    marginTop: constant.moderateScale(10),
                    marginHorizontal: constant.moderateScale(70),
                    paddingVertical: constant.moderateScale(10),
                    borderWidth: 1,
                    borderColor: constant.whiteColor,
                },
            
                detailText: {
                    fontSize: constant.moderateScale(13),
                    color: '#424242',
                    width: constant.moderateScale(115),
                    fontFamily: constant.typeLight
                },
                
  
})

export default styles;