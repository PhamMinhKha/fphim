import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import ItemFolderFshare from './Components/DetailScreenComponent/ItemFolderFshare';
const Folder = [
  {
    name: 'Phim lẻ mới nhất',
    link: 'https://www.fshare.vn/folder/YA819T776XVC',
    size: ''
  },
  {
    name: 'Phim Tùm Lum',
    link: 'https://www.fshare.vn/folder/TNG4F470VT',
    size: ''
  },
  {
    name: 'Phim Bom Tấn Thuyết Minh',
    link: 'https://www.fshare.vn/folder/84NMWF4ZEP59',
    size: ''
  },
  {
    name: 'Phim Lẻ Thuyết Minh + Việt Sub Chuẩn X265',
    link: 'https://www.fshare.vn/folder/QFMJNAA94LEX',
    size: ''
  },
  {
    name: 'Phim 4K 10bit H265',
    link: 'https://www.fshare.vn/folder/PH1EP3YBDNXG7DZ',
    size: ''
  },
  {
    name: 'Phim 3D',
    link: 'https://www.fshare.vn/folder/LT5VS1FTMDO2',
    size: ''
  },
  {
    name: 'Phim Tổng Hợp',
    link: 'https://www.fshare.vn/folder/P1QCA1ZP9T5Z',
    size: ''
  },
  {
    name: 'Phim tình cảm abcxyz',
    link: 'https://www.fshare.vn/folder/XN5JYWG8JQTK6VK',
    size: ''
  },
  {
    name: 'Bộ Sưu Tập Karaoke HD',
    link: 'https://www.fshare.vn/folder/PB38M4IXXLT5VQU',
    size: ''
  },
  {
    name: 'Phim 4K (2160P)',
    link: 'https://www.fshare.vn/folder/TD59N926HMCM',
    size: ''
  },
  {
    name: 'Phim cho điện thoại Tablet',
    link: 'https://www.fshare.vn/folder/DTUHK7YXJNCI',
    size: ''
  },
  {
    name: 'Phim Việt Nam chiếu rạp',
    link: 'https://www.fshare.vn/folder/ICWBG4Y927K1',
    size: ''
  },
  {
    name: 'Phim hoạt hình',
    link: 'https://www.fshare.vn/folder/TY7S4UPQ8QP2X6S',
    size: ''
  },
  {
    name: 'Phim điện ảnh Mavel',
    link: 'https://www.fshare.vn/folder/DI9G7DXETQZEREE',
    size: ''
  },
];
const FolderFshare = () => {
  function showFolder() {
    var HTML = [];
    console.log(Folder);
    HTML = Folder.map((value, index) => {
      return <ItemFolderFshare item={value} key={index} />;
    });
    return HTML;
  }
  return <View>{showFolder()}</View>;
};

export default FolderFshare;
