const fs = require('fs')
const path = require('path')

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (error, files) => {
  if (error) {
    throw error
  }

  for (let file of files) {
    if (file.isFile()) {
      fs.stat(path.join(path.join(__dirname, 'secret-folder'), file.name), (error, stats) => {
        if (error) {
          throw error
        }

        let fileName = file.name.split('.').slice(0, -1).join('.')
        let fileExt = file.name.split('.').slice(-1).join('')

        console.log(fileName, '-', fileExt, '-', stats.size, 'b')
      })
    }
  }
})
