import HTMLParser from 'fast-html-parser';
// import hza from './../Components/hza';
import {getStore} from './../../Redux/Saga/API/Store';
import {getDetail} from './getDetail';
import axios from 'axios';
import {exists} from 'realm';

export const getVideo = item => {
  return new Promise(function(resolve, reject) {
    // console.log(item.server);
    switch (item.server) {
      // case 'F.PRO:':
      //   getFPRO(item.link);
      //   break;
      case 'B.PRO:':
        // getBPRO(item.link).then(data => resolve(data));
        break;
      case 'S.PRO:':
        getSPRO(item.link).then(data => resolve(data));
        break;
      default:
        reject('error');
    }
  });
};

export const getFPRO = link => {
  return new Promise(function(resolve, reject) {
    //Nếu là phim bộ

    var phimBo = link.search('episodes');
    console.log(phimBo);
    if (phimBo !== -1) {
      getDetail(link).then(data => {
        let link2 = data.listLink[0].link;
        console.log(link2);
        getLinkFshare(link2).then(data => {
          console.log('xx', data);
          getStore().then(tmp => {
            var themChuoi = '';
            if (tmp.useFshare) {
              themChuoi =
                '&username=' + tmp.username + '&password=' + tmp.password;
            }
            fetch(
              'https://nhacsong.pro/API/C_fshare/getLink?link=' +
                data.link +
                themChuoi,
              {
                method: 'GET',
              },
            )
              .then(data => {
                return data.json();
              })
              .then(data => {
                resolve(data.link);
              });
          });
        });
      });
      //kết thúc phim bộ
    } else {
      console.log('vao day');
      getLinkFshare(link).then(data => {
        getStore().then(tmp => {
          var themChuoi = '';
          if (tmp.useFshare) {
            themChuoi =
              '&username=' + tmp.username + '&password=' + tmp.password;
          }

          fetch(
            'https://nhacsong.pro/API/C_fshare/getLink?link=' +
              data.link +
              themChuoi,
            {
              method: 'GET',
            },
          )
            .then(data => {
              return data.json();
            })
            .then(data => {
              resolve(data.link);
            });
        });
      });
    }
  });
};
function getLinkFshare(link) {
  return new Promise(function(resolve, reject) {
    if (link.search('fshare.vn') !== -1) {
      var tmp = {link: link};
      resolve(tmp);
    } else
      fetch(
        'https://nhacsong.pro/API/C_fshare/getLinkFshareTuDidi?link=' + link,
        {
          method: 'GET',
        },
      )
        .then(data => {
          return data.json();
        })
        .then(data => {
          resolve(data);
        });
  });
}
function getSPRO(link) {
  return new Promise(function(resolve, reject) {
    fetch(
      'https://nhacsong.pro/API/C_fshare/getLinkFshareTuDidi?link=' + link,
      {
        method: 'GET',
      },
    )
      .then(data => {
        return data.text();
      })
      .then(data => {
        var root = HTMLParser.parse(data);
        var script = root.querySelector('iframe');
        var iframe = script.rawAttributes.src;
        fetch(iframe, {
          method: 'GET',
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
          },
        })
          .then(data2 => data2.text())
          .then(data3 => {
            const regex = /file":"(.*)",/gm;
            let m;

            while ((m = regex.exec(data3)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                regex.lastIndex++;
              }
              resolve(m[1]);
            }
          });
      });
  });
}
async function pupptet() {}
