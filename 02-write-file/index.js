const fs = require('fs')
const path = require('path')
const { stdin, stdout } = process

fs.writeFile(path.join(__dirname, 'text.txt'), '', (error) => {
  if (error) {
    throw error
  }

  stdout.write('Enter text:\n')
  stdin.on('data', (data) => {
    if (data.toString() == 'exit\r\n') {
      process.exit()
    } else {
      fs.appendFile(path.join(__dirname, 'text.txt'), data, (error) => {
        if (error) {
          throw error
        }
      })
    }
  })
})

process.on('exit', () => {
  console.log('Goodbye, see you later!')
})

process.on('SIGINT', () => {
  process.exit()
})
