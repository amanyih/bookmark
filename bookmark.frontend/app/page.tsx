import BookColumn from "@/components/book-column/book-column";
import { BookStatus } from "@/types/book";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BookColumn
        title="To Read"
        description="Books you want to read"
        action="Start "
        status={BookStatus.TOREAD}
        books={[
          {
            id: 1,
            title: "Originals",
          },
          {
            id: 2,
            title: "Never Split the Difference",
          },
        ]}
      />
      <BookColumn
        title="In Progress"
        status={BookStatus.READING}
        description="Books you are reading"
        action="Finish "
        books={[
          {
            id: 1,
            title: "Originals",
          },
        ]}
      />
      <BookColumn
        title="Finished"
        status={BookStatus.READ}
        description="Books you have finished reading"
        books={[
          {
            id: 1,
            title: "Originals",
          },
        ]}
      />
    </div>
  );
}
