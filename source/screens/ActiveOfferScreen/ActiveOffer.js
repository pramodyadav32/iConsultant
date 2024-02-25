import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Animated, Pressable, Text, Image, ActivityIndicator, TextInput, StatusBar } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './ActiveOfferStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import ActiveOfferHeader from './ActiveOfferHeader';
import { CommonActions } from '@react-navigation/native';

const data = [
    { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 2, "title": 'Help Center', 'source': images.info, 'screenName': 'HomeScreen' },
    { 'key': 3, "title": 'Privacy Policy', 'source': images.lock, 'screenName': 'HomeScreen' },
    { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
    { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
    { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
    { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
    { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },

]

export default function ActiveOfferScreen(props) {
    const { navigation } = props
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

    const renderItem = ({item,index}) => {
        return (
            <View style={styles.listMainView}>
                <Text style={styles.listText}>ISUZU D-Max Style 1.8 MT (Diesel) February 14, 2024</Text>
                <Text style={styles.listText2}>Buy Now ISUZU D-Max and Get Coupons upto Rs. 11,999</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
            <StatusBar translucent={false} />
            <ActiveOfferHeader 
            title='Active Offer'
             mainExt={styles.drawerStyle}
              showDrawer={navigation} 
              rightClick={()=> props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'HomeScreen' }],
                }),
              )}
              />
            <View style={{ flex: 1, backgroundColor: '#F9F9F9', margin: constant.moderateScale(5), borderRadius: 10 }}>
                <View style={styles.headerMainView}>
                    <View style={styles.headerSubView}>
                        <Text style={styles.headerText}>Active Offers</Text>
                        <View style={styles.horLine} />
                    </View>
                    <Text style={styles.headerText2}>3</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(15))}
                    ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(10))}
                    ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}
                />
            </View>
        </SafeAreaView>
    )
}
