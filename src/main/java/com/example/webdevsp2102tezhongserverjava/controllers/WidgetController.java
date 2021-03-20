package com.example.webdevsp2102tezhongserverjava.controllers;

import com.example.webdevsp2102tezhongserverjava.models.Widget;
import com.example.webdevsp2102tezhongserverjava.services.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

//make everything under this controller can be access with http
@RestController
@CrossOrigin(origins = "*") // allow any domain
public class WidgetController {

    @Autowired
    WidgetService service;

    @PostMapping("/api/topics/{tid}/widgets")
    public Widget createWidgetForTopic(
            @PathVariable("tid") String topicId,
            @RequestBody Widget widget
    ) {
        return service.createWidgetForTopic(topicId, widget);
    }

    @GetMapping("/api/widgets")
    public List<Widget> findAllWidgets() {
        return service.findAllWidgets();
    }

    @GetMapping("/api/topics/{tid}/widgets")
    public List<Widget> findWidgetsForTopic(
            //pass the path variable as an argument
            @PathVariable("tid") String topicId
    ) {
        return service.findWidgetsForTopic(topicId);
    }
}