package pl.dmcs.ujazdowski.todolist.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePageController {

    @RequestMapping(value = {"", "/", "/index", "/index.html"})
    public String index() {
        return "index";
    }

}
