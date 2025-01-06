import './App.css'
import AddContacts from './Components/AddContacts'
import EditContacts from './Components/EditContacts'
import Footer from './Components/Footer'
import Header from './Components/Header'
import ListContacts from './Components/ListContacts'
import ViewContact from './Components/ViewContact'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path='/' element = { <ListContacts/> }></Route>
            <Route path='/contact' element = { <ListContacts/> }></Route>
            <Route path='/create' element = { <AddContacts/> }></Route>
            <Route path='/edit/:id' element = { <EditContacts/> }></Route>
            <Route path='/view/:id' element = { <ViewContact/> }></Route>
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
