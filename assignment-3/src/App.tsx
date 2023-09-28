import './App.css'
import { useEffect, useState } from 'react'
import Header from './component/Header'
import MainHeader from './component/MainHeader'
import Backdrop from './component/ui/Backdrop'
import CreateModal from './component/ui/CreateModal'
import DeleteModal from './component/ui/DeleteModal'
import { useBookContext } from './context/bookContext'
import Pagnation from './component/Pagnation'

function App() {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const { books, setNameBookDelete } = useBookContext()
  const [page, setPage] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const len = books.length
    let newPage: number = 0

    if (len > 0) {
      newPage = len % 5 === 0 ? len / 5 : Math.floor(len / 5) + 1
    }

    setPage(newPage)
  }, [books])

  const data = books.slice((currentPage - 1) * 5, currentPage * 5)

  const closeModal = () => {
    setOpenDeleteModal(false)
    setOpenCreateModal(false)
  }

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
                    <button
                      className="btn-delete btn"
                      onClick={() => {
                        setOpenDeleteModal(true)
                        setNameBookDelete(item.name)
                      }}
                    >
                      Delete
                    </button>
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
  )
}

export default App
