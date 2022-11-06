const fs = require('fs')
const path = require('path')

fs.stat(path.join(__dirname, 'project-dist'), (error) => {
  if (error) {
    makeProject()
  } else {
    fs.rm(path.join(__dirname, 'project-dist'), { recursive: true }, (error) => {
      if (error) {
        throw error
      }
      makeProject()
    })
  }
})

function makeProject() {
  fs.mkdir(path.join(__dirname, 'project-dist'), (error) => {
    if (error) {
      throw error
    }

    fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (error) => {
      if (error) {
        throw error
      }

      fs.readdir(path.join(__dirname, 'components'), (error, files) => {
        if (error) {
          throw error
        }

        let fileNumber = files.length

        function buildHTML() {
          if (fileNumber > 0) {
            fileNumber--

            fs.readFile(path.join(__dirname, 'components', files[fileNumber]), 'utf8', (error, content) => {
              if (error) {
                throw error
              }

              fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf8', (error, data) => {
                if (error) {
                  throw error
                }

                let res = data.replace(`{{${files[fileNumber].split('.')[0]}}}`, content)

                fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), res, 'utf8', (error) => {
                  if (error) {
                    throw error
                  }

                  buildHTML()
                })
              })
            })
          }
        }
        buildHTML()
      })
    })

    const streamCSS = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'))

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

            streamCSS.write(data + '\n')
          })
        }
      }
    })

    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (error) => {
      if (error) {
        throw error
      }

      fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true }, (error, files) => {
        if (error) {
          throw error
        }

        for (let fileOuter of files) {
          if (fileOuter.isFile()) {
            fs.copyFile(
              path.join(__dirname, 'assets', fileOuter.name),
              path.join(__dirname, 'project-dist', 'assets', fileOuter.name),
              (error) => {
                if (error) {
                  throw error
                }
              }
            )
          }

          if (fileOuter.isDirectory()) {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', fileOuter.name), (error) => {
              if (error) {
                throw error
              }

              fs.readdir(path.join(__dirname, 'assets', fileOuter.name), { withFileTypes: true }, (error, files) => {
                if (error) {
                  throw error
                }

                for (let fileInner of files) {
                  if (fileInner.isFile()) {
                    fs.copyFile(
                      path.join(__dirname, 'assets', fileOuter.name, fileInner.name),
                      path.join(__dirname, 'project-dist', 'assets', fileOuter.name, fileInner.name),
                      (error) => {
                        if (error) {
                          throw error
                        }
                      }
                    )
                  }
                }
              })
            })
          }
        }
      })
    })
  })
}
