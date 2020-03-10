import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import BG from './../Assets/img/bgDetail.jpg';
import {getDetail, getServerAndChapter} from './API/getDetail';
import VideoScreen from './VideoScreen';
import ChapterItem from './Components/DetailScreenComponent/ChapterItem';
import Realm from 'realm';

const height = Dimensions.get('screen').height;
const DetailScreen = ({item}) => {
  const [phim, setPhim] = useState({infofilm: '', link: '', details: ''});
  const [listServerAndChapter, setListServerAndChapter] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('start detail');
    getDetail(item.link).then(data => {
      // setPhim(data.listLink);
      setListServerAndChapter(data.listLink);
      setLoading(false);
      // console.log('zzzz', data);
    });
    return () => {
      phim;
    };
  }, []);
  console.log(listServerAndChapter);
  function LuuYeuThich(tmp) {
    Realm.open({
      schema: [
        {
          name: 'YeuThich',
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
        var check = realm
          .objects('YeuThich')
          .filtered('link ="' + tmp.link + '"').length;
        if (check === 0)
          realm.write(() => {
            realm.create('YeuThich', tmp);
          });
        // realm.write(() => {
        //   console.log('da them vao reaml');

        //   var t = realm.create('DaXem', item);

        // });
        realm.close();
      })
      .catch(err => console.log(err));
  }
  function showListServerAndChapter() {
    var HTML = [];
    HTML = listServerAndChapter.map((value, index) => {
      return <ChapterItem item={value} key={index} />;
    });
    return HTML;
  }

  return (
    <ImageBackground style={styles.banner} source={BG} resizeMode={'stretch'}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Image source={{uri: item.thumb}} style={styles.thumb} />
          <View style={styles.detail}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.realtitle}</Text>
            <Text style={styles.fullChapter}>
              {item.chapter ? 'Tập ' + item.chapter : ''}
            </Text>

            <View>
              <Text style={styles.info}>{phim.infofilm}</Text>
            </View>
            <TouchableOpacity onPress={LuuYeuThich(item)}>
              <Text style={styles.button}>Lưu vào yêu thích</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginLeft: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
          {loading ? <ActivityIndicator size="large" color="#fff" /> : null}
          {listServerAndChapter.length > 0 ? showListServerAndChapter() : <></>}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  banner: {
    // justifyContent: 'space-around',
    padding: 20,
    flex: 1,
    flexGrow: 1,
  },
  detail: {
    left: 50,
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(106, 124, 113, 0.74)',
  },
  title: {
    fontWeight: '600',
    fontSize: 30,
    color: 'white',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  fullChapter: {
    fontSize: 20,
    color: 'white',
    // backgroundColor: '#f5ec42',
    alignSelf: 'flex-start',
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 5,
    marginRight: 5,
  },
  chapter: {
    fontSize: 20,
    color: 'black',
    backgroundColor: '#f5ec42',
    alignSelf: 'flex-start',
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 5,
    marginRight: 5,
  },
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
  thumb: {
    left: 25,
    width: 145,
    height: 214,
  },
  info: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'flex-start',
  },
  button: {
    color: 'white',
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 30,
    marginTop: 10,
  },
  server: {
    fontSize: 15,
    color: 'white',
  },
  wrapperListChapter: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
  },
});
export default DetailScreen;
