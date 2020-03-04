import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import ItemMovie from './ItemMovie';
import Carousel from 'react-native-snap-carousel';
var width = Dimensions.get('screen').width;

const CarouselCom = ({PhimMoiCapNhat, title}) => {
  console.log('xx', PhimMoiCapNhat);
  const [sapXep, setSapXep] = useState('start');
  const refControl = useRef();
  // console.log(sapXep);
  // console.log(refControl.current.currentIndex);
  return (
    <View style={{height: 270}}>
      <Text style={styles.title}>{title}</Text>
      <Carousel
        ref={refControl}
        data={PhimMoiCapNhat ? PhimMoiCapNhat : []}
        renderItem={({item}) => <ItemMovie item={item} />}
        sliderWidth={width - 200}
        itemWidth={134}
        itemHeight={120}
        activeSlideAlignment={sapXep}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        activeAnimationType={'timing'}
        layout={'default'}
        enableSnap={true}
        style={styles.car}
      />
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
    backgroundColor: 'red',
    height: 80,
  },
});
export default CarouselCom;
