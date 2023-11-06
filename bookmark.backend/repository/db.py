
import sqlite3
from model.book import Book

class BookDatabase:

    def __init__(self):
        self.connection = None
        self.create_table()
        print('db.py init')
    
    def connect(self) -> None:
        self.connection = sqlite3.connect('books.db',check_same_thread=False)

    async def disconnect(self) -> None:
        self.connection.close()
    
    def create_table(self) -> None:
        self.connect()
        cursor = self.connection.cursor()
        cursor.execute('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, status TEXT)')
        self.connection.commit()

        if self.connection is not None:
            print('connected')
        
        print(self.fetch_all(),"fetch_all")
        
        


    def add_one(self, title , status) -> int:
        print("db", title,status)
        cursor = self.connection.cursor()
        cursor.execute('INSERT INTO books (title, status) VALUES (?, ?)', (title, status))
        self.connection.commit()
        return cursor.lastrowid
    
    def fetch_all(self):
        print('fetch_all')
        cursor = self.connection.cursor()
        cursor.execute('SELECT * FROM books')
        books = cursor.fetchall()

        all_books = {
            "toBeRead" : [],
            "reading" : [],
            "read" :[]
        }

        for i,title,status in books:
            all_books[status].append(
                {
                    "id" :i,
                    "title" :title,
                    "status":status
                }
            )

        return all_books
    
    def fetch_one(self, book_id):
        cursor = self.connection.cursor()
        cursor.execute('SELECT * FROM books WHERE id=?', (book_id,))
        book = cursor.fetchone()
        print(book,"fetch_one")
        return book
    
    def update_one(self, book_id, title, status) -> int:
        cursor = self.connection.cursor()
        cursor.execute('UPDATE books SET title=?, status=? WHERE id=?', (title, status, book_id))
        self.connection.commit()

        return cursor.rowcount

    def delete_one(self, book_id) -> int:
        cursor = self.connection.cursor()
        cursor.execute('DELETE FROM books WHERE id=?', (book_id,))
        self.connection.commit()

        return cursor.rowcount
        



