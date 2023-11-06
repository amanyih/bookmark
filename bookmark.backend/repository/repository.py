from .db import BookDatabase

class BookRepository:

    def __init__(self):
        self.db = BookDatabase()
        print(self.db.fetch_all(),"fetch_all")

    def get_all(self):
        return  self.db.fetch_all()
    
    def get_one(self, book_id):
        return  self.db.fetch_one(book_id)
    
    def create(self, title, status):
        return  self.db.add_one(title, status)
    
    def update(self, book_id, title, status):
        return  self.db.update_one(book_id, title, status)

    def delete(self, book_id):
        return  self.db.delete_one(book_id)
