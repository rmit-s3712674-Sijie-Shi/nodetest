const http = require('http')

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

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(JSON.stringify(note))
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)