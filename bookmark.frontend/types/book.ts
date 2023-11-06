export type BookType = {
  id: number;
  title: string;
  status: BookStatus;
};

export enum BookStatus {
  TOREAD = "toRead",
  READING = "reading",
  READ = "read",
}
