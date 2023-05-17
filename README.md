### Konfiguracja środowiska
Na początek skopiuj plik `.example.env` do nowego pliku o nazwie `.env` i uzupełnij go o dane potrzebne do działania aplikacji.

### Instalacja zależności
Aby zainstalować zależności, należy wykonać polecenie:
```bash
npm install
```

### Dodanie bazy danych
#### Samodzielny Import
Jeśli chcesz samodzielnie zaimportować bazę danych, skorzystaj z pliku SQL dostępnego w repozytorium. Przed przystąpieniem do importu, utwórz bazę danych o nazwie zgodnej z nazwą podaną w pliku `SQL`. Następnie, upewnij się, że uzupełniłeś plik `.env` danymi niezbędnymi do połączenia z bazą danych.

#### Użycie Dockera
Jeżeli posiadasz zainstalowanego Dockera, masz możliwość uruchomienia kontenera poprzez wykonanie skryptu:
```bash
npm run docker-db:run
```
Po uruchomieniu kontenera, otwórz PHPMyAdmin wpisując w przeglądarce adres http://localhost:8080/. Zaloguj się, korzystając z danych zawartych w pliku `.env.` Następnie, utwórz bazę danych o nazwie zgodnej z nazwą pliku SQL dostępnego w repozytorium. Na koniec, zaimportuj ten plik SQL do stworzonej bazy danych. Następnie, upewnij się, że uzupełniłeś plik `.env` danymi niezbędnymi do połączenia z bazą danych.

### Uruchamianie aplikacji
Aby uruchomić aplikację, należy wykonać jedno z poleceń:
```bash 
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod

```

### Swagger UI
Aby zobaczyć dokumentację API, należy wejść na adres: http://localhost:3001/api/docs

PS zwróć uwagę na port, który został ustawiony w pliku `.env` i w razie potrzeby popraw ścieżkę do Swagger UI.

## Instrukcja Obsługi użytkowania aplikacji
### Tworzenie Konta Admina
Aby stworzyć konto admina, użyj konsoli i wpisz następujące polecenie:

```bash
npm run console admin create <email> <hasło>
```
Zamień `<email>` i `<hasło>` na adres email i hasło, które chcesz używać dla konta admina. Pamiętaj, aby hasło było silne i zawierało kombinację liter, cyfr i znaków specjalnych.

Przykładowo:
```bash
npm run console admin create jakubkrol@megak.pl 'megaK!!@2023'
```

### Przykładowe dane logowania
#### Admin
```bash
email: jakubkrol@megak.pl
hasło: megaK!!@2023
```
#### HR
```bash
email:anna.kowalska@xyz.pl
hasło: Anna$2023
``` 
```bash
email:lukasz.nowak@abc.com
hasło: Lukasz$2023
```
```bash
email:katarzyna.wisniewska@def.net
hasło: Katarzyna$2023
```
#### Kandydat
```bash
email: jan.kowalski@example.com"
hasło: janK$2023
```
```bash
email: krzysztof.dudek@example.com
hasło: krzysztofD$2023
```
```bash     
email: adam.nowak@example.com
hasło: adamN$2023
```
