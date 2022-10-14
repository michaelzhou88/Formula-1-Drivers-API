package com.example.F1drivers.driver;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

// This interface allows you to interact with the database

public interface DriverRepository extends JpaRepository<Driver, Long> {
    @Query("" +
            "SELECT CASE WHEN COUNT(d) > 0 THEN " +
            "TRUE ELSE FALSE END " +
            "FROM Driver d " +
            "WHERE d.email = ?1"
    )
    Boolean selectExistingEmail(String email);
}