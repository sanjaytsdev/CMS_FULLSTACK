package com.contact.manager.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ContactNotFound extends RuntimeException{
    public ContactNotFound(String message) {
        super(message);
    }
}
