const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./Routes')


app.use(cors({
    origin:'*'
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/pages',routes)


app.listen(5555,()=>{
    console.log('Server is running');
})