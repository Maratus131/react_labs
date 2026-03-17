package com.example.server.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ToogleFavoriteDtoRequest {
    private int offerId;
    private int status;
}
