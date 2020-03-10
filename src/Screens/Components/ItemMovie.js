import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import VideoScreen from './../VideoScreen';
import DetailScreen from './../DetailScreen';
import Realm from 'realm';
const ItemMovie = ({item}) => {
  // console.log(item);
  // {
  //   thumb: "https://phim.didibkk.com/wp-content/uploads/2019/07/3FrGhwhyZdNtdZRXS6jQbFw9KYB-185x278.jpg",
  //   link: "https://phim.didibkk.com/movies/above-the-shadows/",
  //   title: "Above The Shadows",
  //   year: "2019"
  // }
  const [FocusStyle, SetFocusStyle] = useState(0.9);
  const [FocusStyle2, SetFocusStyle2] = useState('#222');
  function push(item) {
    // Create reference
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
        var check = realm.objects('DaXem').filtered('link ="' + item.link + '"')
          .length;
        if (check === 0)
          realm.write(() => {
            realm.create('DaXem', item);
          });
        // realm.write(() => {
        //   console.log('da them vao reaml');

        //   var t = realm.create('DaXem', item);

        // });
        realm.close();
      })
      .catch(err => console.log(err));
    // Navigation.registerComponent(`Video`, () => VideoScreen);
    if (item.year === 'FolderLink') {
      Navigation.push('myStack', {
        component: {
          id: 'VideoScreen',
          name: 'VideoScreen',
          passProps: {
            item: item.link,
          },
          options: {
            statusBar: {
              visible: false,
            },
          },
        },
      });
    } else {
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
  }

  return (
    <TouchableOpacity
      style={[styles.item, {transform: [{scale: FocusStyle}]}]}
      activeOpacity={1}
      onFocus={function() {
        SetFocusStyle(1);
        SetFocusStyle2('#eb6e34');
      }}
      onBlur={function() {
        SetFocusStyle(0.9);
        SetFocusStyle2('#222');
      }}
      onPress={function() {
        push(item);
      }}>
      <Image
        source={{uri: item.thumb}}
        style={{width: 118 * 1.2, height: 174 * 1.2}}
      />
      <Text
        style={[styles.title, {backgroundColor: FocusStyle2}]}
        lineBreakMode={1}>
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
    width: 118 * 1.2,
    height: 174 * 1.2,
    position: 'relative',
    backgroundColor: 'red',
    marginBottom: 40,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    shadowColor: '#fff',
    color: '#fff',
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
