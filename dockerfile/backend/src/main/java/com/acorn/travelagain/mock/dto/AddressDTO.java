package com.acorn.travelagain.mock.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressDTO {
    private String addr1;
    private String addr2;
}
