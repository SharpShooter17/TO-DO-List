package pl.dmcs.ujazdowski.todolist.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.Collection;

@Document(indexName = "to-do-list")
public class ToDoList {

    @Id
    private String id;

    private String name;

    private String description;

    private Collection<ToDoItem> items;

    public ToDoList() {
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Collection<ToDoItem> getItems() {
        return items;
    }

    public ToDoList setName(String name) {
        this.name = name;
        return this;
    }

    public ToDoList setItems(Collection<ToDoItem> items) {
        this.items = items;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public ToDoList setDescription(String description) {
        this.description = description;
        return this;
    }
}
