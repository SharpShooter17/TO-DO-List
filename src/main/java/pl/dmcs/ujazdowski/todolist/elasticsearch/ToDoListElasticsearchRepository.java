package pl.dmcs.ujazdowski.todolist.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import pl.dmcs.ujazdowski.todolist.domain.ToDoList;

import java.util.Set;

public interface ToDoListElasticsearchRepository extends ElasticsearchRepository<ToDoList, String> {

    Set<ToDoList> findByNameLike(String name);

}
