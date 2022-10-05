package com.example.F1drivers.driver;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

// This interface allows you to interact with the database

public interface DriverRepository extends JpaRepository<Driver, Long> {
}