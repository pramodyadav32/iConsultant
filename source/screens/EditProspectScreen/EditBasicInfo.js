import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action, emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
// import styles from './EditProspectStyle'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName } from '../../utilities/apiCaller'
import * as common_fn from '../../utilities/common_fn'
import SelectDropList from '../../components/SelectDropList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function EditBasicInfo(props) {
    const { cardClick } = props
    const dispatch = useDispatch()
    const [checkStatus,setCheckStatus] = useState(false)


    return (
        <View style={{ flex: 1, paddingHorizontal: '1%', paddingBottom: constant.moderateScale(15) }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.listDetailView, { marginTop: constant.moderateScale(15) }]}>
                    <View style={[styles.listDetailSubView, {}]}>
                        <Text style={styles.text2}>Opened on</Text>
                        <Text style={styles.list3}>11-Feb-2024</Text>
                    </View>
                    <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.text2}>OLM Lead</Text>
                        <Text style={styles.list3}>NA</Text>
                    </View>
                </View>

                <View style={[styles.basicDetailView, { marginTop: constant.moderateScale(10) }]}>
                    <View style={[styles.basicDetailSubView,]}>
                        <Text style={styles.detailText}>Source</Text>
                    </View>
                    <View style={styles.basicDetailSubView2}>
                        <SelectDropList
                            list={[]}
                            title='Walk-in'
                            buttonExt={styles.dropList}
                            textExt={styles.dropListText}
                        />
                    </View>
                </View>

                <View style={[styles.basicDetailView, { marginTop: constant.moderateScale(10) }]}>
                    <View style={[styles.basicDetailSubView,]}>
                        {/* <Text style={styles.detailText}>Source</Text> */}
                    </View>
                    <View style={styles.basicDetailSubView2}>
                        <SelectDropList
                            list={[]}
                            title=' '
                            buttonExt={styles.dropList}
                            textExt={styles.dropListText}
                        />
                    </View>
                </View>

                <View style={[styles.basicDetailView, { marginTop: constant.moderateScale(10) }]}>
                    <View style={[styles.basicDetailSubView,]}>
                        <Text style={styles.detailText}>Corporate Case</Text>
                    </View>
                    <Pressable style={styles.basicDetailSubView2} onPress={()=>setCheckStatus(!checkStatus)}>
                        <FastImage resizeMode='contain' source={checkStatus ? images.checkIcon :images.unCheckIcon} style={styles.uncheckBoxStyle} />
                        {/* <MaterialCommunityIcons name='checkbox-blank-outline' style={styles.uncheckBoxStyle} /> */}
                    </Pressable>
                </View>

                <View style={[styles.basicDetailView, { marginTop: constant.moderateScale(10) }]}>
                    <View style={[styles.basicDetailSubView,]}>
                        <Text style={styles.detailText}>Deal Category</Text>
                    </View>
                    <View style={styles.basicDetailSubView2}>
                        <SelectDropList
                            list={[]}
                            title=' '
                            buttonExt={styles.dropList}
                            textExt={styles.dropListText}
                        />
                    </View>
                </View>


                <View style={[styles.basicDetailView, { marginTop: constant.moderateScale(10) }]}>
                    <View style={[styles.basicDetailSubView,]}>
                        <Text style={styles.detailText}>Deal Type</Text>
                    </View>
                    <View style={styles.basicDetailSubView2}>
                        <SelectDropList
                            list={[]}
                            title=' '
                            buttonExt={styles.dropList}
                            textExt={styles.dropListText}
                        />
                    </View>
                </View>


                <View style={[styles.basicDetailView, { marginTop: constant.moderateScale(10) }]}>
                    <View style={[styles.basicDetailSubView,]}>
                        <Text style={styles.detailText}>Company</Text>
                    </View>
                    <View style={styles.basicDetailSubView2}>
                        <SelectDropList
                            list={[]}
                            title=' '
                            buttonExt={styles.dropList}
                            textExt={styles.dropListText}
                        />
                    </View>
                </View>

                <View style={[styles.basicDetailView, { marginTop: constant.moderateScale(10) }]}>
                    <View style={[styles.basicDetailSubView,]}>
                        <Text style={styles.detailText}>Corporate Case Comment</Text>
                    </View>
                    <View style={styles.basicDetailSubView2}>
                        <TextInput style={styles.commentInput} ></TextInput>

                    </View>
                </View>

                <View style={[styles.basicDetailView, { marginTop: constant.moderateScale(10) }]}>
                    <View style={[styles.basicDetailSubView,]}>
                        <Text style={styles.detailText}>General Comment</Text>
                    </View>
                    <View style={styles.basicDetailSubView2}>
                        <TextInput style={styles.commentInput} ></TextInput>

                    </View>
                </View>


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    driveListDetailSubView2: {
        flex: 1,
        height: constant.moderateScale(30)
    },
  
    text2: {
        fontSize: constant.moderateScale(10),
        color: '#727272',
        fontFamily: constant.typeMedium,
        letterSpacing: 0.5
    },
    listDetailView: {
        flexDirection: "row",
        marginHorizontal: constant.moderateScale(0),
        marginTop: constant.moderateScale(20),
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        paddingVertical: constant.moderateScale(8),
        paddingHorizontal: constant.moderateScale(10),
        borderWidth: 1,
        borderColor: constant.whiteColor,
        elevation: 1,
    },
    listDetailSubView: {
        flex: 1,
    },
    list3: {
        fontSize: constant.moderateScale(12),
        color: '#000000',
        fontFamily: constant.typeRegular,
    },
   
    dropList: {
        borderWidth: 1,
        height: constant.moderateScale(40),
        width: '100%',
        borderRadius: 10,
        borderColor: '#ABABAB',
        backgroundColor: constant.whiteColor,
    },
    dropListText: {
        fontSize: constant.moderateScale(15),
        color: constant.textColor,
        fontFamily: constant.typeLight,
    },

    basicDetailView: {
        flexDirection: "row",
        marginHorizontal: constant.moderateScale(0),
        marginTop: constant.moderateScale(20),
        paddingHorizontal: constant.moderateScale(10),

    },
    basicDetailSubView: {
        flex: 0.5,
        justifyContent: "center"
    },
    basicDetailSubView2: {
        flex: 1,
        justifyContent: 'center',
    },
    commentInput: {
        borderWidth: 1,
        height: constant.moderateScale(90),
        flex: 1,
        borderRadius: 10,
        borderColor: '#ABABAB',
        backgroundColor: constant.whiteColor,
        color: constant.blackColor,
        fontFamily: constant.typeLight,
        paddingHorizontal: "3%",
        fontSize: constant.moderateScale(14),
        textAlignVertical: 'top'
    },
    uncheckBoxStyle: {
        height: constant.moderateScale(28),
        width:constant.moderateScale(28),
        color: '#ABABAB',
    },
    detailText: {
        fontSize: constant.moderateScale(13),
        color: '#424242',
        width: constant.moderateScale(115),
        fontFamily: constant.typeLight
    },
})