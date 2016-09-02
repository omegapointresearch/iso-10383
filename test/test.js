require('should');
const index = require('..');

describe('iso-10383', () => {
  describe('mics', () => {
    it('should be an Array', () => {
      index.mics.should.be.an.Array();
    });
    it('should include XNYS', () => {
      index.mics.indexOf('XNYS').should.be.greaterThan(0);
    });
  });

  describe('data', () => {
    it('should be an Object', () => {
      index.data.should.be.an.Object();
    });
    it('should include XNYS', () => {
      index.data.XNYS.MIC.should.equal('XNYS');
    });
  });
});
