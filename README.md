# PatronJs [![npm version](https://badge.fury.io/js/jspatron.svg)](https://badge.fury.io/js/jspatron)

PatronJs is a framework based on the model view controller architecture, using ES5 async / await to render views and compile data, ideal for single page applications.
It is extensible where you can integrate libraries or create functionalities available throughout your application.


## Directories

- **directory - app /**
all controllers for the view are added.

- **directory - bootstrap /**
where the application is initialized and adds the accessible routes.

- **directory - config /**
add all project and framework configurations.

- **directory - public /**
public access to content.

- **directory - views /**
where the view is prepared and added to the main document.

## routes file - bootstrap / route.js


```typescript
route.has (url: string, option_controller: object | Function, method_execute: string)
```

**example**
```javascript
class IndexController extends MainController {
    constructor () {super ()}
    home() {
        return 'home'
    }
}

route.has ('/', IndexController, 'home')
```
or
```javascript
route.has ('/', {
    controller: IndexController,
    // load assets css or js
    load: {
        js: ['index'],
        css: []
    }
}, 'home')
```