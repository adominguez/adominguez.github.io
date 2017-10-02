# \<adom-demo-marked\>

adom-demo-marked is a component created for marked element into adom-demo-helper-properties

## Structure

With this component you can see the code used in your components.

__example__

```html
<adom-demo-marked>
  <template>
    <input type="date">
  </template>
</adom-demo-marked>
```

## Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--adom-demo-marked` | Mixin applied to the entire element | `{}`
`--adom-demo-marked-demo` | Mixin applied to just the demo section | `{}`
`--adom-demo-marked-code` | Mixin applied to just the code section | `{}`

## Serving your Application

You can serve your application with:

    $ gulp serve
