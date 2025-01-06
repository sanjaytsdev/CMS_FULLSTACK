import React, { useEffect, useState } from 'react'
import { getContact } from '../Services/ContactService'
import { Link, useParams } from 'react-router-dom'

const ViewContact = () => {
  const [contact, setContact] = useState([])
  const {id} = useParams()

  useEffect(() => {
    if(id) {
        getContact(id).then((res) => {
            setContact(res.data)
        }).catch(err => console.log(err))
    }
  }, [id])

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="card col-md-6">
        <h2 className="text-center mt-3">View Contact</h2>
        <div className="card-body">
          {contact ? (
            <div>
              <div className="form-group mb-3">
                <label className="form-label">Name:</label>
                <p className="form-control">{contact.name}</p>
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Email:</label>
                <p className="form-control">{contact.email}</p>
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Phone Number:</label>
                <p className="form-control">{contact.phoneNumber}</p>
              </div>
              <div className="form-group mb-4">
                <label className="form-label">Address:</label>
                <p className="form-control">{contact.address}</p>
              </div>
              <div className="text-center">
                <Link className="btn btn-outline-danger" to="/">
                  Back
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-center">Loading contact details...</p>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default ViewContact