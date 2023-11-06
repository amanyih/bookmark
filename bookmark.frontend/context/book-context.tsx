"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { BookType as Book, BookStatus } from "@/types/book";
import { API_URL } from "@/constants/constants";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const showErrorToast = () => {
    toast({
      title: "Something went wrong!",
      description: "Could not fetch books, please try again later.",
      variant: "destructive",
      duration: 3000,
    });
  };
  const showSuccessToast = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
      duration: 3000,
    });
  };
  const movingmap = {
    [BookStatus.TOREAD]: BookStatus.READING,
    [BookStatus.READING]: BookStatus.READ,
    [BookStatus.READ]: BookStatus.READ,
  };
  const [books, setBooks] = useState<{ [key in BookStatus]: Book[] }>({
    [BookStatus.TOREAD]: [],
    [BookStatus.READING]: [],
    [BookStatus.READ]: [],
  });

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await fetch(API_URL + "/book");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        showErrorToast();
      }
    };

    getBooks();
  }, []);

  const addBook = (book: Book) => {
    const sendBook = async () => {
      try {
        const res = await fetch(API_URL + "/book", {
          method: "POST",
          body: JSON.stringify(book),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        throw new Error("Could not add book");
      }
    };

    try {
      const id = sendBook();
      showSuccessToast("Book added!", "Book has been added to your list.");
      const bookReplica = { ...books };
      bookReplica[book.status] = [...bookReplica[book.status], book];
      setBooks(bookReplica);
    } catch (error) {
      showErrorToast();
    }
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

    const updateBook = async () => {
      try {
        const res = await fetch(API_URL + `/book/${book.id}`, {
          method: "PUT",
          body: JSON.stringify(book),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
      } catch (error) {
        throw new Error("Could not update book");
      }
    };

    try {
      updateBook();
    } catch (error) {
      showErrorToast();
    }

    setBooks(bookReplica);
  };

  const deleteBook = (book: Book) => {
    const deleteBook = async () => {
      try {
        const res = await fetch(API_URL + `/book/${book.id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        setBooks((prevBooks) => ({
          ...prevBooks,
          [book.status]: prevBooks[book.status].filter(
            (b: Book) => b.id !== book.id
          ),
        }));
      } catch (error) {
        throw new Error("Could not delete book");
      }
    };

    try {
      deleteBook();
      showSuccessToast(
        "Book deleted!",
        "Book has been deleted from your list."
      );
    } catch (error) {
      showErrorToast();
    }
  };

  return (
    <BookContext.Provider value={{ books, addBook, moveBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

const useBook = () => useContext(BookContext);

export { BookProvider, useBook };
