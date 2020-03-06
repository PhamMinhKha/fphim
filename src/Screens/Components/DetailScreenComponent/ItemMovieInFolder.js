import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
const ItemMovieInFolder = ({item}) => {
  console.log('xxxx', item);
  const link = 'https://www.fshare.vn/file/' + item.linkcode;
  const [mystyle, setMystyle] = useState({
    backgroundColor: 'rgba(21, 28, 13, 0.33)',
    color: '#fff',
  });
  function XemPhim() {
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
      style={[styles.item, {backgroundColor: 'rgba(21, 28, 13, 0.33)'}]}
      onPress={() => XemPhim()}
      onFocus={() => {
        setMystyle({
          backgroundColor: '#eb6e34',
        });
      }}
      onBlur={() => {
        setMystyle({
          backgroundColor: 'rgba(21, 28, 13, 0.33)',
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
  },
  text: {
    fontSize: 30,
    backgroundColor: 'rgba(21, 28, 13, 0.33)',
    color: '#fff',
  },
});
export default ItemMovieInFolder;
