const pngToIco = require('png-to-ico').default;
const fs = require('fs');

pngToIco('float_hub_icon.png')
  .then(buf => fs.writeFileSync('float_hub_icon.ico', buf));