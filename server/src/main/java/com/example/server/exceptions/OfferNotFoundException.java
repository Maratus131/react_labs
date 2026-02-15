package com.example.server.exceptions;

public class OfferNotFoundException extends RuntimeException {
    public OfferNotFoundException(int id) {
        super("Offer with id " + id + " not found");
    }
}
