const express = require('express')
const app = express()

let note =[
    {
        id:1,
        content: "1",
        date:'2019-05-30',
        important:'true'
    },
    {
        id:2,
        content: "2",
        date:'2019-05-31',
        important:'false'
    },
    {
        id:3,
        content: "3",
        date:'2019-05-30',
        important:'true'
    }
]

app.get('/',(req, res) => {
    res.send('<h1>hello world</h1>')
})

app.get('/api/note', (req, res) => {
    res.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})