import React, { useEffect, useState } from 'react'
import { listContacts, deleteContact } from '../Services/ContactService'
import { useNavigate } from 'react-router-dom'
import Toast from './Toast'
import { toast } from 'react-toastify'

const ListContacts = () => {
  const [contacts, setContacts] = useState([])
  const navigator = useNavigate()
  const sortedContacts = [...contacts].sort((a, b) => a.id - b.id);

  useEffect(() => {
    getAllContacts()
  }, []);

  function getAllContacts() {
    listContacts().then((res) => {
      setContacts(res.data);
    }).catch((err) => {
      console.error("Error fetching contacts:", err);
    });
  }

  function addNewContact() {
      navigator('/create')
  }

  function updateContact(id) {
    navigator(`/edit/${id}`)
  }

  function showContact(id) {
    navigator(`/view/${id}`)
  }

  function removeContact(id) {
    deleteContact(id).then((res) => {
       toast.success("Contact Deleted Successfully")
                          setTimeout(()=>{
                           getAllContacts()
                          },3000)
    }).catch((err) => console.log(err))
  }

  return (
    <div className='container'>
        <h2 className='text-center'>Contact List</h2>
        <div className="d-flex justify-content-end mb-3">
          <button type="button" className="btn btn-outline-primary" onClick={ addNewContact }>Add Contact</button>
        </div>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              sortedContacts.map((contact, index) => 
                <tr key={contact.id}>
                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.address}</td>
                  <td>
                    <button className='btn btn-info mx-2' onClick={() => showContact(contact.id)}>View</button>
                    <button className='btn btn-warning mx-2' onClick={() => updateContact(contact.id)}>Edit</button>
                    <button className='btn btn-danger mx-2' onClick={() => removeContact(contact.id)}>Delete</button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      <Toast/>
    </div>
  )
}

export default ListContacts