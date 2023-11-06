"use client";
import { createContext, useContext, useState } from "react";
import { BookType as Book, BookStatus } from "@/types/book";

interface BookContextProps {
  books: {
    [key in BookStatus]: Book[];
  };
  addBook: (book: Book) => void;
  moveBook: (book: Book) => void;
  deleteBook: (book: Book) => void;
}

const BookContext = createContext<BookContextProps>({
  books: {
    [BookStatus.TOREAD]: [],
    [BookStatus.READING]: [],
    [BookStatus.READ]: [],
  },
  addBook: (book: Book) => {},
  moveBook: (book: Book) => {},
  deleteBook: (book: Book) => {},
});

const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const movingmap = {
    [BookStatus.TOREAD]: BookStatus.READING,
    [BookStatus.READING]: BookStatus.READ,
    [BookStatus.READ]: BookStatus.READ,
  };
  const [books, setBooks] = useState<{ [key in BookStatus]: Book[] }>({
    [BookStatus.TOREAD]: [
      {
        id: 1,
        title: "Originals",
        status: BookStatus.TOREAD,
      },
      {
        id: 2,
        title: "Never Split the Difference",
        status: BookStatus.TOREAD,
      },
    ],
    [BookStatus.READING]: [],
    [BookStatus.READ]: [],
  });

  const addBook = (book: Book) => {
    console.log("adding book", book);
    const bookReplica = { ...books };
    bookReplica[book.status] = [...bookReplica[book.status], book];
    setBooks(bookReplica);
  };

  const moveBook = (book: Book) => {
    const nxtstatus = movingmap[book.status];
    const prevStatus = book.status;
    const bookReplica = { ...books };
    bookReplica[prevStatus] = bookReplica[prevStatus].filter(
      (b: Book) => b.id !== book.id
    );
    book.status = nxtstatus;
    bookReplica[nxtstatus] = [...bookReplica[nxtstatus], book];
    setBooks(bookReplica);
  };

  const deleteBook = (book: Book) => {
    setBooks((prevBooks) => ({
      ...prevBooks,
      [book.status]: prevBooks[book.status].filter(
        (b: Book) => b.id !== book.id
      ),
    }));
  };

  return (
    <BookContext.Provider value={{ books, addBook, moveBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

const useBook = () => useContext(BookContext);

export { BookProvider, useBook };
