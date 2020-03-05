import HTMLParser from 'fast-html-parser';

export const getSearch = (link, page) => {
  return new Promise(function(resolve, reject) {
    fetch(link, {
      method: 'GET',
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log(data);
        resolve(data.listLink);
      });
  });
};
