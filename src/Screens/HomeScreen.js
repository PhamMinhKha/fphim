import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LeftNav from './Components/LeftNav';
import CarouselCom from './Components/CarouselCom';
import ViewMore from './Components/ViewMore';
import {getHome} from './API/getHome';
import {GetVersion} from './API/API';
import BG from './../Assets/img/bg.jpg';
import config from '../Config/config';
import RNExitApp from 'react-native-exit-app';
import database from '@react-native-firebase/database';

const options = function() {
  return {};
};
console.disableYellowBox = true;
const HomeScreen = item => {
  const [PhimMoiCapNhat, setPhimMoiCapNhat] = useState([]);
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  // const [tab, setTab] = useState('PhimLe');
  const tab = useSelector(state => state.setting.tab);
  function onRoleChange(snapshot) {
    // Set the role from the snapshot
    setRole(snapshot.val());

    // Connection established
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    dispatch({type: 'GET_SETTING'});
    const reft = database().ref('ANDROID');
    // reft.on('value', data => console.log('xx', data));
    // Subscribe to value change'
    reft.on('value', onRoleChange);
    GetVersion().then(data => {
      if (data.build > config.build) {
        Alert.alert(
          'Thông báo',
          'Phiên bản của bạn đã củ vui lòng tải phiên bản mới! vui lòng gọi 034.9501.403 để được hướng dẫn.',
          [{text: 'Thoát', onPress: () => RNExitApp.exitApp()}],
          {cancelable: false},
        );
      }
    });
    getHome().then(listphim => {
      console.log(listphim);
      setPhimMoiCapNhat(listphim);
    });
    return () => {
      reft.off('value', onRoleChange);
      PhimMoiCapNhat;
    };
  }, []);
  function selectTab() {
    switch (tab) {
      case 'Home':
        return (
          <>
            <CarouselCom PhimMoiCapNhat={PhimMoiCapNhat} title="Phim Mới" />
          </>
        );
      default:
        return <ViewMore />;
    }
  }
  return (
    <ImageBackground style={styles.wrapper} source={BG}>
      <LeftNav />
      <Text>{role}</Text>
      <ScrollView style={{flexDirection: 'column'}}>{selectTab()}</ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // height: '100%',
    // width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'black',
  },
});
export default HomeScreen;
