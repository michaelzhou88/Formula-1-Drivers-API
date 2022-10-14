package com.example.F1drivers.driver;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Exposes the endpoints that the client can consume
@RequestMapping(path = "api/f1/drivers") // Directs to specified url path
@AllArgsConstructor
public class DriverController {

    private final DriverService driverService;

    // Create endpoint to return a list of drivers
    @GetMapping
    public List<Driver> getAllDrivers(){
        return driverService.getAllDrivers();
    }

    @PostMapping
    public void addDriver(@RequestBody Driver driver){
        driverService.addDriver(driver);
    }

    @DeleteMapping(path = "{driverId}")
    public void deleteDriver(@PathVariable("driverId") Long driverId) {
        driverService.deleteDriver(driverId);
    }
}
