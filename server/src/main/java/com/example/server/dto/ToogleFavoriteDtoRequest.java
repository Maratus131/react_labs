package com.example.server.dto;

import lombok.Data;

@Data
public class ToogleFavoriteDtoRequest {
    private int offerId;
    private int status;
}
