import AsyncStorage from '@react-native-community/async-storage';

exports.getStore = function(user) {
  return new Promise(async (thanhcong, thatbai) => {
    try {
      const value = await AsyncStorage.getItem('@setting');

      if (value !== null) {
        var t = JSON.parse(value);
        thanhcong(t);
      } else {
        var data = {
          tab: 'Home',
          link: '',
          code: '',
          chamdiem: false,
          player: 'native',
          useFshare: false,
          username: null,
          password: null,
        };
        await AsyncStorage.setItem('@setting', JSON.stringify(data));
        thanhcong(data);
      }
    } catch (e) {
      console.log(e);
      thatbai(e);
    }
  });
};
exports.setStore = function(data) {
  return new Promise(async (thanhcong, thatbai) => {
    try {
      await AsyncStorage.setItem('@setting', JSON.stringify(data));
      thanhcong(data);
    } catch (e) {
      console.log(e);
      thatbai(e);
    }
  });
};
