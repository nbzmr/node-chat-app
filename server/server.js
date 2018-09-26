const path = require('path')

const express = require('express')

const app = express()

const staticDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(staticDirectoryPath))



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})