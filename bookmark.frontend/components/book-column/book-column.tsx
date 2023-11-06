"use client";

import { BookType } from "@/types/book";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useBook } from "@/context/book-context";
import Book from "../book/book";
import { BookStatus } from "@/types/book";

interface BookColumnProps {
  status: BookStatus;
  title: string;
  description: string;
  books: any[];
  action?: string;
}

const BookColumn = ({
  title,
  action,
  description,
  status,
}: BookColumnProps) => {
  const { books, moveBook } = useBook();
  const currentBooks: BookType[] = books[status];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-20rem)]">
          {books[status].map((book: BookType) => (
            <Book key={book.id} book={book} action={action} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BookColumn;
