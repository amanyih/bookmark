from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from repository.repository import BookRepository
from model.book import Book

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
bookrepository = BookRepository()


@app.get("/book")
def get_books():
    return bookrepository.get_all()

@app.get("/book/{book_id}")
async def get_book(book_id: int):
    return bookrepository.get_one(book_id)

@app.post("/book")
async def create_book(obj: dict):
    title = obj['title']
    status = obj['status']
    return bookrepository.create(title,status)

@app.put("/book/{book_id}")
async def update_book(book_id: int, obj: dict):
    if bookrepository.get_one(book_id) is None:
        raise HTTPException(status_code=404, detail="Book not found")
    title = obj['title']
    status = obj['status']
    return bookrepository.update(book_id=book_id,title=title,status=status)

@app.delete("/book/{book_id}")
async def delete_book(book_id: int):
    if bookrepository.get_one(book_id) is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return bookrepository.delete(book_id)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

