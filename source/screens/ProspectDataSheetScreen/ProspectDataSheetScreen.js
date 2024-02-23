import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ImageBackground, StatusBar, Animated } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './ProspectDataSheetStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DataSheetModal from '../../components/DataSheetModal';

const data = [
   { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },

]

const data2 = [
   { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
   { 'key': 2, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
   { 'key': 3, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },

]

export default function ProspectDataSheetScreen(props) {
   const { navigation } = props
   const dispatch = useDispatch()
   const tabWidth = constant.resW(49);
   const [active, setActive] = useState(1)
   const [animatedValue] = useState(new Animated.Value(1));
   const interpolateX = animatedValue.interpolate({
      inputRange: [0, 1, 2, 3, 4], // Adjust based on the number of tabs
      outputRange: [0, constant.resW(3), constant.resW(26), tabWidth, constant.resW(79)],
   });

   const [detailModal,setDetailModal] = useState(false)
   const renderItem = () => {
      return (
         <ImageBackground source={images.listCard} resizeMode='cover' imageStyle={{ borderRadius: 10 }} style={styles.listBgStyle}>
            <Pressable style={styles.driveListMainView}  >
               <Pressable style={styles.driveListTopView1} onPress={()=>setDetailModal(true)}>
                  <Text style={styles.text2}>OLM</Text>
                  <AntDesign name='close' style={styles.closeIcon} />
               </Pressable>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1, }}>
                     <FastImage source={require('../../assets/dummy/car.png')} resizeMode='contain' style={styles.carImage} />
                     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[{ flexDirection: 'row', justifyContent: 'center', flex: 1, paddingRight: constant.moderateScale(18) }]}>
                           <Text style={styles.listName3}>PID : </Text>
                           <Text style={[styles.listName3]}>12443</Text>
                        </View>
                        <View style={styles.cardHorLine} />
                     </View>
                  </View>
                  <View style={{ flex: 1.8 }}>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(2) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Prospect Name</Text>
                           <Text numberOfLines={2} style={[styles.listName3, { width: '90%' }]}>Mr.Amarjeet Singh</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Model</Text>
                           <Text style={styles.listName3}>D-MAX</Text>
                        </View>
                     </View>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Mobile No</Text>
                           <Text style={styles.listName3}>1234567898</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Closure Date</Text>
                           <Text style={styles.listName3}>22-Jan-2024</Text>
                        </View>
                     </View>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Rating</Text>
                           <Text style={styles.listName3}>HOT</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Color</Text>
                           <Text style={styles.listName3}>Brilliant Silver</Text>
                        </View>
                     </View>
                  </View>
               </View>
            </Pressable>
         </ImageBackground>
      )
   }

   const fn_TabClick = (type) => {
      setActive(type)
      Animated.timing(animatedValue, {
         toValue: type,
         duration: 800, // Adjust the duration of the animation
         useNativeDriver: false,
      }).start();
   }

   const actionRenderItem = ({ item, index }) => {
      return (
         <View style={{ backgroundColor: '#F9F9F9', borderWidth: 1, borderRadius: 10, borderColor: constant.whiteColor, marginHorizontal: constant.moderateScale(5), paddingBottom: constant.moderateScale(10), elevation: 1 }}>
            <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
               <View style={[styles.driveListDetailSubView, {}]}>
                  <Text style={styles.listText2}>Action</Text>
                  <Text style={styles.listText3}>Test Drive</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Due on </Text>
                  <Text style={styles.listText3}>14-Feb-2024</Text>
               </View>
            </View>

            <View style={styles.driveListDetailView}>
               <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>Stutus</Text>
                  <Text style={styles.listText3}>Active</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Completed on</Text>
                  <Text style={styles.listText3}>-</Text>
               </View>
            </View>

            <View style={styles.driveListDetailView}>
               <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>Remarks</Text>
                  <Text style={styles.listText3}>-</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Projected Closure Data</Text>
                  <Text style={styles.listText3}>Standard</Text>
               </View>
            </View>



         </View>
      )
   }

   const prospectInfoRenderItem=({item,index})=>{
      return(
         <View style={{ backgroundColor: '#F9F9F9', borderWidth: 1, borderRadius: 10, borderColor: constant.whiteColor, marginHorizontal: constant.moderateScale(5), paddingBottom: constant.moderateScale(10), elevation: 1 }}>
         <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
            <View style={[styles.driveListDetailSubView, {}]}>
               <Text style={styles.listText2}>Address(Regn)</Text>
               <Text style={styles.listText3}>-</Text>
            </View>
            <View style={styles.driveListDetailSubView2}>
               <Text style={styles.listText2}>State </Text>
               <Text style={styles.listText3}>Haryana</Text>
            </View>
         </View>

         <View style={styles.driveListDetailView}>
            <View style={styles.driveListDetailSubView}>
               <Text style={styles.listText2}>City</Text>
               <Text style={styles.listText3}>Faridabad</Text>
            </View>
            <View style={styles.driveListDetailSubView2}>
               <Text style={styles.listText2}>Sub-Zone</Text>
               <Text style={styles.listText3}>-</Text>
            </View>
         </View>

         <View style={styles.driveListDetailView}>
            <View style={styles.driveListDetailSubView}>
               <Text style={styles.listText2}>District</Text>
               <Text style={styles.listText3}>Faridabad</Text>
            </View>
            <View style={styles.driveListDetailSubView2}>
               <Text style={styles.listText2}>PIN</Text>
               <Text style={styles.listText3}>121001</Text>
            </View>
         </View>

         <View style={styles.driveListDetailView}>
            <View style={styles.driveListDetailSubView}>
               <Text style={styles.listText2}>Phone</Text>
               <Text style={styles.listText3}>9888888888</Text>
            </View>
            <View style={styles.driveListDetailSubView2}>
               <Text style={styles.listText2}>Fax</Text>
               <Text style={styles.listText3}>46364</Text>
            </View>
         </View>

      </View>
      )
   }

   const fn_Create = () => {
      props.navigation.navigate("EditProspectScreen")
   }

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#E1E1E1' }}>
         <StatusBar translucent={false} backgroundColor={constant.blackColor} />
         <CommonHeader title='Prospect Datasheet' mainExt={styles.drawerStyle} onBack={() => navigation.goBack()} />
         <View>
            <FlatList
               data={data}
               renderItem={renderItem}
               showsVerticalScrollIndicator={false}
               ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(5))}
               ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(7))}
               ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}
            />
         </View>

         <View style={styles.cal_SubView}>
            <View style={styles.tabMainView}>
               <View style={styles.tabSubView}>
                  <Pressable style={active === 1 ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(1)} >
                     <Text style={active === 1 ? styles.tabButtonText : styles.tabButtonText2}>Data Sheet</Text>
                  </Pressable>
                  <Pressable style={active === 2 ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(2)} >
                     <Text style={active === 2 ? styles.tabButtonText : styles.tabButtonText2}>Basic Info</Text>
                  </Pressable>
                  <Pressable style={active === 3 ? [styles.tabButton, { width: constant.resW(30), }] : [styles.tabButton2, { width: constant.resW(30) }]} onPress={() => fn_TabClick(3)} >
                     <Text style={active === 3 ? styles.tabButtonText : styles.tabButtonText2}>Prospect Info</Text>
                  </Pressable>
                  <Pressable style={active === 4 ? [styles.tabButton, {}] : [styles.tabButton2, {}]} onPress={() => fn_TabClick(4)} >
                     <Text style={active === 4 ? styles.tabButtonText : styles.tabButtonText2}>Actions</Text>
                  </Pressable>
               </View>
               <Animated.View
                  style={[styles.horixontalLine, {
                     transform: [{ translateX: interpolateX }],
                  }]}
               >
               </Animated.View>
            </View>
            {
               active === 1 &&
               <View style={{ flex: 1, paddingHorizontal: '1%',paddingBottom:constant.moderateScale(15)  }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(15)}]}>
                     <View style={[styles.driveListDetailSubView, {}]}>
                        <Text style={styles.listText2}>Prospect Stage</Text>
                        <Text style={styles.listText3}>Primary</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Zone</Text>
                        <Text style={styles.listText3}>North</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Usage</Text>
                        <Text style={styles.listText3}>Personal</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Compaings</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Importance</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>General Comments</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>First Action</Text>
                        <Text style={styles.listText3}>Call to Customer on{'\n'}13-Feb-2024</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Current Action</Text>
                        <Text style={styles.listText3}>Test Drive on 19-Feb-2024</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Sub Zone</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Reference</Text>
                        <Text style={styles.listText3}>Newspaper</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Finance Case</Text>
                        <Text style={styles.listText3}>No</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Project Closure</Text>
                        <Text style={styles.listText3}>30-Mar-2024</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Action Comment</Text>
                        <Text style={styles.listText3}>Organiser</Text>
                     </View>

                  </View>
                  </ScrollView>
               </View>
            }
            {
               active === 2 &&
               <View style={{ flex: 1, paddingHorizontal: '1%' }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(15) }]}>
                     <View style={[styles.driveListDetailSubView, {}]}>
                        <Text style={styles.listText2}>Opened on</Text>
                        <Text style={styles.listText3}>11-Feb-2024</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>OLM Lead</Text>
                        <Text style={styles.listText3}>NA</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Price Quote</Text>
                        <Text style={styles.listText3}>Quote not generated</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>source</Text>
                        <Text style={styles.listText3}>Walk-in</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Customer Refrence</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Finance Case</Text>
                        <Text style={styles.listText3}>No</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Financer</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Finance Location</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Corporate Case</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Deal Category</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Deal Type</Text>
                        <Text style={styles.listText3}>No</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Company</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Corporate Case Comment</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>General Comment</Text>
                        <Text style={styles.listText3}>-</Text>
                     </View>

                  </View>
                  </ScrollView>
               </View>
            }
            {active === 3 &&
               <View style={{ flex: 1 }}>
                   <FlatList
                     data={data2}
                     showsVerticalScrollIndicator={false}
                     renderItem={prospectInfoRenderItem}
                     ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(1))}
                     ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(7))}
                     ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}

                  />
            
               </View>
            }
            {active === 4 &&
               <View style={{ flex: 1 }}>
                  <FlatList
                     data={data2}
                     renderItem={actionRenderItem}
                     showsVerticalScrollIndicator={false}
                     ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(1))}
                     ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(7))}
                     ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}

                  />
               </View>
            }
         </View>
         <Button title='Create Proforma' click_Action={() => fn_Create()} buttonExt={styles.performaButton} />
     
      <DataSheetModal 
       isVisible={detailModal}
       onRequestClose={()=>setDetailModal(false)}
      
      />
      </SafeAreaView>
   )
}
