# Quickswitcher 🚀
Quickly switch between routes with `ctrl + k` - Slack style.
Quickswitcher has no dependencies 😇

## Integration
The script-tag way
```html
<script src="node_modules/dist/quickswitcher.browser.js"></script>
<script>
  var qs = new QuickSwitcher({
    target: document.querySelector('#qs-root'),
    data: {
      options: [
        {
          value: '/dashboard/reporting',
          title: 'Reporting',
        },
        {
          value: '/dashboard/trackings',
          title: 'Sendungen',
        },
      ],
    },
  })
</script>
```

or commonjs style
```javascript
var QuickSwitcher = require('quickswitcher')
var qs = new QuickSwitcher({
  target: document.querySelector('#qs-root'),
  data: {
    options: [
      {
        value: '/dashboard/reporting',
        title: 'Reporting',
      },
      {
        value: '/dashboard/trackings',
        title: 'Sendungen',
      },
    ],
    run: function (newPath) { // use custom run Function, here with pageJS router
      page(newPath)
    },
  },
})
```
## Usage
Just presst `ctrl + k` and the Quickswitcher panel will fade in.  
Type something or navigate with arrow up / down and press enter.  
That's it 😎.

## Options
```javascript
{
  target: DOM.Element, // the panel will be rendered into this elemen
  data: {
    options: [
      {
        value: '/some/cool/route', // this will be set as the new path or be passed to the run Function
        title: 'Some Cool Route', // this will be visible in the panel
      },
      // ...
    ],
    run: Function, // (optional) if you want to use a js router or a custom function to switch routes
  }
}
```
