const request = require('supertest');
const app = require('../server');

describe('Bookstore API', () => {

    // GET all books
    test('GET /api/books should return all books', async () => {
        const res = await request(app).get('/api/books');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // GET book by valid ID
    test('GET /api/books/1 should return a specific book', async () => {
        const res = await request(app).get('/api/books/1');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('author');
        expect(res.body).toHaveProperty('genre');
        expect(res.body).toHaveProperty('copiesAvailable');
    });

    // GET book with invalid ID
    test('GET /api/books/999 should return 404', async () => {
        const res = await request(app).get('/api/books/999');

        expect(res.statusCode).toBe(404);
    });

    // POST new book
    test('POST /api/books should create a new book', async () => {
        const newBook = {
            title: "Test Driven Development",
            author: "Kent Beck",
            genre: "Programming",
            copiesAvailable: 4
        };

        const res = await request(app)
            .post('/api/books')
            .send(newBook);

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(newBook.title);
        expect(res.body.author).toBe(newBook.author);
        expect(res.body.genre).toBe(newBook.genre);
        expect(res.body.copiesAvailable).toBe(newBook.copiesAvailable);
    });

    // PUT update book
    test('PUT /api/books/2 should update book information', async () => {
        const updatedData = {
            title: "Updated Title",
            copiesAvailable: 10
        };

        const res = await request(app)
            .put('/api/books/2')
            .send(updatedData);

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Updated Title");
        expect(res.body.copiesAvailable).toBe(10);
    });

    // PUT invalid ID
    test('PUT /api/books/999 should return 404', async () => {
        const res = await request(app)
            .put('/api/books/999')
            .send({ title: "Does Not Exist" });

        expect(res.statusCode).toBe(404);
    });

    // DELETE book
    test('DELETE /api/books/3 should delete a book', async () => {
        const res = await request(app).delete('/api/books/3');

        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(3);
    });

    // DELETE invalid ID
    test('DELETE /api/books/999 should return 404', async () => {
        const res = await request(app).delete('/api/books/999');

        expect(res.statusCode).toBe(404);
    });

});
