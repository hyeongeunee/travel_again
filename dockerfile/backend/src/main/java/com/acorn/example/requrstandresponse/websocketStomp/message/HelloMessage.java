package com.acorn.example.requrstandresponse.websocketStomp.message;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HelloMessage {
  @JsonProperty("name")
  private String name;
  @JsonProperty("username")
  private String username;
}
