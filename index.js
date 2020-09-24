const express = require('express')
const app = express()

let notes =[
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
    res.send('<h1>Hello world</h1>')
})

app.get('/api/notes/', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find( item => item.id === id)
    if(note){
        res.json(note)
    }else{
        res.status(404).end()
    }
    
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})