var express = require('express')
var app = express()

var data = {}

app.use(express.json())

app.get('/api/todos', function(req, res) {
    res.send(data)
})


app.post('/api/todos', function(req, res) {
    const text = req.body.text;
    if(text == ""){
        res.status(400).send('Error: Text is empty')
        return
    }
    const id = Math.floor(Math.random() * 10) + 1;
    data[id] ={
        text: text,
        done: false
    }
    res.send("todo added succes")
})

app.put('/api/todos/:id', function(req, res) {
    const id = req.params.id;
    if(id in data){
        const text = req.body.text
        const status = req.body.done

        data[id] = {
            text: text,
            done: true

        };
        res.send('Data Updated Succes')
    }
    res.status(400).send('ID is Undefined')
})

app.delete('/api/todos/:id', function(req, res) {
    const id = req.params.id
    if(id in data){
        delete data[id]
        res.send('Data Deleted Succes')
    }
    res.status(400).send('ID is Undefined')
})



console.log('Running a server...')
app.listen(3500)