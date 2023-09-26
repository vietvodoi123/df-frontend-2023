import "./App.css";
import Header from "./component/Header";
import MainHeader from "./component/MainHeader";
import { useEffect, useState } from "react";
import Backdrop from "./component/ui/Backdrop";
import CreateModal from "./component/ui/CreateModal";
import DeleteModal from "./component/ui/DeleteModal";
import { useBookContext } from "./context/bookContext";
import Pagnation from "./component/Pagnation";

function App() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { books, setNameBookDelete } = useBookContext();
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const calcPage = () => {
    console.log(books.length);
    const len = books.length;
    if (len > 0) {
      len % 5 === 0 ? setPage(len / 5) : setPage(Math.floor(len / 5) + 1);
    } else {
      setPage(0);
    }
  };
  useEffect(() => {
    calcPage();
  }, [books]);

  const data = books.slice((currentPage - 1) * 5, currentPage * 5);

  const closeModal = () => {
    setOpenDeleteModal(false);
    setOpenCreateModal(false);
  };

  return (
    <>
      <Header />
      <main className="container main">
        <MainHeader setOpenCreate={setOpenCreateModal} />
        <section>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Topic</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="tbody">
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.author}</td>
                  <td>{item.topic}</td>
                  <td>
                    <p
                      className="btn-delete"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setNameBookDelete(item.name);
                      }}
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {page === 0 ? (
            <p className="not-found border-2px-solid">Not found book</p>
          ) : (
            <Pagnation
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              page={page}
            />
          )}
        </section>
      </main>
      {(openCreateModal || openDeleteModal) && (
        <Backdrop closeModal={closeModal} />
      )}
      {openCreateModal && <CreateModal closeModal={closeModal} />}
      {openDeleteModal && <DeleteModal closeModal={closeModal} />}
    </>
  );
}

export default App;
