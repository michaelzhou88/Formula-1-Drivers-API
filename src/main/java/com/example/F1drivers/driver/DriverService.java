package com.example.F1drivers.driver;

//This class handles all the logic

import com.example.F1drivers.driver.exception.BadRequestException;
import com.example.F1drivers.driver.exception.DriverNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@AllArgsConstructor
@Service
public class DriverService {

    private final DriverRepository driverRepository;

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public void addDriver(Driver driver) {
        // check if email is taken
        Boolean emailExists = driverRepository.selectExistingEmail(driver.getEmail());
        if (emailExists) {
            throw new BadRequestException(
                    "Email "  + driver.getEmail() + " taken");
        }
        driverRepository.save(driver);
    }

    public void deleteDriver(Long driverId) {
        // check if student exists
        if(!driverRepository.existsById(driverId)) {
            throw new DriverNotFoundException(
                    "Driver with id " + driverId + " does not exist"
            );
        }
        driverRepository.deleteById(driverId);
    }
}
