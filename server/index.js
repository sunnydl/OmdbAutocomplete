import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

import searchRoute from './routes/searchRoute.js'

const __dirname = path.resolve()
const app = express()
dotenv.config()

app.use(express.static(path.join(__dirname, '../client/build')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/movies', searchRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
