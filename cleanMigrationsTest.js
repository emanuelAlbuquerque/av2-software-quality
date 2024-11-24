const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, './src/main/adapters/secondary/external/database/postgress/migrations-test')

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error('Erro ao ler a pasta:', err)
        return
    }
    files.forEach((file) => {
        const filePath = path.join(dir, file)
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Erro ao excluir o arquivo ${file}:`, err)
            } else {
                console.log(`Arquivo ${file} removido.`)
            }
        })
    })
})
