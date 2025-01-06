import axios from 'axios'

const REST_API_BASE_URL = 'http://localhost:8080/api/contact'

export const listContacts = () => axios.get(REST_API_BASE_URL)

export const createContact = (contact) => axios.post(REST_API_BASE_URL, contact)

export const getContact = (contactid) => axios.get(REST_API_BASE_URL + '/' + contactid)

export const updateContact = (contactid, contact) => axios.put(REST_API_BASE_URL + '/' + contactid, contact)

export const deleteContact = (contactid, contact) => axios.delete(REST_API_BASE_URL + '/' + contactid)