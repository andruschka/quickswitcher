# Quickswitcher 🚀
Quickly switch between routes or execute search with `ctrl + k` - (just like in slack).
Quickswitcher has no dependencies 😇

## Integration Examples
The CDN way
```html
<script src="https://unpkg.com/quickswitcher"></script>
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
          title: 'Trackings',
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
        title: 'Trackings',
      },
    ],
    defaultOption: (input) => { // will run search if no of the above options matches
      return {
        value: `/dashboard/trackings?search=${input}`,
        title: `Search for "${input}" in Trackings.`
      }
    },
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
    defaultOption: (inputVal) => {}, // (optional) provide a dynamic default option
    // (will be run if no one of the options are matches the input -
    // useful if you want to run a search then)
    run: Function, // (optional) if you want to use a js router or a custom function to switch routes
  }
}
```
