import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import DetailMovieInFolder from './DetailMovieInFolder';
// import Realm from 'realm';
const ItemFolderFshare = ({item}) => {
  // console.log(item);
  //   canFollow: 1
  // copied: 0
  // created: 1457941822
  // description: ""
  // directlink: 0
  // downloadcount: 234
  // follow: 0
  // hash_index: "c83c372c39758615a6f8ef5b11cb53749686a9c1"
  // id: "20856920"
  // lastdownload: 1583569373
  // linkcode: "FUNFVWOEOYIE"
  // mimetype: "application/octet-stream"
  // modified: 1526000949
  // name: "Ip.Man.3.2015.1080p.BluRay.x264.DTS-WiKi.mkv"
  // owner_id: 6221328
  // path: "/Phim lẻ mới nhất (Cập nhật liên tục)"
  // pid: 18722400
  // public: 0
  // pwd: 0
  // secure: 1
  // shared: 0
  // size: 10738790871
  // type: 1
  const [mystyle, setMystyle] = useState({
    backgroundColor: '#fff',
    color: '#fff',
  });
  function push(item) {
    
    Navigation.registerComponent(
      `DetailMovieInFolder`,
      () => DetailMovieInFolder,
    );
    Navigation.push('myStack', {
      component: {
        id: 'DetailMovieInFolder',
        name: 'DetailMovieInFolder',
        passProps: {
          item,
        },
        options: {
          statusBar: {
            visible: false,
          },
        },
      },
    });
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.item, {backgroundColor: mystyle.backgroundColor}]}
      onPress={() => push(item)}
      onFocus={() => {
        setMystyle({
          backgroundColor: '#eb6e34',
        });
      }}
      onBlur={() => {
        setMystyle({
          backgroundColor: '#fff',
        });
      }}>
      <View>
        <Text style={[styles.text, {backgroundColor: mystyle.backgroundColor}]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#222',
  },
  text: {
    fontSize: 30,
    backgroundColor: '#fff',
  },
});
export default ItemFolderFshare;
