/* eslint-disable no-use-before-define */

export default src =>
    new Promise((resolve, reject) => {
        const image = document.createElement('img');

        const loadComplete = () => {
            removeListeners(image);
            resolve({ width: image.width, height: image.height });
        };
        const loadError = () => {
            removeListeners(image);
            reject('Image loading error');
        };
        const addListeners = () => {
            image.addEventListener('load', loadComplete);
            image.addEventListener('error', loadError);
        };
        const removeListeners = () => {
            image.removeEventListener('load', loadComplete);
            image.removeEventListener('error', loadError);
        };

        addListeners(image);
        image.src = src;

        if (image.complete) {
            removeListeners(image);
            resolve({ width: image.width, height: image.height });
        }
    });
