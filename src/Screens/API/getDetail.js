import HTMLParser from 'fast-html-parser';
import axios from 'axios';

export const getDetail = link => {
  // console.log(link);
  return new Promise(function(resolve, reject) {
    fetch('https://nhacsong.pro/API/C_fshare/getThongTinPhim?link=' + link, {
      method: 'GET',
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log(data);
        resolve(data);
      })
      .catch(err => console.log(err));
  });
};
