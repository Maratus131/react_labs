package com.example.server.exceptions;

public class ImageRequiredException extends RuntimeException {
    public ImageRequiredException() {
        super("Image is required to upload");
    }
}
