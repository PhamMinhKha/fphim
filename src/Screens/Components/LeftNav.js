import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import ItemCate from './ItemCate';
import SettingScreen from '../SettingScreen';
import SearchScreen from '../SearchScreen';
import settingIcon from '../../Assets/img/setting.png';
import searchIcon from '../../Assets/img/search.png';
import {Navigation} from 'react-native-navigation';
const DATA = [
  {title: 'Trang Chủ', id: 'Home'},
  {
    title: 'Phim 4K',
    id: '4k',
    link: 'https://phim.didibkk.com/quality/4k/',
  },
  {
    title: 'Hành động',
    id: 'Hành động',
    link: 'https://phim.didibkk.com/genre/hanh-dong/',
  },
  {
    title: 'Khoa học viễn tưỡng',
    id: 'Khoa học viễn tưỡng',
    link: 'https://phim.didibkk.com/genre/khoa-hoc-vien-tuong/',
  },
  {
    title: 'Hài hước',
    id: 'Hài hước',
    link: 'https://phim.didibkk.com/genre/hai-huoc/',
  },
  {
    title: 'Hoạt hình',
    id: 'Hoạt hình',
    link: 'https://phim.didibkk.com/genre/hoat-hinh/',
  },
  {
    title: 'Folder Fshare',
    id: 'FolderFshare',
    link: 'https://www.fshare.vn/site/topfollow',
  },
  // {
  //   title: 'Phim Bộ',
  //   id: 'tv-shows',
  //   link: 'https://phim.didibkk.com/tv-shows',
  // },
];

const LeftNav = () => {
  const [myStyle, setMyStyle] = useState(0.9);
  const [myStyle2, setMyStyle2] = useState(0.9);
  function setting() {
    // Navigation.registerComponent(`SettingScreen`, () => SettingScreen);
    Navigation.push('myStack', {
      component: {
        id: 'SettingScreen',
        name: 'SettingScreen',
        options: {
          statusBar: {
            visible: false,
          },
        },
      },
    });
  }
  function search() {
    Navigation.registerComponent(`SearchScreen`, () => SearchScreen);
    Navigation.push('myStack', {
      component: {
        id: 'SearchScreen',
        name: 'SearchScreen',
        options: {
          statusBar: {
            visible: false,
          },
        },
      },
    });
  }
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={search}
        onFocus={() => setMyStyle(1)}
        onBlur={() => setMyStyle(0.9)}>
        <Image
          source={searchIcon}
          style={{width: 48, height: 48, transform: [{scale: myStyle}]}}
        />
      </TouchableOpacity>
      <FlatList
        data={DATA}
        renderItem={item => <ItemCate item={item} />}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={setting}
        onFocus={() => setMyStyle2(1)}
        onBlur={() => setMyStyle2(0.9)}>
        <Image
          source={settingIcon}
          style={{width: 48, height: 48, transform: [{scale: myStyle2}]}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    width: 200,
    // backgroundColor: 'pink',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
export default LeftNav;
