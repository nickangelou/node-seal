import { Exception } from './exception'

export const EncryptionParameterQualifiers = ({ library }) => {
  const _Exception = Exception({ library })
  let _instance = null

  /**
   * @typedef {Object} EncryptionParameterQualifiers
   * @implements IEncryptionParameterQualifiers
   */

  /**
   * @interface IEncryptionParameterQualifiers
   */
  return {
    /**
     * Get the underlying WASM instance
     *
     * @private
     * @readonly
     * @name IEncryptionParameterQualifiers#instance
     * @type {instance}
     */
    get instance() {
      return _instance
    },

    /**
     * Inject this object with a raw WASM instance
     *
     * @private
     * @function
     * @name IEncryptionParameterQualifiers#inject
     * @param {Object} options Options
     * @param {instance} options.instance WASM instance
     */
    inject({ instance }) {
      if (_instance) {
        _instance.delete()
        _instance = null
      }
      _instance = instance
    },

    /**
     * Delete the underlying WASM instance.
     *
     * Should be called before dereferencing this object to prevent the
     * WASM heap from growing indefinitely.
     * @function
     * @name IEncryptionParameterQualifiers#delete
     */
    delete() {
      if (_instance) {
        _instance.delete()
        _instance = null
      }
    },

    /**
     * If the encryption parameters are set in a way that is considered valid by
     * Microsoft SEAL, the variable parameters_set is set to true.
     *
     * @readonly
     * @name IEncryptionParameterQualifiers#parametersSet
     * @type {Boolean}
     */
    get parametersSet() {
      try {
        return _instance.parametersSet
      } catch (e) {
        throw _Exception.safe({ error: e })
      }
    },

    /**
     * Tells whether FFT can be used for polynomial multiplication. If the
     * polynomial modulus is of the form X^N+1, where N is a power of two, then
     * FFT can be used for fast multiplication of polynomials modulo the polynomial
     * modulus. In this case the variable using_fft will be set to true. However,
     * currently Microsoft SEAL requires this to be the case for the parameters
     * to be valid. Therefore, parameters_set can only be true if using_fft is
     * true.
     *
     * @readonly
     * @name IEncryptionParameterQualifiers#usingFFT
     * @type {Boolean}
     */
    get usingFFT() {
      try {
        return _instance.usingFFT
      } catch (e) {
        throw _Exception.safe({ error: e })
      }
    },

    /**
     * Tells whether NTT can be used for polynomial multiplication. If the primes
     * in the coefficient modulus are congruent to 1 modulo 2N, where X^N+1 is the
     * polynomial modulus and N is a power of two, then the number-theoretic
     * transform (NTT) can be used for fast multiplications of polynomials modulo
     * the polynomial modulus and coefficient modulus. In this case the variable
     * using_ntt will be set to true. However, currently Microsoft SEAL requires
     * this to be the case for the parameters to be valid. Therefore, parameters_set
     * can only be true if using_ntt is true.
     *
     * @readonly
     * @name IEncryptionParameterQualifiers#usingNTT
     * @type {Boolean}
     */
    get usingNTT() {
      try {
        return _instance.usingNTT
      } catch (e) {
        throw _Exception.safe({ error: e })
      }
    },

    /**
     * Tells whether batching is supported by the encryption parameters. If the
     * plaintext modulus is congruent to 1 modulo 2N, where X^N+1 is the polynomial
     * modulus and N is a power of two, then it is possible to use the BatchEncoder
     * class to view plaintext elements as 2-by-(N/2) matrices of integers modulo
     * the plaintext modulus. This is called batching, and allows the user to
     * operate on the matrix elements (slots) in a SIMD fashion, and rotate the
     * matrix rows and columns. When the computation is easily vectorizable, using
     * batching can yield a huge performance boost. If the encryption parameters
     * support batching, the variable using_batching is set to true.
     *
     * @readonly
     * @name IEncryptionParameterQualifiers#usingBatching
     * @type {Boolean}
     */
    get usingBatching() {
      try {
        return _instance.usingBatching
      } catch (e) {
        throw _Exception.safe({ error: e })
      }
    },

    /**
     * Tells whether fast plain lift is supported by the encryption parameters.
     * A certain performance optimization in multiplication of a ciphertext by
     * a plaintext (Evaluator::multiply_plain) and in transforming a plaintext
     * element to NTT domain (Evaluator::transform_to_ntt) can be used when the
     * plaintext modulus is smaller than each prime in the coefficient modulus.
     * In this case the variable using_fast_plain_lift is set to true.
     *
     * @readonly
     * @name IEncryptionParameterQualifiers#usingFastPlainLift
     * @type {Boolean}
     */
    get usingFastPlainLift() {
      try {
        return _instance.usingFastPlainLift
      } catch (e) {
        throw _Exception.safe({ error: e })
      }
    },

    /**
     * Tells whether the coefficient modulus consists of a set of primes that
     * are in decreasing order. If this is true, certain modular reductions in
     * base conversion can be omitted, improving performance.
     *
     * @readonly
     * @name IEncryptionParameterQualifiers#usingDescendingModulusChain
     * @type {Boolean}
     */
    get usingDescendingModulusChain() {
      try {
        return _instance.usingDescendingModulusChain
      } catch (e) {
        throw _Exception.safe({ error: e })
      }
    },

    /**
     * Tells whether the encryption parameters are secure based on the standard
     * parameters from HomomorphicEncryption.org security standard.
     *
     * @readonly
     * @name IEncryptionParameterQualifiers#securityLevel
     * @type {SecurityLevel.none|SecurityLevel.tc128|SecurityLevel.tc192|SecurityLevel.tc256}
     */
    get securityLevel() {
      try {
        return _instance.securityLevel
      } catch (e) {
        throw _Exception.safe({ error: e })
      }
    }
  }
}
