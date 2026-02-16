const express = require('express');
const app = express();

app.use(express.json());

// ✅ BOOKS ARRAY MUST BE ABOVE ROUTES
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
];

// ---------------- ROUTES ----------------

// GET all books
app.get('/api/books', (req, res) => {
    res.status(200).json(books);
});

// GET by ID
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
});

// POST
app.post('/api/books', (req, res) => {
    const { title, author, genre, copiesAvailable } = req.body;

    const newBook = {
        id: books.length + 1,
        title,
        author,
        genre,
        copiesAvailable
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { title, author, genre, copiesAvailable } = req.body;

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (genre !== undefined) book.genre = genre;
    if (copiesAvailable !== undefined) book.copiesAvailable = copiesAvailable;

    res.status(200).json(book);
});

// DELETE
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);
    res.status(200).json(deletedBook[0]);
});

// ✅ IMPORTANT FOR TESTING
if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

module.exports = app;
