// Inserting modules used
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Note = require('./notes-models/Note');

// Creating an instance of express
const app = express();
app.use(express.json());
app.use(cors());

// Connecting to a MongoDB database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start a server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

app.post('/add-note', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.json({ message: "Note added successfully!", note: newNote });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

