require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const { response, request } = require('express')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

const Note = require('./note')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('id:  ', request.params.id)
  console.log('---')
  next()
}
app.use(requestLogger)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError' && error.kind ==='ObjectID'){
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)
// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })
// noteSchema.set('toJSON',{
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
// const Note = mongoose.model('Note', noteSchema)

let notes =[
    {
        id:1,
        content: "Test webpage",
        date:'2019-05-30',
        important:'true'
    },
    {
        id:2,
        content: "When you see this, it means the webpage is working!",
        date:'2019-05-31',
        important:'false'
    },
    {
        id:3,
        content: "Sijie Shi",
        date:'2019-05-30',
        important:'true'
    },
    {
      id:4,
      content: "2020.09.25",
      date:'2019-05-30',
      important:'true'
  }
]

app.get('/',(req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/notes/', (req, res) => {
    //res.json(notes)
    Note.find({}).then(notes => {
      res.json(notes)
    })
})

// app.get('/api/notes/:id', (req, res) => {
//     const id = Number(req.params.id)
//     const note = notes.find( item => item.id === id)
//     if(note){
//         res.json(note)
//     }else{
//         res.status(404).end()
//     }
    
// })

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})
const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id)) // note.map() returns an array, so the ... is required, means all element in the note.map() result
      : 0
    return maxId + 1
  }
  
  // app.post('/api/notes', (req, res) => {
  //   const body = req.body
  
  //   if (!body.content) {
  //     return res.status(400).json({ 
  //       error: 'content missing' 
  //     })
  //   }
  
  //   const note = {
  //     id: generateId(),
  //     content: body.content,
  //     important: body.important || false,
  //     date: new Date(),
  //   }
  
  //   notes = notes.concat(note)
  //   console.log(notes)
  //   res.json(note)
  // })
app.post('/api/notes', (req, res, next) => {
  const body = req.body
  if(body.content === undefined) {
    return res.status(400).json({ error:'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    res.json(savedNote)
  }).catch(error => next(error))
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
      response.json(note)
      } else {
        response.status(404).end()
      }

    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})