import HTMLParser from 'fast-html-parser';

export const getFshareFolder = link => {
  return new Promise((resolve, reject) => {
    if (link.search('api')) {
      fetch(link)
        .then(data => data.json())
        .then(data => {
          resolve(data);
        });
    }
    const regex = /\/folder\/(.*)\??/gm;
    let m;
    while ((m = regex.exec(link)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      fetch(
        'https://www.fshare.vn/api/v3/files/folder?linkcode=' +
          m[1] +
          '&sort=type,-modified',
      )
        .then(data => data.json())
        .then(data => {
          resolve(data);
        });
    }
  });
};
