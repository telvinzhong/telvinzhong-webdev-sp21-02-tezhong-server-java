package com.example.webdevsp2102tezhongserverjava.services;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.PushBuilder;

@RestController
public class HelloWorld {
    @GetMapping("/hello")
    public String dayHi() {
        return "Hello World";
    }

    @GetMapping("/add/{A}/{B}")
    public int add(
            @PathVariable("A") int a,
            @PathVariable("B") int b) {
        return a + b;
    }

    @GetMapping("/my/hello/object")
    public HelloObject getHelloObject() {
        HelloObject h = new HelloObject();
        h.setId(123);
        h.setName("My Hello Object");
        return h;
    }
}