Projekt lista TODO coś jak link + wyszukiwarka.
Technologie do wyboru:
-Spring
-Scala
-Kotlin
Dopięte do:
-Elasticsearch
-MongoDB lub Cassandra
Wymagania:


wyszukiwarka spięta z elasticsearch


dane składowane w dwóch miejscach, jedno to indeks elastica a drugie to mongo lub cassandra


Na ocenę 3:


dodanie zadania (zapis do elastica i bazy)


wyszukanie zadania (wyszukiwanie w indeksie elastica)


możliwość zmiany statusu zadania todo/done (aktualizacja w elasticu i bazie)


usunięcie zadania (aktualizacja w elasticu i bazie)


przełączanie się pomiędzy widokiem "all"/"todo"/"done", dane na tych widokach są zaciągane z bazy nie z elastica!


Na ocenę 4, to co wyżej plus:


możliwość wyszukiwania po polsku -> https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-stempel.html


sortowanie wyników po score bazującym na dacie oddania i tym czy jest TODO. Czyli sortowane po statusie (1. TODO, 2. DONE) a następnie po dacie dodania


wyświetlana ilość zadań dla poszczególnych kategorii ("all"/"todo"/"done")


możliwość bulk delete i bulk update. Zaznaczamy kilka zadań i przenosimy wszystkie do "done" lub "todo" lub usuwamy


Na ocenę 5, to co wyżej plus:


dodanie tagów dla poszczególnych zadań. Tagi są dodawane dynamicznie, wpisuję nazwę zadania i po wpisaniu # wyszukują mi się istniejące tagi lub po wpisaniu nowego i zatwierdzeniu enterem dodaje się tag.


możliwość przełączania się pomiędzy tagami


wyszukiwanie po tagach


możliwość usunięcia tagu