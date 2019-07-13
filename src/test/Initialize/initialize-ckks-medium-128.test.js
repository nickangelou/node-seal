describe('Initializing library for CKKS Scheme', () => {
  describe('computationLevel medium', () => {
    test('128-bit security', async () => {
      const {Seal} = require('../../index.js')
      const Crypt = await Seal
      const parms = Crypt.createParams({computationLevel: 'medium', security: 128})

      Crypt.initialize({...parms, schemeType: 'CKKS'})
      expect(Crypt.__Context.parametersSet()).toBe(true)
    })
  })
})
