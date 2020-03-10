import HTMLParser from 'fast-html-parser';

export const getViewMore = (link, page = 1) => {
  return new Promise(function(resolve, reject) {
    page !== 1 ? (page = '/page/' + page) : (page = '');
    if (link === 'https://phim.didibkk.com/quality/4k/') {
      fetch(link + page, {
        method: 'GET',
      })
        .then(data => {
          return data.text();
        })
        .then(data => {
          var root = HTMLParser.parse(data);
          var htmlPhimLe = root.querySelector('.slider')['childNodes'];

          var listphimle = [];
          htmlPhimLe.map((value, index) => {
            // console.log(value['id']);

            // return true;
            if (value.tagName === 'article') {
              if (value.tagName === 'article') {
                var phimmoi = {};

                phimmoi.id = value['id'].replace('post-', '');
                var tmp =
                  value['childNodes'][1]['childNodes'][1]['childNodes'][0]
                    .rawAttributes['src'];
                phimmoi.thumb = tmp;

                value['childNodes'][1]['childNodes'].map((sub, index2) => {
                  if (sub.tagName === 'a') {
                    phimmoi.link = sub.rawAttributes['href'];
                  }
                });
                // console.log(value);
                phimmoi.title = value['childNodes'][1]['childNodes'][3][
                  'childNodes'
                ][1]['childNodes'][1].rawText.trim();

                // console.log(phimmoi);
                phimmoi.realtitle = '';
                phimmoi.chapter = '';
                phimmoi.year = value['childNodes'][1]['childNodes'][3][
                  'childNodes'
                ][1]['childNodes'][3].rawText.trim();
                // console.log(phimmoi);
                return listphimle.push(phimmoi);
                // listphim.push(phimmoi);
                // return true;
              }
            }
          });
          // console.log(listphimle);
          resolve(listphimle);
        });
    } else {
      getViewMoreAnotherCategory(link, page).then(data => resolve(data));
    }
  });
};
function getViewMoreAnotherCategory(link, page) {
  return new Promise(function(resolve, reject) {
    console.log(link + page);
    fetch(link + page, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
      },
    })
      .then(data => {
        return data.text();
      })
      .then(data => {
        var root = HTMLParser.parse(data);
        var htmlPhimMoi = root.querySelector('#contenedor .items')[
          'childNodes'
        ];
        // console.log(htmlPhimMoi);
        var listphim = [];
        // console.log(htmlPhimMoi);
        htmlPhimMoi.map((value, index) => {
          // console.log(value);
          if (value.tagName === 'article') {
            var phimmoi = {};
            // console.log(value);
            var tmp =
              value['childNodes'][1]['childNodes'][1].rawAttributes['src'];

            phimmoi.thumb = tmp;

            phimmoi.link = value['childNodes'][1][
              'childNodes'
            ][7].rawAttributes['href'].trim();
            phimmoi.title = value['childNodes'][3][
              'childNodes'
            ][1].rawText.trim();
            phimmoi.year = value['childNodes'][1][
              'childNodes'
            ][2].rawText.trim();
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
          }
        });

        // var allPhim = {listphim, listphimle, listtoanbo};
        resolve(listphim);
      });
  });
}
