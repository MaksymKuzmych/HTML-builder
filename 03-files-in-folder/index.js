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
        console.log(file.name.split('.').join(' - '), '-', stats.size / 1000, 'kb')
      })
    }
  }
})
