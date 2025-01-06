import React, { useEffect, useState } from 'react'
import { getContact, updateContact } from '../Services/ContactService'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Toast from './Toast'

const EditContacts = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const {id} = useParams()

  useEffect(() => {
    if(id) {
        getContact(id).then((res) => {
            setName(res.data.name)
            setEmail(res.data.email)
            setPhoneNumber(res.data.phoneNumber)
            setAddress(res.data.address)
        }).catch(err => console.log(err))
    }
  }, [id])

  function saveContact(e) {
    e.preventDefault()
    const newErrors = validateForm();
    setErrors(newErrors);
    if(Object.keys(newErrors).length > 0) {
      return; 
    }
    const contact = { name, email, phoneNumber, address}
    console.log(contact)
    if(id) {
        updateContact(id, contact).then((res) => {
            console.log(res.data)
            toast.success("Contact updated Successfully")
                    setTimeout(()=>{
                      navigate("/contact");
                    },3000)
        }).catch(err => console.log(err))
    }
  }

  function validateForm() {
    const newErrors = {}
    const phoneRegex = /^[+]?[0-9]*$/ 
    const nameRegex = /^[a-zA-Z0-9\s]{0,40}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  
    if(name && !nameRegex.test(name)) {
      newErrors.name = 'Name can only contain up to 40 characters and no special characters.';
    }
  
    if(email && !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
  
    if(phoneNumber && !phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number can only contain "+" and numbers.';
    }
  
    if(!name && !email && !phoneNumber && !address) {
      newErrors.form = 'At least one field must be filled.';
    }
  
    return newErrors;
  }

  return (
    <div className='container mt-5'>
    <div className='row justify-content-center'>
      <div className='card col-md-6'>
        <h2 className='text-center mt-3'>Edit Contact</h2>
        <div className='card-body'>
          <form>
            <div className='form-group mb-3'>
              <label className='form-label'>Name</label>
              <input
                type='text'
                placeholder='Enter the Name'
                name='name'
                value={name}
                className='form-control'
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <small className='text-danger'>{errors.name}</small>}
            </div>
            <div className='form-group mb-3'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                placeholder='Enter the Email'
                name='email'
                value={email}
                className='form-control'
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <small className='text-danger'>{errors.email}</small>}
            </div>
            <div className='form-group mb-3'>
              <label className='form-label'>Phone Number</label>
              <input
                type='text'
                placeholder='Enter the Phone Number'
                name='phoneNumber'
                value={phoneNumber}
                className='form-control'
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && <small className='text-danger'>{errors.phoneNumber}</small>}
            </div>
            <div className='form-group mb-4'>
              <label className='form-label'>Address</label>
              <textarea
                className='form-control'
                placeholder='Enter the Address'
                name='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows='3'
              ></textarea>
              {errors.address && <small className='text-danger'>{errors.address}</small>}
            </div>
            {errors.form && <small className="text-danger d-block mb-3">{errors.form}</small>}
            <div className='text-center'>
              <button type='button' className='btn btn-outline-success' onClick={saveContact}>
                Save
              </button>
              <Link className='btn btn-outline-danger mx-2' to='/'>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Toast/>
  </div>  
  )
}

export default EditContacts