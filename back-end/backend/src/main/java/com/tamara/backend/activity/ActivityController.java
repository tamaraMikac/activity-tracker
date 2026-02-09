package com.tamara.backend.activity;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin( origins = "http://localhost:3000")

public class ActivityController {
    private final ActivityRepository rep;

    public ActivityController(ActivityRepository rep) {
        this.rep = rep;
    }

    @GetMapping
    public List<Activity> getAll() {
        return rep.findAll();
    }

    @PostMapping
    public Activity create(@Valid @RequestBody Activity activity){
        return rep.save(activity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id ){
        rep.deleteById(id);
    }
}
