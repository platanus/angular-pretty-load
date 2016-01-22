Angular Pretty Load directive
============

Load your images with style using Angular. An overlay is added, before and during the image load, in the **exact same position and dimensions** of the image.

| Without Angular Pretty Load    | With Angular Pretty Load    |
| ------------------------------ | --------------------------- |
| <img src="http://imgur.com/Zy5biXd.gif"> | <img src="http://imgur.com/vXBUNlU.gif"> |


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

When image width and height are specified in your css

```html
<img pretty-load ng-src="http://your.image.jpg">
```

#### Unknown image size

When both image dimensions are not specified in css, but somehow, the API your consuming or the server behind could provide the original size.

```html
<img ng-src="{{image.src}}"
  pretty-load
  pretty-load-width="{{image.width}}"
  pretty-load-height="{{image.height}}">
```

The directive will not override properties given to the image (`width: 100%`), but based on the original ratio, it will complete both width and height.

#### Overlay Color

You can set a common overlay color

```css
.pretty-load-overlay {
  background-color: #333;
}
```

or custom to every image

```html
<img ng-src="{{image.src}}"
  pretty-load
  pretty-load-width="{{image.src}}"
  pretty-load-height="{{image.src}}"
  pretty-load-color="{{image.color}}">
```

#### Overlay Animation

There's absolute freedom on how is the transition from the overlay to the loaded image.

To get the same effect of the demo, set this on your css

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

#### A note about Lazy Loading

`angular-pretty-load` does NOT handle lazy loading of your images, but since it listens to the `naturalWidth` property of your image element, it will work with any lazy loading library that uses the `<img>` element itself.

If you are using Ionic, we recommend the [ion-image-lazy-load](https://github.com/paveisistemas/ionic-image-lazy-load) library. It's the one we are using in the GIF above and it works wonders.

### CSS Classes

The directive wrap the image with a `inline-block` div. This container will be applied certain classes according to the state of the image inside.

- `.pretty-load-init`: added when the directive is initialized
- `.pretty-load-loading`: added when the directive is initialized and it's removed when the image finishes loading
- `.pretty-load-completed`: added when the image finishes loading

These are used in our example CSS and you can use them too to add more elements and display them at will (for example, a spinner icon) or create more complex transitions between these states.

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
