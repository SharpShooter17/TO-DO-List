package pl.dmcs.ujazdowski.todolist.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.dmcs.ujazdowski.todolist.domain.ToDoList;

public interface ToDoListRepository extends MongoRepository<ToDoList, String> {

}
