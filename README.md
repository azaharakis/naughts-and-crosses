# Netflix UI

Setup the project:
```
npm install
```

To run the project:
```
npm run dev
```
This command will start a webpack dev server on localhost:8080

I've chosen to use a flux implementation, to store the state of the application.
Doing so I feel it makes the application scalable for future updates or requirement changes,
especially if an API is introduced.

Traditionally I'd implement Karma using the jasmine lib for unit testing, however wasn't sure that was
neccessary for this exercise.


