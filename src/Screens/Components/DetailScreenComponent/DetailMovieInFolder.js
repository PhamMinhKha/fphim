import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import ItemMovieInFolder from './ItemMovieInFolder';
import {getFshareFolder} from './../../API/getFolderFshare';
import bg from './../../../Assets/img/bg.webp';
const {width, height} = Dimensions.get('screen');
// import {FlatGrid} from 'react-native-super-grid';
const DetailMovieInFolder = ({item}) => {
  const [list, setList] = useState([]);
  const [listMoive, setListMovie] = useState([]);
  const [button, setButton] = useState('#222');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getFshareFolder(item.link).then(data => {
      setList(data);
      setListMovie(data.items);
      setLoading(false);
    });
    return () => {
      list;
    };
  }, []);
  function showItemMovie() {
    // var HTML = [];

    // HTML = listMoive.map((value, index) => {
    //   return <ItemMovieInFolder item={value} key={index} />;
    // });
    // return HTML;
    return (
      <FlatList
        data={listMoive}
        renderItem={({item}) => <ItemMovieInFolder item={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.car}
        onScroll={t => console.log(t)}
      />
    );
  }
  function viewNextPage() {
    setLoading(true);
    console.log('https://www.fshare.vn/api' + list._links.next);
    getFshareFolder('https://www.fshare.vn/api' + list._links.next).then(
      data => {
        console.log(data);
        setList(data);
        setListMovie(listMoive.concat(data.items));
        setLoading(false);
      },
    );
  }
  return (
    <View style={{backgroundColor: '#a7c0d1', flex: 1}}>
      {listMoive.length > 0 ? showItemMovie() : null}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => viewNextPage()}
        onFocus={() => setButton('#eb6e34')}
        onBlur={() => setButton('#222')}>
        {loading ? <ActivityIndicator size="large" color="#fff" /> : null}
        <Text style={[styles.button, {backgroundColor: button}]}>Xem Thêm</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    fontSize: 25,
    padding: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
    color: '#fff',
  },
});
export default DetailMovieInFolder;
