package com.example.server.service;

import com.example.server.exceptions.ImageRequiredException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String ROOT = "uploads";

    public String saveImage(MultipartFile file, String folder) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new ImageRequiredException();
        }

        if (!file.getContentType().startsWith("image/")) {
            throw new IOException("Invalid file type: not an image");
        }

        String projectDir = System.getProperty("user.dir");
        File uploadDir = new File(projectDir + "/" + ROOT + "/" + folder);

        if (!uploadDir.exists()) {
            boolean created = uploadDir.mkdirs();
            if (!created) {
                throw new IOException("Failed to create upload directory");
            }
        }

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File destination = new File(uploadDir, filename);

        file.transferTo(destination);

        return folder + "/" + filename;
    }

    public String prepareUrl(String baseUrl, String imagePath) {
        if (imagePath == null || imagePath.isEmpty() || imagePath.startsWith("http")) {
            return imagePath;
        }
        String path = imagePath.startsWith("/") ? imagePath : "/" + imagePath;
        return baseUrl + "/static" + path;
    }
}
