import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {getSearch} from './API/getSearch';
import CarouselCom from './Components/CarouselCom';

const SearchScreen = () => {
  const [listPhim, setListPhim] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [timeout, settimeout] = useState(0);
  const refText = useRef();
  function handleChangeText(t) {
    setKeyword(t);
    // if (timeout) clearTimeout(timeout);
    // settimeout(
    //   setTimeout(function() {}),
    //   4000,
    // );
  }
  function handleSubmit() {
    getSearch('https://phim.didibkk.com/?s=' + keyword, 1).then(data => {
      setListPhim(data);
    });
  }
  console.log(keyword);
  return (
    <ImageBackground
      source={{uri: 'https://nhacsong.pro/public/phimthuyetminh/hinhnen1.jpg'}}
      style={{width, height}}>
      <View>
        <TouchableOpacity onPress={() => refText.current.focus()}>
          <TextInput
            ref={refText}
            style={styles.input}
            onChangeText={handleChangeText}
            autoFocus={true}
            onSubmitEditing={handleSubmit}
          />
        </TouchableOpacity>
        <CarouselCom PhimMoiCapNhat={listPhim} title={keyword} />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  input: {
    fontSize: 30,
    fontWeight: '600',
    backgroundColor: 'rgba(224, 200, 16, 0.64)',
  },
});
export default SearchScreen;
