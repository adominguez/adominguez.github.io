# \<adom-demo-helper-properties\>

Is a component created for to be used in other demo components with properties

## Structure

With this component you can see your component demo and change his properties and his css var for show the result of component.

__example__

```html
<adom-demo-helper-properties id="view0" toast-events='["click-navigation-button"]' component-name="adom-card-color" properties-setted='[{"label": "color", "value": "#65a5f2", "color": "#65a5f2"}, {"label": "heading", "value": "title"}, {"label": "counter", "value": "4", "type": "number"}, {"label": "units", "value": "components"}, {"label": "icon", "selected": "0", "list": [{"value":"icons:view-module"}, {"value": "icons:view-carousel"}, {"value": "icons:touch-app"}, {"value": "icons:today"}]}, {"label": "reverse", "selected": "1", "list": [{"value": "false"}, {"value": "true"}]}]'>
  <adom-demo-marked>
  </demo-snippet>
</adom-demo-helper-properties>
```

## Properties

With the `properties-setted` property of cells-demo-helper-properties you can create an array with the properties of the component you want. You can see a complete example here:

```json
[{"label": "color", "value": "#65a5f2", "color": "#65a5f2"}, {"label": "heading", "value": "title"}, {"label": "counter", "value": "4", "type": "number"}, {"label": "units", "value": "components"}, {"label": "icon", "selected": "0", "list": [{"value":"icons:view-module"}, {"value": "icons:view-carousel"}, {"value": "icons:touch-app"}, {"value": "icons:today"}]}, {"label": "reverse", "selected": "1", "list": [{"value": "false"}, {"value": "true"}]}]
```

You can add diferents types of items:

### Use example input

```json
{"label": "heading", "value": "title", "type": "text"}
```

### Use example color

```json
{"label": "color", "value": "#65a5f2", "color": "#65a5f2"}
```

### Use example number

```json
{"label": "counter", "value": "4", "type": "number"}
```

### Use example select

```json
{"label": "icon", "selected": "0", "list": [{"value":"icons:view-module"}, {"value": "icons:view-carousel"}, {"value": "icons:touch-app"}, {"value": "icons:today"}]}
```

## css vars

Use the css vars contened in the file of component `component-name-styles.html`.

Map all the variables found in the file and display them in the demo.

The correct way to use the variables is as follows:

```scss
.my-class {
  display: block;
  box-sizing: border-box;
  background-color: var(--adom-card-color-bg-color, #00ff00);
  border-radius: var(--adom-card-color-border, 3px);
}
```

`var(--adom-card-color-bg-color, #00ff00);`
`border-radius: var(--adom-card-color-border, 3px);`

For show a Paint pot in the demo the end of the name of css var must be `color`.

## Events

With the property `toastEvents` it´s possible add all events of component, and show a toast when the event is listener.

```json
["one-event", "two-event"]
```

## Styling

The following custom properties and mixins are available for styling:

Custom property                           | Description                                             | Default  |
------------------------------------------|---------------------------------------------------------|----------|
--adom-demo-helper-properties                               | mixin for host                                          | {}       |
--adom-demo-helper-properties-toast-content-color           | color for contentColor                                  | green    |
--adom-demo-helper-properties-content-page                  | mixin for .contentPage class                            | {}       |
--adom-demo-helper-properties-content-page-info             | mixin for .contentPage__info class                      | {}       |
--adom-demo-helper-properties-content-page-info-heading     | mixin for .contentPage__info__heading class             | {}       |
--adom-demo-helper-properties-content-page-info-description | mixin for .contentPage__info__heading_description class | {}       |

## Serving your Application

You can serve your application with:

    $ gulp serve
