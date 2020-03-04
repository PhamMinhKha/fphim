import HTMLParser from 'fast-html-parser';
export const getSearch = (link, page) => {
  return new Promise(function(resolve, reject) {
    fetch('' + link, {
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
        var htmlPhimMoi = root.querySelector('.search-page .result-item')['childNodes'];
        var listphim = [];
        // console.log(htmlPhimMoi);
        htmlPhimMoi.map((value, index) => {
          if (value.tagName === 'article') {
              console.log(value);
            var phimmoi = {};
            var tmp =
              value['childNodes'][1]['childNodes'][1]['childNodes'][1][
                'childNodes'
              ][1].rawAttributes["src"];
            phimmoi.thumb = tmp;

            phimmoi.link = value['childNodes'][1]['childNodes'][1][
              'childNodes'
            ][1].rawAttributes['href'].trim();
            console.log(phimmoi);
            phimmoi.title = value['childNodes'][3]['childNodes'][1][
              'childNodes'
            ][1].rawText.trim();
            phimmoi.year = value['childNodes'][3]['childNodes'][3][
              'childNodes'
            ][3].rawText.trim();

            listphim.push(phimmoi);
          }
        });
        resolve(listphim);
      });
  });
};
