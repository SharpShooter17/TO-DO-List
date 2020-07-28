package pl.dmcs.ujazdowski.todolist.domain;

public class ToDoItem {

    private String title;
    private String description;
    private boolean completed;

    public ToDoItem() {
    }

    public ToDoItem(String title, String description, boolean completed) {
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    public String getTitle() {
        return title;
    }

    public ToDoItem setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public ToDoItem setDescription(String description) {
        this.description = description;
        return this;
    }

    public boolean isCompleted() {
        return completed;
    }

    public ToDoItem setCompleted(boolean completed) {
        this.completed = completed;
        return this;
    }
}
