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
import ThemLink from './Components/ThemLink';
import ViewMore from './Components/ViewMore';
import FolderFshare from './FolderFshare';
import LocalRealm from './Components/LocalRealm';
import {getHome} from './API/getHome';
import {GetVersion} from './API/API';
import BG from './../Assets/img/bg.webp';
import config from '../Config/config';
import RNExitApp from 'react-native-exit-app';
import database from '@react-native-firebase/database';
import Orientation from 'react-native-orientation-locker';
import TextTicker from 'react-native-text-ticker';
import SendIntentAndroid from 'react-native-send-intent';

const options = function() {
  return {};
};
console.disableYellowBox = true;
const HomeScreen = item => {
  Orientation.lockToLandscape();
  const [PhimMoiCapNhat, setPhimMoiCapNhat] = useState([]);
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  // const [tab, setTab] = useState('PhimLe');
  const tab = useSelector(state => state.setting.tab);
  const setting = useSelector(state => state.setting);
  function onRoleChange(snapshot) {
    // Set the role from the snapshot
    // console.log(snapshot);
    setRole(snapshot.val());

    // Connection established
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    dispatch({type: 'GET_SETTING'});
    const reft = database().ref('ANDROID');
    // reft.on('value', data => console.log('xx', data));
    // Subscribe to value change'
    // reft('ANDROID').on('value', onRoleChange);
    reft.on('value', onRoleChange);
    return () => reft.off('value', onRoleChange);
  }, []);
  useEffect(() => {
    // reft.on('value', data => console.log('xx', data));
    // Subscribe to value change'
    GetVersion().then(data => {
      if (data.build > config.build) {
        Alert.alert(
          'Thông báo',
          'Phiên bản của bạn đã củ vui lòng tải phiên bản mới! Sử dụng aptoide -> tìm fshare để cập nhật . Vui lòng gọi 034.9501.403 để được hướng dẫn.',
          [
            {
              text: 'Cập Nhật (Chờ 30s sau khi nhấn sẽ cập nhật)',
              onPress: () => {
                setPhimMoiCapNhat([]);
                SendIntentAndroid.installRemoteApp(
                  'https://nhacsong.pro/fphim.apk',
                  'fphim.apk',
                ).then(installWasStarted => {});
                // RNExitApp.exitApp();
              },
            },
          ],
          {cancelable: false},
        );
      }
    });
    getHome().then(listphim => {
      // console.log(listphim);
      setPhimMoiCapNhat(listphim);
    });
    return () => {
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
      case 'FolderFshare':
        return <FolderFshare />;
      case 'Yêu Thích':
        return <LocalRealm item={tab} />;
      case 'Đã Xem':
        return <LocalRealm item={tab} />;
      case 'Thêm Link':
        return <ThemLink />;
      default:
        return <ViewMore />;
    }
  }
  return (
    <ImageBackground style={styles.wrapper} source={BG}>
      <LeftNav />
      <View>
        <ScrollView style={{flexDirection: 'column'}}>{selectTab()}</ScrollView>
        <TextTicker
          style={styles.thongbao}
          duration={45000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={2000}>
          {role}
        </TextTicker>
      </View>
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
  thongbao: {
    color: '#eb6e34',
    fontSize: 25,
    backgroundColor: '#222',
  },
});
export default HomeScreen;
