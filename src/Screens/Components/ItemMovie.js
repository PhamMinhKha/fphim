import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import VideoScreen from './../VideoScreen';
import DetailScreen from './../DetailScreen';

const ItemMovie = ({item}) => {
  // console.log(item);
  const [FocusStyle, SetFocusStyle] = useState(0.9);
  const [FocusStyle2, SetFocusStyle2] = useState('white');
  function push(item) {
    // Navigation.registerComponent(`Video`, () => VideoScreen);
    Navigation.registerComponent(`DetailScreen`, () => DetailScreen);
    Navigation.push('myStack', {
      component: {
        id: 'DetailScreen',
        name: 'DetailScreen',
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
      style={[styles.item, {transform: [{scale: FocusStyle}]}]}
      activeOpacity={1}
      onFocus={function() {
        SetFocusStyle(1);
      }}
      onBlur={function() {
        SetFocusStyle(0.9);
      }}
      onPress={function() {
        push(item);
      }}>
      <Image source={{uri: item.thumb}} style={{width: 118, height: 174}} />
      <Text style={styles.title} lineBreakMode={1}>
        {item.title}
      </Text>
      {item.year ? <Text style={styles.year}>{item.year}</Text> : null}
      {item.score ? <Text style={styles.score}>{item.score}</Text> : null}
      {item.chapter ? <Text style={styles.chapter}>{item.chapter}</Text> : null}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    // padding: 10,
    marginHorizontal: 5,
    width: 118,
    height: 174,
    position: 'relative',
    backgroundColor: 'red',
    marginBottom: 40,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  year: {
    position: 'absolute',
    backgroundColor: 'yellow',
    paddingLeft: 2,
    paddingRight: 2,
  },
  score: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'red',
    paddingLeft: 4,
    paddingRight: 2,
    color: 'white',
  },
  chapter: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
    paddingLeft: 4,
    paddingRight: 2,
    color: 'white',
  },
});

export default ItemMovie;
