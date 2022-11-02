//import express
const express = require ('express');
const path = require('path');
//work with file system
const fs = require('fs');
//initialize an instance of express. calls the funcion
const app = express();
const PORT = 3001;
//
const allNotes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//application to use express static assets
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});


//deliver files
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
app.get("/notes", (req, res) => {
   res.sendFile(path.join(__dirname, "./public/notes.html"))
});
//absolute path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//newnote
function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];

        if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

notesArray.push(newNote);
    fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, null, 2)
        );
        return newNote;
    }

    app.post('/api/notes', (req, res) => {
        const newNote = createNewNote(req.body, allNotes);
        res.json(newNote);
    });

app.listen(port, () => console.log('Server now on port ${port}'))