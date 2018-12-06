# Vanilla image loader

This is a simple loader images utility.

Any pull request for optimisations and new additions is more than welcome.

# Installing vanilla-image-loader

```
npm install vanilla-image-loader
    or
yarn add vanilla-image-loader
```

# Usage

```js
import loadImage from 'vanilla-image-loader';

loadImage('path/to/image')
    .then(({ width, height }) => {
        console.log(width, height);
    })
    .catch((error) => {
        console.log(error);
    };
```
