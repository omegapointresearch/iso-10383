const fs = require('fs');
const rp = require('request-promise-native');
const xlsx = require('xlsx');

const url = 'http://www.iso15022.org/MIC/ISO10383_MIC.xls';
const encoding = null;

function exit(err) {
  if (err) {
    /* eslint-disable no-console */
    console.log(err);
    /* eslint-enable no-console */
    process.exit(1);
  } else {
    process.exit(0);
  }
}

rp({ url, encoding })
  .then(res => {
    const data = new Uint8Array(res);
    const arr = [];
    data.forEach((d, i) => { arr[i] = String.fromCharCode(d); });
    const bstr = arr.join('');
    const workbook = xlsx.read(bstr, { type: 'binary' });
    const micList = xlsx.utils.sheet_to_json(workbook.Sheets['MICs List by MIC']);
    const micObj = {};
    const mics = [];

    micList.forEach(x => {
      micObj[x.MIC] = x;
      mics.push(x.MIC);
    });

    fs.writeFileSync('./lib/data.json', JSON.stringify(micObj, null, 2), 'utf-8');
    fs.writeFileSync('./lib/mics.json', JSON.stringify(mics, null, 2), 'utf-8');
  })
  .catch(exit);
