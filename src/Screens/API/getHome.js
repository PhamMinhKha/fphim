import HTMLParser from 'fast-html-parser';

export const getHome = () => {
  return new Promise(function(resolve, reject) {
    fetch('https://phim.didibkk.com/', {
      method: 'GET',
    })
      .then(data => {
        return data.text();
      })
      .then(data => {
        var root = HTMLParser.parse(data);
        var htmlPhimMoi = root.querySelector('#contenedor .items')[
          'childNodes'
        ];

        var listphim = [];
        htmlPhimMoi.map((value, index) => {
          // console.log(value);
          var phimmoi = {};
          var tmp =
            value['childNodes'][0]['childNodes'][0].rawAttributes['src'];
          phimmoi.thumb = tmp;
          phimmoi.link = value['childNodes'][0]['childNodes'][3].rawAttributes[
            'href'
          ].trim();
          phimmoi.title = value['childNodes'][1]['childNodes'][1].rawText.trim();
          phimmoi.year = value['childNodes'][1]['childNodes'][2].rawText.trim();
          // if (typeof value.tagName !== 'undefined') {
          //   var phimmoi = {};
          //   var tmp =
          //     value['childNodes'][0]['childNodes'][0].rawAttributes['src'];
          //   phimmoi.thumb = tmp;
          //   phimmoi.link = value['childNodes'][0].rawAttributes['href'].trim();
          //   phimmoi.title = value['childNodes'][2][
          //     'childNodes'
          //   ][1].rawText.trim();
          //   phimmoi.realtitle = value['childNodes'][2][
          //     'childNodes'
          //   ][3].rawText.trim();
          //   phimmoi.chapter = value['childNodes'][4]['childNodes'][0].rawText
          //     .trim()
          //     .replace('Thuyết Minh', '');
          listphim.push(phimmoi);
          //   return true;
          // }
        });

        // var allPhim = {listphim, listphimle, listtoanbo};
        resolve(listphim);
      });
  });
};
