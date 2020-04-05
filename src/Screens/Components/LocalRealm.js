import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ItemMovie from './ItemMovie';
import {useSelector} from 'react-redux';
var width = Dimensions.get('screen').width;
var height = Dimensions.get('screen').height;
var checkNgang = width > height ? true : false;
import {getViewMore} from '../API/getViewMore';
import {FlatGrid} from 'react-native-super-grid';
import Realm from 'realm';

const LocalRealm = ({item}) => {
  // console.log('aaaa', item);
  const link = useSelector(state => state.setting.link);
  const tab = useSelector(state => state.setting.tab);
  const [ThuVien, setThuVien] = useState('DaXem');
  const [listPhim, setlistPhim] = useState([]);
  const [page, setPage] = useState(1);
  const [myButton, setMyButton] = useState(0.85);
  const [timeout, settimeout] = useState(0);
  const [loading, setLoading] = useState(true);
  console.log(item);
  useEffect(() => {
    // Query

    // setThuVien('DaXem');
    if (item === 'Đã Xem') {
      setThuVien('DaXem');
    } else {
      setThuVien('YeuThich');
    }
    Realm.open({
      schema: [
        {
          name: ThuVien,
          properties: {
            thumb: 'string',
            link: 'string',
            title: 'string',
            year: 'string',
          },
        },
      ],
    }).then(realm => {
      var t = realm.objects(ThuVien);
      let data = [];
      t.map((value, index) => {
        let tmp = {
          link: value.link,
          thumb: value.thumb,
          title: value.title,
          year: value.year,
        };
        data.push(tmp);
      });
      setlistPhim(data);
      setLoading(false);
      realm.close();
      // return t;
      // realm.write(() => {
      //   var t = realm.create('DaXem', item);
      // });
    });
    // let realm = new Realm();
    // let r = realm.objects('DaXem');
    // console.log(typeof r);
    // // if (typeof r !== 'object') {
    //   setlistPhim(r);
    //   setLoading(false);
    // }
    // r.map((value, index)=>{
    //   console.log(value);
    // })
    // console.log('kk', r.thumb);
    return () => {
      setlistPhim([]);
    };
  }, [tab]);
  // useEffect(() => {
  //   getViewMore(link, page).then(data => {
  //     var t = listPhim.concat(data);
  //     setlistPhim(t);
  //     setLoading(false);
  //   });
  //   return () => {
  //     page;
  //   };
  // }, [page]);
  function changePage() {
    setLoading(true);
    if (timeout) clearTimeout(timeout);
    settimeout(
      setTimeout(function() {
        setPage(page + 1);
      }, 2000),
    );
  }
  console.log('ccc', listPhim);
  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>{tab}</Text>
      {/* <ScrollView onScroll={t => console.log(t)}>
        <View
          style={styles.car}
          onScroll={t => console.log(t)}
          onResponderEnd={t => console.log(t)}>
          {listPhim.map((value, index) => {
            return <ItemMovie item={value} key={index} />;
          })}
        </View>
      </ScrollView> */}
      <FlatGrid
        itemDimension={130}
        items={listPhim}
        renderItem={({item}) => <ItemMovie item={item} />}
      />
      {/* <FlatList
        data={listPhim}
        renderItem={({item}) => <ItemMovie item={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.car}
        numColumns={checkNgang ? 5 : 3}
        onScroll={t => console.log(t)}
        onResponderEnd={() => {
          setPage(page + 1);
          console.log('avo more');
        }}
      /> */}
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <TouchableOpacity
        activeOpacity={1}
        onPress={changePage}
        onFocus={() => setMyButton(1)}
        onBlur={() => setMyButton(0.85)}>
        <Text style={[styles.button, {transform: [{scale: myButton}]}]}>
          Xem Thêm
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  myStyle: {
    backgroundColor: 'blue',
    padding: 0,
    // marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    padding: 10,
    borderRadius: 25,
    color: 'white',
    backgroundColor: '#222',
    alignSelf: 'flex-start',
    margin: 5,
  },
  car: {
    marginBottom: 50,
    // flex: 1,
    // flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
    backgroundColor: '#e0561b',
    alignSelf: 'flex-start',
    marginBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default LocalRealm;
