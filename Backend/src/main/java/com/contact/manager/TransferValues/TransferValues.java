package com.contact.manager.TransferValues;

import com.contact.manager.DTO.ContactDTO;
import com.contact.manager.Entities.Contact;

public class TransferValues {
    public static ContactDTO toContactDTO(Contact contact) {
        return new ContactDTO(contact.getId(), contact.getName(), contact.getEmail(), contact.getPhoneNumber(),
                contact.getAddress());
    }

    public static Contact toContactEntity(ContactDTO contactDto) {
        return new Contact(contactDto.getId(), contactDto.getName(), contactDto.getEmail(), contactDto.getPhoneNumber(),
                contactDto.getAddress());
    }
}
