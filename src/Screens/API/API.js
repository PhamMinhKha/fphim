export function GetVersion() {
  return new Promise(function(resolve, reject) {
    fetch('https://nhacsong.pro/versionFphim.json', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
    })
      .then(data => {
        console.log(data);
        return data.json();
      })
      .then(data => {
        console.log(data);
        resolve(data);
      });
  });
}
