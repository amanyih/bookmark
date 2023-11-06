"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useBook } from "@/context/book-context";

interface BookProps {
  book: any;
  action?: string;
}

const Book = ({ book, action }: BookProps) => {
  const { deleteBook, moveBook } = useBook();
  return (
    <div className="p-4 mb-4 last:mb-0 border-b-2 border-gray-300 dark:border-gray-800 last:border-b-0 flex justify-between items-center">
      {book.title}
      <div className="flex gap-4 items-center">
        {action && (
          <Button
            variant="outline"
            size="sm"
            className="px-2"
            onClick={() => moveBook(book)}
          >
            {action}
          </Button>
        )}

        <TrashIcon
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hover:text-red-500 cursor-pointer"
          onClick={() => deleteBook(book)}
        />
      </div>
    </div>
  );
};

export default Book;
