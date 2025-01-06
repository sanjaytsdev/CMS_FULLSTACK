package com.contact.manager.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.contact.manager.DTO.ContactDTO;
import com.contact.manager.Entities.Contact;
import com.contact.manager.Exception.ContactNotFound;
import com.contact.manager.Repository.ContactRepo;
import com.contact.manager.TransferValues.TransferValues;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ContactService {

    private ContactRepo repo;

    public ContactDTO createContact(ContactDTO contactDTO) {
        Contact contact = TransferValues.toContactEntity(contactDTO);
        Contact newContact = repo.save(contact);
        return TransferValues.toContactDTO(newContact);
    }

    public ContactDTO getContactById(Long id) {
        Contact contact = repo.findById(id).orElseThrow(() -> new ContactNotFound("Contact does not exist with given ID : " + id));
        return TransferValues.toContactDTO(contact);
    }

    public List<ContactDTO> getAllContacts() {
        List<Contact> contacts = repo.findAll();
        return contacts.stream().map((contact) -> TransferValues.toContactDTO(contact)).collect(Collectors.toList());
    }

    public ContactDTO updateContact(Long id, ContactDTO updatedContact) {
        Contact contact = repo.findById(id).orElseThrow(() -> new ContactNotFound("Contact does not exist with given ID : " + id));
        contact.setName(updatedContact.getName());
        contact.setEmail(updatedContact.getEmail());
        contact.setPhoneNumber(updatedContact.getPhoneNumber());
        contact.setAddress(updatedContact.getAddress());
        Contact newUpdatedContact = repo.save(contact);
        return TransferValues.toContactDTO(newUpdatedContact);
    }

    public void deleteContact(@PathVariable Long id) {
        repo.findById(id).orElseThrow(() -> new ContactNotFound("Contact does not exist with given ID : " + id));
        repo.deleteById(id);
    }
}
