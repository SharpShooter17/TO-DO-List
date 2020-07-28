package pl.dmcs.ujazdowski.todolist.rest;

import org.springframework.web.bind.annotation.*;
import pl.dmcs.ujazdowski.todolist.domain.ToDoList;
import pl.dmcs.ujazdowski.todolist.elasticsearch.ToDoListElasticsearchRepository;
import pl.dmcs.ujazdowski.todolist.repository.ToDoListRepository;

import java.util.Collection;

@RestController
@RequestMapping("/api/todo/")
public class ToDoRestController {

    private final ToDoListRepository repository;
    private final ToDoListElasticsearchRepository elasticsearch;

    public ToDoRestController(ToDoListRepository repository,
                              ToDoListElasticsearchRepository elasticsearch) {
        this.repository = repository;
        this.elasticsearch = elasticsearch;
    }

    @PostMapping
    public ToDoList save(@RequestBody ToDoList toDoList) {
        repository.save(toDoList);
        return elasticsearch.save(toDoList);
    }

    @GetMapping("{id}")
    public ToDoList get(@PathVariable String id) {
        return elasticsearch.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found To-Do list with id: " + id));
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        repository.deleteById(id);
        elasticsearch.deleteById(id);
    }

    @GetMapping("/search/")
    public Collection<ToDoList> search(@RequestParam("name") String name) {
        return elasticsearch.findByNameLike(name);
    }

}
