
const fse = require('fs-extra')

const srcDir = './build'
const destDir = '../nft-storage-desktop/assets/webui'
console.log('Begin copy build folder to webui at desktop app version.')
fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
  if (err) {
    console.error('Failed to copy build folder to desktop app assets', err)
  } else {
    console.log('Successfully updated desktop app assets too!')
  }
})
