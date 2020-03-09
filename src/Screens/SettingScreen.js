import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
  CheckBox,
  ScrollView,
} from 'react-native';
import config from '../Config/config';
import {GetVersion} from './API/API';
import {useDispatch, useSelector} from 'react-redux';
import SendIntentAndroid from 'react-native-send-intent';
// import Store from './Components/Store';

const SettingScreen = () => {
  const dispatch = useDispatch();
  const refCode = useRef();
  const [textColor, setTextColor] = useState('black');
  const setting = useSelector(state => state.setting);
  const [tmpSetting, setSetting] = useState(setting);
  const [version, setVersion] = useState({
    name: null,
    build: null,
    version: null,
  });
  useEffect(() => {
    dispatch({type: 'GET_STORE'});
    GetVersion().then(data => {
      console.log(data);
      setVersion(data);
    });
    return () => {};
  }, []);
  useEffect(() => {
    console.log(tmpSetting);
    dispatch({type: 'SET_SETTING', payload: tmpSetting});
    return () => {};
  }, [tmpSetting]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>
      <View style={styles.checkBox}>
        <CheckBox
          value={tmpSetting.player === 'native' ? true : false}
          onChange={() =>
            setSetting(Object.assign({}, tmpSetting, {player: 'native'}))
          }
        />
        <Text style={styles.textCode}>Default player</Text>
      </View>
      <View style={styles.checkBox}>
        <CheckBox
          value={
            tmpSetting.player === 'com.mxtech.videoplayer.ad' ? true : false
          }
          onChange={() =>
            setSetting(
              Object.assign({}, tmpSetting, {
                player: 'com.mxtech.videoplayer.ad',
              }),
            )
          }
        />
        <Text style={styles.textCode}>MX Player Free</Text>
      </View>
      <View style={styles.checkBox}>
        <CheckBox
          value={
            tmpSetting.player === 'com.mxtech.videoplayer.pro' ? true : false
          }
          onChange={() =>
            setSetting(
              Object.assign({}, tmpSetting, {
                player: 'com.mxtech.videoplayer.pro',
              }),
            )
          }
        />
        <Text style={styles.textCode}>MX Player Pro</Text>
      </View>
      <View style={styles.checkBox}>
        <CheckBox
          value={tmpSetting.player === 'org.videolan.vlc' ? true : false}
          onChange={() =>
            setSetting(
              Object.assign({}, tmpSetting, {
                player: 'org.videolan.vlc',
              }),
            )
          }
        />
        <Text style={styles.textCode}>VLC player</Text>
      </View>
      <View style={styles.checkBox}>
        <CheckBox
          value={tmpSetting.player === 'org.xbmc.kodi' ? true : false}
          onChange={() =>
            setSetting(
              Object.assign({}, tmpSetting, {
                player: 'org.xbmc.kodi',
              }),
            )
          }
        />
        <Text style={styles.textCode}>Kodi</Text>
      </View>

      <View style={{borderTopWidth: 1, marginTop: 15}}>
        <Text style={styles.title}>Tài khoản Fshare</Text>
        <View style={styles.checkBox}>
          <CheckBox
            value={tmpSetting.useFshare === true ? true : false}
            onChange={() =>
              setSetting(
                Object.assign({}, tmpSetting, {
                  useFshare: !tmpSetting.useFshare,
                }),
              )
            }
          />
          <Text style={styles.textCode}>Sử dụng tài khoản</Text>
        </View>
        {/* <View> */}
        <TextInput
          placeholder="Username"
          style={styles.textCode}
          value={setting.username}
          onChangeText={t => {
            setSetting(
              Object.assign({}, tmpSetting, {
                username: t,
              }),
            );
          }}
        />
        <TextInput
          placeholder="Password"
          style={styles.textCode}
          value={setting.password}
          secureTextEntry
          onChangeText={t => {
            setSetting(
              Object.assign({}, tmpSetting, {
                password: t,
              }),
            );
          }}
        />
        {/* </View> */}
        <Text style={styles.textCode}>
          Phiên bản hiện tại của bạn là {config.ver}
        </Text>
        <Text style={[styles.textCode, {color: 'green'}]}>
          {version
            ? 'Phiên bản mới nhất là: ' + version.version
            : 'Đang lấy phiên bản từ server'}
        </Text>
        {version.build !== null && config.build < version.build ? (
          <TouchableOpacity
            onPress={() => {
              SendIntentAndroid.installRemoteApp(
                'https://nhacsong.pro/fphim.apk',
                'fphim.apk',
              ).then(installWasStarted => {});
              // Linking.openURL(
              //   'market://details?id=com.phimthuyetminh',
              // ).catch(err => console.log(err));
            }}>
            <Text style={styles.button}>Cập Nhật</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{paddingBottom: 50}}>
        <Text style={styles.textNganHang}>
          Ý kiến đóng góp vui lòng gửi về email admin@nhacsong.pro
        </Text>
        <Text style={styles.textNganHang}>
          Liên hệ zalo và điện thoại: 034.9501.403
        </Text>
        <Text style={[styles.donate]}>Ủng hộ phát triển</Text>
        <View style={styles.wrapper}>
          <Text style={styles.textCode}>
            Ngân Hàng Vietcombank chi nhánh Bến Tre
          </Text>
          <Text style={styles.textNganHang}>TK: 0241004082388</Text>
          <Text style={styles.textNganHang}>Tên: Pham Minh Kha</Text>
          <Text style={styles.textNganHang}>
            Nội dung: Ung ho ung dung f-phim
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e4bc54',
  },
  checkBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
  },
  textCode: {
    fontSize: 25,
    fontWeight: '600',
  },
  title: {
    fontSize: 55,
  },
  button: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    backgroundColor: 'green',
    color: 'white',
    width: 200,
    borderRadius: 5,
    // height: 30,
    padding: 10,
  },
  wrapper: {
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
  },
  textNganHang: {
    fontSize: 20,
    fontWeight: '600',
  },
  donate: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: 10,
  },
});
export default SettingScreen;
