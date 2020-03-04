import HTMLParser from 'fast-html-parser';
// import hza from './../Components/hza';
import axios from 'axios';

export const getVideo = item => {
  return new Promise(function(resolve, reject) {
    // console.log(item.server);
    switch (item.server) {
      // case 'F.PRO:':
      //   getFPRO(item.link);
      //   break;
      case 'B.PRO:':
        getBPRO(item.link).then(data => resolve(data));
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
    getLinkFshare(link).then(data => {
      fetch('https://nhacsong.pro/API/C_fshare/getLink?link=' + data.link, {
        method: 'GET',
      })
        .then(data => {
          return data.json();
        })
        .then(data => {
          resolve(data.link);
        });
    });
  });
};
function getLinkFshare(link) {
  return new Promise(function(resolve, reject) {
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
