package com.example.F1drivers.driver;

import lombok.*;
//Driver Model

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Driver {
    private Long id;
    private String name;
    private String nationality;
    private Team team;
}


