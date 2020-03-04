import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

const ItemCate = ({item}) => {
  item = item.item;
  const dispatch = useDispatch();
  const [myStyle, setMystyle] = useState('white');
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onFocus={() => setMystyle('#e61782')}
        onBlur={() => setMystyle('white')}
        onPress={() =>
          dispatch({
            type: 'SETSETTING',
            payload: {tab: item.id, link: item.link},
          })
        }>
        <Text style={[styles.title, {color: myStyle}]}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
  },
});
export default ItemCate;
