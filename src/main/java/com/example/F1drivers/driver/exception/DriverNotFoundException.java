package com.example.F1drivers.driver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DriverNotFoundException extends RuntimeException{

    public DriverNotFoundException(String msg) {
        super(msg);
    }
}
