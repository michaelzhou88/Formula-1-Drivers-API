package com.example.F1drivers.driver;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController // Exposes the endpoints that the client can consume
@RequestMapping(path = "api/f1/drivers") // Directs to specified url path
public class DriverController {
    // Create endpoint to return a list of drivers
    @GetMapping
    public List<Driver> getAllDrivers(){
        List<Driver> drivers = Arrays.asList(
                new Driver(1L, "Max Verstappen", "Netherlands", Team.RED_BULL_RACING),
                new Driver(2L, "Lewis Hamilton", "United Kingdom", Team.MERCEDES_AMG_F1)
        );
        return drivers;
    }
}
