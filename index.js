const express = require('express')
const app = express()
app.use(express.json())

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

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter( item => item.id !== id)
    res.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id)) // note.map() returns an array, so the ... is required, means all element in the note.map() result
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (req, res) => {
    const body = req.body
  
    if (!body.content) {
      return res.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      id: generateId(),
      content: body.content,
      important: body.important || false,
      date: new Date(),
    }
  
    notes = notes.concat(note)
    console.log(notes)
    res.json(note)
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})