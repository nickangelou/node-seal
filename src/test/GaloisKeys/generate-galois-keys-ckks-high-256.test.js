describe('Generate GaloisKeys CKKS Scheme', () => {
  describe('computationLevel high', () => {
    test('256-bit security', async () => {
      const {Seal} = require('../../index.js')
      const Crypt = await Seal
      const parms = Crypt.createParams({computationLevel: 'high', security: 256})
      expect(parms).toEqual({
        polyDegree: 16384,
        coeffModulus: 16384,
        plainModulus: 786433,
        scale: Math.pow(2, 383),
        security: 256
      })
      Crypt.initialize({...parms, schemeType: 'CKKS'})
      expect(Crypt._Context.parametersSet()).toBe(true)

      // Gen Keys
      const spyGenKeys = jest.spyOn(Crypt, 'genKeys')
      Crypt.genKeys()
      expect(spyGenKeys).toHaveBeenCalled()

      // Gen Galois Keys
      const spyGenGaloisKeys = jest.spyOn(Crypt, 'genGaloisKeys')
      Crypt.genGaloisKeys()
      expect(spyGenGaloisKeys).toHaveBeenCalled()
    })
  })
})
