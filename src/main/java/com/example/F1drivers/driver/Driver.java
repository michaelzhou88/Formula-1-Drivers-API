package com.example.F1drivers.driver;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
//Driver Model

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Driver {
    @Id
    @SequenceGenerator(
            name = "driver_sequence",
            sequenceName = "driver_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "driver_sequence",
            strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotBlank
    @Column(nullable = false)
    private String name;
    @NotBlank
    @Column(nullable = false)
    private String nationality;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Team team;

    public Driver(String name, String nationality, Team team) {
        this.name = name;
        this.nationality = nationality;
        this.team = team;
    }
}


