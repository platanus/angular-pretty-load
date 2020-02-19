Angular Pretty Load directive
============

Load your images in style using Angular: add an overlay before and during the image load, with the **exact same position and dimensions** of the image.

| Without Angular Pretty Load    | With Angular Pretty Load    |
| ------------------------------ | --------------------------- |
| <img src="http://imgur.com/Zy5biXd.gif"> | <img src="http://imgur.com/vXBUNlU.gif"> |

## Angular Pretty is no longer maintained

We will leave the Issues open as a discussion forum only.
We do not guarantee a response from us in the Issues.
We are no longer accepting pull requests.

## Usage

### Installation

Just use Bower.

```
bower install angular-pretty-load --save
```

Then, inject it into your application:

```
angular.module('MyApp', ['platanus.prettyLoad']);
```

### Directive in html template

In order to use the most basic mode, you should specify both the width and height of the image in your CSS

```html
<img pretty-load ng-src="http://your.image.jpg">
```

#### Unknown image size

If one or both dimensions are not specified in your CSS, but the API you're consuming or the server behind can provide the original size use this:

```html
<img ng-src="{{image.src}}"
  pretty-load
  pretty-load-width="{{image.width}}"
  pretty-load-height="{{image.height}}">
```

The directive will not override properties given to the image (`width: 100%`), but it will complete both width and height based on the original image ratio.

#### Overlay Color

You can set a common overlay color for all images:

```css
.pretty-load-overlay {
  background-color: #333;
}
```

or customize it for every image:

```html
<img ng-src="{{image.src}}"
  pretty-load
  pretty-load-width="{{image.width}}"
  pretty-load-height="{{image.height}}"
  pretty-load-color="{{image.color}}">
```

#### Overlay Animation

You have total control on how to handle the CSS transition from the overlay to the final image.

This CSS will give you the same results as the demo:

```css
.pretty-load-overlay {
  opacity: 0;
}

.pretty-load-loading .pretty-load-overlay {
  opacity: 1;
  transition: opacity 0.5s ease;
}

.pretty-load-completed .pretty-load-overlay {
  opacity: 0;
  transition: opacity 1.7s ease;
}
```

### CSS Classes

The directive wraps the image inside a div element.  This container will have the following classes applied according to the state of the image inside:

- `.pretty-load-init`: added when the directive is initialized
- `.pretty-load-loading`: added when the directive is initialized and removed when the image finishes loading
- `.pretty-load-completed`: added when the image finishes loading

These are used in our example CSS and you can use them to control additional (for example, a spinner icon) or create more complex transitions between these states.

* Note: `angular-pretty-load` does not handle lazy loading. You would have to use an additional library for that.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Credits

Thank you [contributors](https://github.com/platanus/angular-pretty-load/graphs/contributors)!

<img src="http://platan.us/gravatar_with_text.png" alt="Platanus" width="250"/>

angular-pretty-load is maintained by [platanus](http://platan.us).

## License

© 2015 Platanus, SpA. It is free software and may be redistributed under the terms specified in the LICENSE file.
