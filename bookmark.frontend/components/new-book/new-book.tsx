"use client";

import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { on } from "events";
import { useBook } from "@/context/book-context";
import { BookStatus } from "@/types/book";

const NewBook = () => {
  const { addBook } = useBook();
  const schema = zod.object({
    title: zod
      .string()
      .trim()
      .min(3, {
        message: "Title must be at least 3 characters long",
      })
      .max(50, {
        message: "Title must be at most 50 characters long",
      }),
  });
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    const book = {
      id: Math.floor(Math.random() * 1000),
      title: data.title,
      status: BookStatus.TOREAD,
    };
    addBook(book);
    form.reset();
    form.clearErrors();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add New Book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>
            Fill the form below to add a new book to your collection
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-4">
                  <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg. Harry Potter and the Philosopher's Stone"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the title of the book you want to add
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="default" className="mr-2">
                Add Book
              </Button>
              <DialogClose>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    form.reset();
                    form.clearErrors();
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBook;
