import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import ItemMovieInFolder from './ItemMovieInFolder';
import {getFshareFolder} from './../../API/getFolderFshare';
import bg from './../../../Assets/img/bg.webp';
const {width, height} = Dimensions.get('screen');
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
    var HTML = [];
    HTML = listMoive.map((value, index) => {
      return <ItemMovieInFolder item={value} key={index} />;
    });
    return HTML;
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
    <ImageBackground source={bg} style={{width, height}}>
      <ScrollView
        style={{flex: 1, padding: 20}}
        onResponderEnd={() => console.log('12321')}>
        {listMoive.length > 0 ? showItemMovie() : null}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => viewNextPage()}
          onFocus={() => setButton('#eb6e34')}
          onBlur={() => setButton('#222')}>
          {loading ? <ActivityIndicator size="large" color="#fff" /> : null}
          <Text style={[styles.button, {backgroundColor: button}]}>
            Xem Thêm
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  button: {
    fontSize: 25,
    padding: 5,
    marginBottom: 50,
    alignSelf: 'flex-start',
    color: '#fff',
  },
});
export default DetailMovieInFolder;
