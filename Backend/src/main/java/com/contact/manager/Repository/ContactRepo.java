package com.contact.manager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.contact.manager.Entities.Contact;

public interface ContactRepo extends JpaRepository<Contact, Long> {

}
