import SEAL from '../throws_wasm_node_umd'
import { SEALLibrary } from 'implementation/seal'
let seal: SEALLibrary
beforeAll(async () => {
  seal = await SEAL()
})

describe('SchemeType', () => {
  test('It should be a static instance', () => {
    expect(seal.SchemeType).toBeDefined()
    expect(typeof seal.SchemeType.constructor).toBe('function')
    expect(seal.SchemeType).toBeInstanceOf(Object)
    expect(seal.SchemeType.constructor).toBe(Object)
    expect(seal.SchemeType.constructor.name).toBe('Object')
  })
  test('It should have properties', () => {
    expect(seal.SchemeType).toHaveProperty('none')
    expect(seal.SchemeType).toHaveProperty('BFV')
    expect(seal.SchemeType).toHaveProperty('CKKS')
  })
  test('It should return type none', () => {
    const schemeType = seal.SchemeType.none
    expect(schemeType).toBeDefined()
    expect(typeof schemeType.constructor).toBe('function')
    expect(schemeType).toBeInstanceOf(Object)
    expect(schemeType.constructor).toBe(seal.SchemeType.none.constructor)
    expect(seal.SchemeType.none.constructor.name).toBe('SchemeType_none')
  })
  test('It should return type BFV', () => {
    const schemeType = seal.SchemeType.BFV
    expect(schemeType).toBeDefined()
    expect(typeof schemeType.constructor).toBe('function')
    expect(schemeType).toBeInstanceOf(Object)
    expect(schemeType.constructor).toBe(seal.SchemeType.BFV.constructor)
    expect(seal.SchemeType.BFV.constructor.name).toBe('SchemeType_BFV')
  })
  test('It should return type CKKS', () => {
    const schemeType = seal.SchemeType.CKKS
    expect(schemeType).toBeDefined()
    expect(typeof schemeType.constructor).toBe('function')
    expect(schemeType).toBeInstanceOf(Object)
    expect(schemeType.constructor).toBe(seal.SchemeType.CKKS.constructor)
    expect(seal.SchemeType.CKKS.constructor.name).toBe('SchemeType_CKKS')
  })
})
