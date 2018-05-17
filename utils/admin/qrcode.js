const _gen_qrcode = async () => {
  let qrCode = require('qrcode');
  // share link
  let url = 'http://192.168.2.1:2060/wifidog/auth?token=123'
  return { qrcode: await qrCode.toDataURL(url), url: url };
}

module.exports = {
  gen_qrcode: _gen_qrcode
}
