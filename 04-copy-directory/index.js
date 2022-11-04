const fs = require('fs')
const path = require('path')

fs.stat(path.join(__dirname, 'copy-files'), (error) => {
  if (error) {
    fs.mkdir(path.join(__dirname, 'copy-files'), (error) => {
      if (error) {
        throw error
      }

      fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true }, (error, files) => {
        if (error) {
          throw error
        }

        for (let file of files) {
          fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'copy-files', file.name), () => {
            console.log('File added')
          })
        }
      })
    })
  } else {
    fs.readdir(path.join(__dirname, 'copy-files'), { withFileTypes: true }, (error, files) => {
      if (error) {
        throw error
      }

      for (let file of files) {
        fs.unlink(path.join(path.join(__dirname, 'copy-files'), file.name), () => {
          console.log('File deleted')
        })
      }

      fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true }, (error, files) => {
        if (error) {
          throw error
        }

        for (let file of files) {
          fs.copyFile(path.join(path.join(__dirname, 'files'), file.name), path.join(path.join(__dirname, 'copy-files'), file.name), () => {
            console.log('File added')
          })
        }
      })
    })
  }
})
