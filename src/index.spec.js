import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import loadImage from './';

chai.use(sinonChai);

describe('Image loader', () => {
    const sandbox = sinon.sandbox.create();
    let image;

    beforeEach(() => {
        image = {
            width: 100,
            height: 200,
            addEventListener: sandbox.stub(),
            removeEventListener: sandbox.stub(),
        };
        sandbox.stub(document, 'createElement').returns(image);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should resolve a promise when load method is called if image is loaded successfully', () => {
        const promise = loadImage('img.jpg');
        expect(document.createElement).to.have.been.calledWith('img');
        expect(image.addEventListener.getCall(0).args[0]).to.equal('load');
        expect(image.addEventListener.getCall(1).args[0]).to.equal('error');
        expect(image.src).to.equal('img.jpg');
        image.addEventListener.getCall(0).args[1]();
        expect(image.removeEventListener.getCall(0).args[0]).to.equal('load');
        expect(image.removeEventListener.getCall(1).args[0]).to.equal('error');
        return promise.then((size) => {
            expect(size).to.eql({ width: 100, height: 200 });
        });
    });

    it('should reject a promise when load method is called if image is not loaded successfully', () => {
        const promise = loadImage('img.jpg');
        image.addEventListener.getCall(1).args[1]();
        expect(image.removeEventListener.getCall(0).args[0]).to.equal('load');
        expect(image.removeEventListener.getCall(1).args[0]).to.equal('error');
        return promise.then().catch((error) => {
            expect(error).to.eql('Image loading error');
        });
    });

    it('should resolve a promise if image is already loaded (cached)', () => {
        image.complete = true;
        const promise = loadImage('img.jpg');
        expect(image.removeEventListener.getCall(0).args[0]).to.equal('load');
        expect(image.removeEventListener.getCall(1).args[0]).to.equal('error');
        return promise.then((size) => {
            expect(size).to.eql({ width: 100, height: 200 });
        });
    });
});
