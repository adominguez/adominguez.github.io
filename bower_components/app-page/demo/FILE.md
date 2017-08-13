# Encabezado 1
## Encabezado 2
### Encabezado 3
#### Encabezado 4
##### Encabezado 5
###### Encabezado 6

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat nunc id bibendum pellentesque. Suspendisse nibh tortor, laoreet vitae rhoncus eget, vehicula ac lacus. Aenean iaculis, augue eu accumsan pulvinar, felis nibh congue justo, mollis tristique risus est at diam. Fusce vitae luctus turpis, vitae ornare ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer vitae elementum eros, ac finibus ante. Proin feugiat, quam sed mattis sodales, magna sapien malesuada libero, sit amet egestas enim metus sed justo. Morbi commodo mollis urna sit amet dignissim.


Al texto en Markdown puedes añadirle formato como **negrita** o *cursiva* de una manera muy sencilla.

### citas

> Un país, una civilización se puede juzgar por la forma en que trata a sus animales.  — Mahatma Gandhi

### tag

Esto es un tag en `una` o `varias palabras`.

### Listas

#### Lista desordenada
Este es un ejemplo de texto que da entrada a una lista genérica de elementos:

- Elemento 1
- Elemento 2
- Elemento 3

#### Sublista
Ejemplo de una lista con sublista

- Elemento de lista 1
- Elemento de lista 2
    - Elemento de lista 3
    - Elemento de lista 4
        - Elemento de lista 5
        - Elemento de lista 6

#### Lista ordenada

1. Elemento de lista 1
2.  Elemento de lista 2
    - Elemento de lista 3
    - Elemento de lista 4
        1. Elemento de lista 5
        2. Elemento de lista 6

### Códigos de bloque

~~~
Creando códigos de bloque.
Puedes añadir tantas líneas y párrafos como quieras.  
~~~

```html
<app-page readme="file.md">
  <content></content>
</app-page>
```

```js
(function(demo) {
  var foo = {
    type: Array,
    value: [{
      name: 'Alberto',
      lastname: 'dominguez'
    }],
  };
  for(var x= 0; x < foo.length; x++) {
    console.log(foo);
  };
  demo.open()
  function open() {
    if(!this.open) {
      Polymer.dom(this.root).querySelector('#foo');
      this.set('open', true)
    }
  };
})
```

```css
.foo {
  color: red;
  background: red;
}
```

### Cards

<card>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar eros vitae diam mattis, vitae hendrerit ipsum eleifend. Nulla facilisi. Sed vitae nulla sagittis, vestibulum risus ut, bibendum augue. Cras pretium sed sem sed tincidunt. In sed tortor quam. Etiam a neque dolor. Praesent mollis magna ut diam posuere, at hendrerit enim tempus. Curabitur dignissim magna nec congue fringilla.</p>

  <p>Cras vulputate non sem vitae vulputate. Suspendisse potenti. Maecenas dapibus elementum efficitur. Aliquam diam sem, convallis sed quam a, porta feugiat neque. Aliquam fringilla eleifend nulla, rhoncus hendrerit nisi maximus vitae. Vestibulum nisl tellus, fermentum sit amet lorem sed, vestibulum molestie ligula. Duis a magna tincidunt, ornare massa vel, molestie turpis. Quisque vitae suscipit sapien, at hendrerit magna. Cras a euismod ex.</p>
</card>

Reglas horizontales

***
---
___

### Enlaces

[enlace en línea](http://www.limni.net)

<http://www.limni.net>

### imágenes

![Texto alternativo](http://lorempixel.com/400/200/sports/)
