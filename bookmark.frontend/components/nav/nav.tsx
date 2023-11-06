import { ModeToggle } from "../theme-mode-toggle/them-toggle";
import NewBook from "../new-book/new-book";
const Nav = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white dark:bg-gray-800 shadow-md mb-16">
      <h1>Bookmark</h1>
      <div className="flex gap-4 items-center">
        <NewBook />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Nav;
