import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Realm from 'realm';

const ItemMovieInFolder = ({item}) => {
  console.log('xxxx', item);
  const link = 'https://www.fshare.vn/file/' + item.linkcode;
  const [mystyle, setMystyle] = useState({
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#fff',
  });
  function XemPhim() {
    var tmp = {
      link: 'https://www.fshare.vn/file/' + item.linkcode,
      thumb: 'https://nhacsong.pro/public/phimthuyetminh/folder.png',
      title: item.name,
      year: 'FolderLink',
    };
    // Navigation.registerComponent(`Video`, () => VideoScreen);
    Realm.open({
      schema: [
        {
          name: 'DaXem',
          properties: {
            thumb: 'string',
            link: 'string',
            title: 'string',
            year: 'string',
          },
        },
      ],
    })
      .then(realm => {
        realm.write(() => {
          realm.create('DaXem', tmp);
        });
        // realm.write(() => {
        //   console.log('da them vao reaml');

        //   var t = realm.create('DaXem', item);

        // });
        realm.close();
      })
      .catch(err => console.log(err));
    // Navigation.registerComponent(`VideoScreen`, () => VideoScreen);
    // console.log(link);
    Navigation.push('myStack', {
      component: {
        id: 'VideoScreen',
        name: 'VideoScreen',
        passProps: {
          item: link,
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
      style={[styles.item, {backgroundColor: 'rgba(0, 0, 0, 0)'}]}
      onPress={() => XemPhim()}
      onFocus={() => {
        setMystyle({
          backgroundColor: '#eb6e34',
        });
      }}
      onBlur={() => {
        setMystyle({
          backgroundColor: 'rgba(0, 0, 0, 0)',
        });
      }}>
      <Text style={[styles.text, {backgroundColor: mystyle.backgroundColor}]}>
        {item.name}{' '}
      </Text>
      <Text style={[styles.text, {backgroundColor: mystyle.backgroundColor}]}>
        ({Math.round((item.size / 1024 / 1024 / 1024) * 100) / 100} GB)
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#222',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 25,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black',
    margin: 10,
  },
});
export default ItemMovieInFolder;
