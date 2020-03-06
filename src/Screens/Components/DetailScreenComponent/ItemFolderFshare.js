import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import DetailMovieInFolder from './DetailMovieInFolder';
const ItemFolderFshare = ({item}) => {
  const [mystyle, setMystyle] = useState({
    backgroundColor: '#fff',
    color: '#fff',
  });
  function push(item) {
    // Navigation.registerComponent(`Video`, () => VideoScreen);
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
