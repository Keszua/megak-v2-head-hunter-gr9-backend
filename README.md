### Konfiguracja środowiska
Na początek skopiuj plik `.example.env` do nowego pliku o nazwie `.env` i uzupełnij go o dane potrzebne do działania aplikacji.

### Instalacja zależności
Aby zainstalować zależności, należy wykonać polecenie:
```bash
$ npm install
```

### Uruchamianie aplikacji
Aby uruchomić aplikację, należy wykonać jedno z poleceń:
```bash 
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

### Swagger UI
Aby zobaczyć dokumentację API, należy wejść na adres: http://localhost:3001/api/docs

PS zwróć uwagę na port, który został ustawiony w pliku `.env` i w razie potrzeby popraw ścieżkę do Swagger UI.