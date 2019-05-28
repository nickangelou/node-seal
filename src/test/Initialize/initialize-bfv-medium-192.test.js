describe('Initializing library for BFV Scheme', () => {
  describe('computationLevel medium', () => {
    test('192-bit security', async () => {
      const {Seal} = require('../../index.js')
      const Crypt = await Seal
      const parms = Crypt.createParams({computationLevel: 'medium', security: 192})
      expect(parms).toEqual({
        polyDegree: 8192,
        coeffModulus: 8192,
        plainModulus: 786433,
        scale: Math.pow(2, 163),
        security: 192
      })
      Crypt.initialize({...parms, schemeType: 'BFV'})
      expect(Crypt._Context.parametersSet()).toBe(true)
    })
  })
})
