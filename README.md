# Head Hunter
Projekt grupy nr 9 etapu bonusowego drugiej edycji kursu [MegaK](https://www.megak.pl/).Jest to aplikacja webowa zbudowana na podstawie technologii full-stack.

## Opis projektu
Aplikacja "Head Hunter" została stworzona z myślą o łączeniu osób poszukujących pracy w branży IT, w szczególności młodych programistów zwanych Kursantami, z działami HR firm, w tym Headhunterami. Głównym celem aplikacji jest umożliwienie Kursantom zaprezentowania swoich umiejętności w zunifikowany sposób, a HR łatwe znalezienie odpowiednich kandydatów do pracy, przeprowadzenie z nimi rozmów i zaproponowanie współpracy.

Administracja aplikacją spoczywa na Administratorze, który zarządza dostępem do bazy Kursantów. Administrator ma możliwość określenia sposobu dostępu do bazy Kursantów, co daje mu kontrolę nad ilością "CV" pobieranych przez danego użytkownika z typem konta HR.

Kursanci rozpoczynają swoją ścieżkę w aplikacji od uzupełnienia swojego profilu, co może być wykonane podczas pierwszego logowania. Profil Kursanta zawiera różne informacje o jego umiejętnościach i doświadczeniu.

Osoby z działu HR, po zalogowaniu się do systemu, mają dostęp do tabeli zawierającej informacje dotyczące Kursantów. Tabela umożliwia wyszukiwanie i sortowanie po różnych kolumnach, a HR mają możliwość dodania wybranych Kursantów do listy "Do rozmowy". Ilość osób, które HR może dodać do tej listy, jest ograniczona.

Po dodaniu Kursantów do listy "Do rozmowy" HR ma możliwość podejmowania decyzji o zatrudnieniu danej osoby. Jeżeli HR zdecyduje się na zatrudnienie kogoś, informacja o tym jest wysyłana do Administratora.

Aplikacja obsługuje trzy role systemowe: Admin, Kursant i HR. Każda rola ma swoje specyficzne zadania i uprawnienia w systemie. Aplikacja jest dostępna wyłącznie po rejestracji i zalogowaniu, nie ma możliwości dostępu do systemu bez zalogowania. Rejestracja użytkowników jest wyłącznie zarządzana przez Administratora. Administrator ma możliwość dodania nowych użytkowników poprzez zaimportowanie listy Kursantów lub ręczne wprowadzenie danych pojedynczego użytkownika z działu HR.

## Technologie
### Frontend
- React
- TypeScript
- React Hook Forms
- Yup
- Tailwind CSS
### Backend
- NestJS
- TypeORM
- MySQL
- Swagger
- Docker

## Autorzy
Projekt został stworzony przez:

- Agnieszka | **Front-end Developer** | [GitHub](https://github.com/Annshka)
- Joanna | **Front-end Developer** | [GitHub](https://github.com/joannaFiolka)
- Maciej | **Front-end Developer** | [GitHub](https://github.com/MaJan433)
- Mateusz | **Back-end Developer** |  [GitHub](https://github.com/EckhartPL)
- Paweł | **Front-end Developer** | [GitHub](https://github.com/Muniox)
- Przemek | **Scrum Master/Full-stack Developer** | [GitHub](https://github.com/Przekol)

---
## Instalacja - Backend

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
