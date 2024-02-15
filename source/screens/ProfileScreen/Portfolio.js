import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ActivityIndicator, Platform } from 'react-native';
// import * as apiConfig from '../../utilities/apiCaller'
import * as constant from '../../utilities/constants'
import styles from './ProfileStyle';
import { useDispatch, useSelector } from 'react-redux';
import DrawerHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'

const data =[
    {'key':1,"title":'Your Profile','source':images.profile,'screenName':'HomeScreen'},
    {'key':2,"title":'Help Center','source':images.info,'screenName':'HomeScreen'},
    {'key':3,"title":'Privacy Policy','source':images.lock,'screenName':'HomeScreen'},
    {'key':4,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
    {'key':5,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
    {'key':6,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
    {'key':7,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
    {'key':8,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
    {'key':9,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
    {'key':10,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
  
  ]

export default function Portfolio(props) {
  const { navigation } = props
  const dispatch = useDispatch()
 
  const renderTabView = (post) => {
    let tab = [];
    for (let i = 0; i <= parseInt((post.length - 1) / 6); i++) {
      tab.push(
        <View
          style={{
            marginVertical: constant.resW(0),
          }}
        >
          <View style={styles.tabViewMain}>
            {post[i * 6] !== undefined && ImageRender1(post[i * 6], i * 6)}
            {post[i * 6 + 1] !== undefined &&
              ImageRender1(post[i * 6 + 1], i * 6 + 1)}
            {post[i * 6 + 2] !== undefined &&
              ImageRender1(post[i * 6 + 2], i * 6 + 2)}
          </View>
          {post[i * 6 + 5] !== undefined ? (
            <View style={styles.tabViewMain}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                {ImageRender1(post[i * 6 + 3], i * 6 + 3)}
                {ImageRender1(post[i * 6 + 4], i * 6 + 4)}
              </View>
              {ImagePart1(post[i * 6 + 5], i * 6 + 5)}
            </View>
          ) : (
            <View style={styles.tabViewMain}>
              {post[i * 6 + 3] !== undefined &&
                ImageRender1(post[i * 6 + 3], i * 6 + 3)}
              {post[i * 6 + 4] !== undefined &&
                ImageRender1(post[i * 6 + 4], i * 6 + 4)}
              {post[i * 6 + 5] !== undefined &&
                ImageRender1(post[i * 6 + 5], i * 6 + 5)}
            </View>
          )}
        </View>
      );
    }
    return tab;
  };

  const ImagePart1 = (item, index) => {
    return Platform.OS === "ios" ? (
      <Pressable style={styles.portfolioButton}>
      <FastImage source={require("../../assets/dummy/chairImage.png")} style={styles.part0Else} />
    </Pressable>
    ) : (
      <Pressable style={styles.portfolioButton2}>
        <FastImage source={require("../../assets/dummy/chairImage.png")} style={styles.part0Else} />
      </Pressable>
    );
  };

  const ImageRender1 = (item, index) => {
    if (item > 0) {
      return Platform.OS === "ios" ? (
        <Pressable>
        <FastImage source={require("../../assets/dummy/chairImage.png")} style={styles.part1Image_} />
      </Pressable>
      ) : (
        <Pressable>
          <FastImage source={require("../../assets/dummy/chairImage.png")} style={styles.part1Image_} />
        </Pressable>
      );
    } else {
      return (
        <Pressable style={styles.portfolioButton}>
          <FastImage source={require("../../assets/dummy/babyImage.png")} style={styles.part1ElseImage} />
        </Pressable>
      );
    }
  };
  return (
 
    <ScrollView
    showsVerticalScrollIndicator={false}
    // onScrollEndDrag={(event) => onScroll(event)}
  >
    {renderTabView(data)}
  </ScrollView>
        
  )
}
