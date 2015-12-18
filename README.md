angular-pretty-load
============

Load your images with style using Angular.

<img src="http://i.imgur.com/Z4VWtI3.gif">

## How it works

If you have information about the image in the server, and you can pass it along to the client, this library will help you in two different ways:

1. Resizes your `<img>` element so that you need to provide only one dimension (either width or height), and fills the missing one by calculating the aspect ratio, making it use the same amount of space it will use when fully loaded.
2. Creates a placeholder element of the color of your choosing (most likely, the predominant color of the image) that sits atop of your image, allowing you to transition beautifully into your picture.
3. Adds a class to the element that contains your image so you can know whether it has been fully loaded or not.

## Installation

Just Use Bower:

```shell
$ bower install https://github.com/platanus/angular-pretty-load.git
```

## A note about Lazy Loading

`angular-pretty-load` does NOT handle lazy loading of your images, but since it listens to the `naturalWidth` property of your image element, it will work with any lazy loading library that uses the `<img>` element itself.

If you are using Ionic, we recommend the [ion-image-lazy-load](https://github.com/paveisistemas/ionic-image-lazy-load) library. It's the one we are using in the GIF above and it works wonders.

## How to use

`angular-pretty-load` can take advantage of the following information:
- Dimensions of the image (width/height)
- Predominant color of the image

Use the following structure for every image you want to display. Of course, you can also use an array of images and `ng-repeat`.

```js
$scope.image = {
  width: 500,
  height: 300,
  color: '#FF506C',
  url: ''
};
```

```html

<div class="image-container" 
     pretty-load
     pretty-load-width="{{ image.width }}" 
     pretty-load-height="{{ image.height }}" 
     pretty-load-color="{{ image.color }}">
  <img ng-src="{{ image.url }}">
</div>

```

Finally, add the following CSS to your app:

```css
.pretty-loader {
  position: relative;
}

.pretty-loader .pretty-loader-overlay {
  opacity: 1;
  transition: opacity .3s ease;
}

.pretty-loader.pretty-loaded .pretty-loader-overlay {
  opacity: 0;
}
```

This will give you the exact same result you can see in the preview. 

Our recommended CSS is minimal and does not interfere on how you decide to display your images. It provides a nice fading effect that hides the colored placeholder and reveals your image underneath.

## CSS Classes

Every image container will be applied certain classes according to the state of the image inside.

- `.pretty-loader`: added when the directive is initialized
- `.pretty-loading`: added when the directive is initialized and it's removed when the image finishes loading
- `.pretty-loaded`: added when the image finishes loading

These are used in our example CSS and you can use them too to add more elements and display them at will (for example, a spinner icon) or create more complex transitions between these states.

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
