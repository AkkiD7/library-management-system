import {Navbar} from "../components/Navbar";
import { BookList } from "../components/BookList";

const BooksPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <BookList />
        </div>
      </main>
    </div>
  );
};

export default BooksPage;
