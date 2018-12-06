/* eslint-disable no-use-before-define */
// @flow

export default (src: string): Promise<*> => (
  new Promise((resolve, reject) => {
    const image: HTMLImageElement = document.createElement('img');

    const loadComplete = () => {
      removeListeners();
      resolve({ width: image.width, height: image.height });
    };
    const loadError = () => {
      removeListeners();
      reject(Error('Image cannot be loaded.'));
    };
    const addListeners = () => {
      image.addEventListener('load', loadComplete);
      image.addEventListener('error', loadError);
    };
    const removeListeners = () => {
      image.removeEventListener('load', loadComplete);
      image.removeEventListener('error', loadError);
    };

    addListeners();
    image.src = src;

    if (image.complete) {
      loadComplete();
    }
  })
);
