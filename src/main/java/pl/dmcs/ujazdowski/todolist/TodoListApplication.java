package pl.dmcs.ujazdowski.todolist;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackages = "pl.dmcs.ujazdowski.todolist.repository")
@EnableElasticsearchRepositories(basePackages = "pl.dmcs.ujazdowski.todolist.elasticsearch")
@SpringBootApplication
public class TodoListApplication {

    @Bean
    public RestHighLevelClient client() {
        ClientConfiguration clientConfiguration
                = ClientConfiguration.builder()
                .connectedTo("localhost:9200")
                .build();

        return RestClients.create(clientConfiguration).rest();
    }

    @Bean
    public ElasticsearchOperations elasticsearchTemplate(@Autowired RestHighLevelClient client) {
        return new ElasticsearchRestTemplate(client);
    }

    public static void main(String[] args) {
        SpringApplication.run(TodoListApplication.class, args);
    }

}
