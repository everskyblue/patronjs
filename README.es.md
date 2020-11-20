# PatronJs [![npm version](https://badge.fury.io/js/jspatron.svg)](https://badge.fury.io/js/jspatron)

PatronJs es framework basado el la arquitectura modelo vista controlador, utilizando ES5 async/await para renderisar vistas y compilar datos.ideal para aplicaciones de una sola pagina.
Es extensible donde pueden integrar librerias o crear funcionalidades disponible en toda tu aplicacion.


## Directorios

- **directorio - app/**
se añaden todos los controladores para la vista.

- **directorio - bootstrap/**
donde se inicializa la aplicacion y añade las rutas accesibles.

- **directorio - config/**
añade todas las configuraciones del proyecto y del framework.

- **directorio - public/**
acceso publico del contenido.

- **directorio - views/**
donde se prepara la vista y se añade al documento principal.

## archivo de rutas - bootstrap/route.js


```typescript
route.has(url: string, option_controller: object | Function, method_execute: string)
```

**ejemplo**
```javascript
class IndexController extends MainController {
    constructor() { super() }
    home() {
        return 'home'
    }
}

route.has('/', IndexController, 'home')
```
otro uso

```javascript
route.has('/', {
    controller: IndexController,
    // load assets css or js
    load: {
        js: ['index'],
        css: []
    }
}, 'home')
```