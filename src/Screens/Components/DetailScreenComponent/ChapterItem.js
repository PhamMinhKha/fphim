import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

const ChapterItem = ({item}) => {
  //   console.log(item);
  const [myStyle, setMystyle] = useState({bg: '#f5ec42'});
  function XemPhim(link) {
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
      onFocus={() => setMystyle({bg: '#888888'})}
      onBlur={() => setMystyle({bg: '#f5ec42'})}
      onPress={() => XemPhim(item.link)}>
      <Text style={[styles.tap, {backgroundColor: myStyle.bg}]}>
        {item.name + ' (' + item.size +')'}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  tap: {
    // width: 50,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    backgroundColor: '#f5ec42',
    alignSelf: 'flex-start',
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
});
export default ChapterItem;
