import loadImage from '../index';

describe('Image loader', () => {
  let image;

  beforeEach(() => {
    image = {
      width: 100,
      height: 200,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    document.createElement = jest.fn().mockReturnValue(image);
  });

  it('should resolve a promise when load method is called if image is loaded successfully', () => {
    const promise = loadImage('img.jpg');
    expect(document.createElement).toHaveBeenCalledWith('img');
    expect(image.addEventListener.mock.calls[0][0]).toEqual('load');
    expect(image.addEventListener.mock.calls[1][0]).toEqual('error');
    expect(image.src).toEqual('img.jpg');
    image.addEventListener.mock.calls[0][1]();
    expect(image.removeEventListener.mock.calls[0][0]).toEqual('load');
    expect(image.removeEventListener.mock.calls[1][0]).toEqual('error');
    return promise.then((size) => {
      expect(size).toEqual({ width: 100, height: 200 });
    });
  });

  it('should reject a promise when load method is called if image is not loaded successfully', () => {
    const promise = loadImage('img.jpg');
    image.addEventListener.mock.calls[1][1]();
    expect(image.removeEventListener.mock.calls[0][0]).toEqual('load');
    expect(image.removeEventListener.mock.calls[1][0]).toEqual('error');
    return promise.then().catch((error) => {
      expect(error.message).toEqual('Image cannot be loaded.');
    });
  });

  it('should resolve a promise if image is already loaded (cached)', () => {
    image.complete = true;
    const promise = loadImage('img.jpg');
    expect(image.removeEventListener.mock.calls[0][0]).toEqual('load');
    expect(image.removeEventListener.mock.calls[1][0]).toEqual('error');
    return promise.then((size) => {
      expect(size).toEqual({ width: 100, height: 200 });
    });
  });
});
