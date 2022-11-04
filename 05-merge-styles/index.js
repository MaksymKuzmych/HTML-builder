const fs = require('fs')
const path = require('path')

const stream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8')

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
  if (error) {
    throw error
  }

  for (let file of files) {
    if (file.name.split('.')[1] === 'css') {
      fs.readFile(path.join(__dirname, 'styles', file.name), (error, data) => {
        if (error) {
          throw error
        }

        stream.write(data + '\n')
      })
    }
  }
})
