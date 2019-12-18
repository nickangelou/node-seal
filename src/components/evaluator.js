import { Exception } from './exception'
import { MemoryPoolHandle } from './memory-pool-handle'

/**
 * Evaluator
 * @typedef {Object} Evaluator
 * @constructor
 */
export const Evaluator = ({ library, context }) => {
  const _Exception = Exception({ library })
  const _MemoryPoolHandle = MemoryPoolHandle({ library })
  let _instance = null
  try {
    _instance = new library.Evaluator(context.instance)
  } catch (e) {
    // eslint-disable-next-line no-nested-ternary
    throw new Error(
      typeof e === 'number'
        ? _Exception.getHuman(e)
        : e instanceof Error
        ? e.message
        : e
    )
  }

  return {
    /**
     * Get the underlying wasm instance
     * @returns {instance} wasm instance
     * @private
     */
    get instance() {
      return _instance
    },

    /**
     * Inject this object with a raw wasm instance
     * @param {Object} options Options
     * @param {instance} options.instance - wasm instance
     * @private
     */
    inject({ instance }) {
      if (_instance) {
        _instance.delete()
        _instance = null
      }
      _instance = instance
    },

    /**
     * Negates a ciphertext and stores the result in the destination parameter.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to negate
     * @param {CipherText} options.destination - CipherText to store the negated result
     */
    negate({ encrypted, destination }) {
      try {
        _instance.negate(encrypted.instance, destination.instance)
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Adds two ciphertexts. This function adds together a and b
     * and stores the result in the destination parameter.
     * @param {Object} options Options
     * @param {CipherText} options.a - CipherText operand A
     * @param {CipherText} options.b - CipherText operand B
     * @param {CipherText} options.destination - CipherText destination to store the sum
     */
    add({ a, b, destination }) {
      try {
        _instance.add(a.instance, b.instance, destination.instance)
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Subtracts two ciphertexts. This function computes the difference of a
     * and b and stores the result in the destination parameter.
     * @param {Object} options Options
     * @param {CipherText} options.a - CipherText operand A
     * @param {CipherText} options.b - CipherText operand B
     * @param {CipherText} options.destination - CipherText destination to store the difference
     */
    sub({ a, b, destination }) {
      try {
        _instance.sub(a.instance, b.instance, destination.instance)
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Multiplies two ciphertexts. This functions computes the product of a
     * and b and stores the result in the destination parameter. Dynamic
     * memory allocations in the process are allocated from the memory pool pointed
     * to by the given MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.a - CipherText operand A
     * @param {CipherText} options.b - CipherText operand B
     * @param {CipherText} options.destination - CipherText destination to store the product
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    multiply({ a, b, destination, pool = _MemoryPoolHandle.global }) {
      try {
        _instance.multiply(a.instance, b.instance, destination.instance, pool)
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Squares a ciphertext. This functions computes the square of encrypted and
     * stores the result in the destination parameter. Dynamic memory allocations
     * in the process are allocated from the memory pool pointed to by the given
     * MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to square
     * @param {CipherText} options.destination - CipherText destination to store the squared result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    square({ encrypted, destination, pool = _MemoryPoolHandle.global }) {
      try {
        _instance.square(encrypted.instance, destination.instance, pool)
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Relinearizes a ciphertext. This functions relinearizes encrypted, reducing
     * its size down to 2, and stores the result in the destination parameter.
     * If the size of encrypted is K+1, the given relinearization keys need to
     * have size at least K-1. Dynamic memory allocations in the process are allocated
     * from the memory pool pointed to by the given MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to relinearize
     * @param {RelinKeys} options.relinKeys - RelinKey used to perform relinearization
     * @param {CipherText} options.destination - CipherText destination to store the relinearized result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    relinearize({
      encrypted,
      relinKeys,
      destination,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.relinearize(
          encrypted.instance,
          relinKeys.instance,
          destination.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Given a ciphertext encrypted modulo q_1...q_k, this function switches the
     * modulus down to q_1...q_{k-1} and stores the result in the destination
     * parameter. Dynamic memory allocations in the process are allocated from
     * the memory pool pointed to by the given MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to switch its modulus down
     * @param {CipherText} options.destination - CipherText destination to store the switched result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    cipherModSwitchToNext({
      encrypted,
      destination,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.cipherModSwitchToNext(
          encrypted.instance,
          destination.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Given a ciphertext encrypted modulo q_1...q_k, this function switches the
     * modulus down until the parameters reach the given parmsId and stores the
     * result in the destination parameter. Dynamic memory allocations in the process
     * are allocated from the memory pool pointed to by the given MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to switch its modulus down
     * @param {*} options.parmsId - Target parmsId to switch to
     * @param {CipherText} options.destination - CipherText destination to store the switched result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    cipherModSwitchTo({
      encrypted,
      parmsId,
      destination,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.cipherModSwitchTo(
          encrypted.instance,
          parmsId,
          destination.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Modulus switches an NTT transformed plaintext from modulo q_1...q_k down
     * to modulo q_1...q_{k-1} and stores the result in the destination parameter.
     * @param {Object} options Options
     * @param {PlainText} options.plain - PlainText to switch its modulus down
     * @param {PlainText} options.destination - PlainText destination to store the switched result
     */
    plainModSwitchToNext({ plain, destination }) {
      try {
        _instance.plainModSwitchToNext(plain.instance, destination.instance)
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Given an NTT transformed plaintext modulo q_1...q_k, this function switches
     * the modulus down until the parameters reach the given parmsId and stores
     * the result in the destination parameter.
     * @param {Object} options Options
     * @param {PlainText} options.plain - PlainText to switch its modulus down
     * @param {*} options.parmsId - Target parmsId to switch to
     * @param {PlainText} options.destination - PlainText destination to store the switched result
     */
    plainModSwitchTo({ plain, parmsId, destination }) {
      try {
        _instance.plainModSwitchTo(
          plain.instance,
          parmsId,
          destination.instance
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Given a ciphertext encrypted modulo q_1...q_k, this function switches the
     * modulus down to q_1...q_{k-1}, scales the message down accordingly, and
     * stores the result in the destination parameter. Dynamic memory allocations
     * in the process are allocated from the memory pool pointed to by the given
     * MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to rescale
     * @param {CipherText} options.destination - CipherText destination to store the rescaled result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    rescaleToNext({ encrypted, destination, pool = _MemoryPoolHandle.global }) {
      try {
        _instance.rescaleToNext(encrypted.instance, destination.instance, pool)
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Given a ciphertext encrypted modulo q_1...q_k, this function switches the
     * modulus down until the parameters reach the given parms_id, scales the message
     * down accordingly, and stores the result in the destination parameter. Dynamic
     * memory allocations in the process are allocated from the memory pool pointed
     * to by the given MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to rescale
     * @param {*} options.parmsId - Target parmsId to rescale to
     * @param {CipherText} options.destination - CipherText destination to store the rescaled result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    rescaleTo({
      encrypted,
      parmsId,
      destination,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.rescaleTo(
          encrypted.instance,
          parmsId,
          destination.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Exponentiates a ciphertext. This functions raises encrypted to a power and
     * stores the result in the destination parameter. Dynamic memory allocations
     * in the process are allocated from the memory pool pointed to by the given
     * MemoryPoolHandle. The exponentiation is done in a depth-optimal order, and
     * relinearization is performed automatically after every multiplication in
     * the process. In relinearization the given relinearization keys are used.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to exponentiate
     * @param {number} options.exponent - Positive integer to exponentiate the CipherText
     * @param {RelinKeys} options.relinKeys - RelinKeys used to perform relinearization after each exponentiation
     * @param {CipherText} options.destination - CipherText destination to store the exponentiated result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    exponentiate({
      encrypted,
      exponent,
      relinKeys,
      destination,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.exponentiate(
          encrypted.instance,
          exponent,
          relinKeys.instance,
          destination.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Adds a ciphertext and a plaintext. This function adds a ciphertext and
     * a plaintext and stores the result in the destination parameter. The plaintext
     * must be valid for the current encryption parameters.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText operand A
     * @param {PlainText} options.plain - PlainText operand B
     * @param {CipherText} options.destination - CipherText destination to store the sum
     */
    addPlain({ encrypted, plain, destination }) {
      try {
        _instance.addPlain(
          encrypted.instance,
          plain.instance,
          destination.instance
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Subtracts a plaintext from a ciphertext. This function subtracts a plaintext
     * from a ciphertext and stores the result in the destination parameter. The
     * plaintext must be valid for the current encryption parameters.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText operand A
     * @param {PlainText} options.plain - PlainText operand B
     * @param {CipherText} options.destination - CipherText destination to store the difference
     */
    subPlain({ encrypted, plain, destination }) {
      try {
        _instance.subPlain(
          encrypted.instance,
          plain.instance,
          destination.instance
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Multiplies a ciphertext with a plaintext. This function multiplies
     * a ciphertext with a plaintext and stores the result in the destination
     * parameter. The plaintext must be a valid for the current encryption parameters,
     * and cannot be identially 0. Dynamic memory allocations in the process are
     * allocated from the memory pool pointed to by the given MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText operand A
     * @param {PlainText} options.plain - PlainText operand B
     * @param {CipherText} options.destination - CipherText destination to store the product
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    multiplyPlain({
      encrypted,
      plain,
      destination,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.multiplyPlain(
          encrypted.instance,
          plain.instance,
          destination.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Transforms a plaintext to NTT domain. This functions applies the Number
     * Theoretic Transform to a plaintext by first embedding integers modulo the
     * plaintext modulus to integers modulo the coefficient modulus and then
     * performing David Harvey's NTT on the resulting polynomial. The transformation
     * is done with respect to encryption parameters corresponding to a given
     * parmsId. The result is stored in the destinationNtt parameter. For the
     * operation to be valid, the plaintext must have degree less than poly_modulus_degree
     * and each coefficient must be less than the plaintext modulus, i.e., the plaintext
     * must be a valid plaintext under the current encryption parameters. Dynamic
     * memory allocations in the process are allocated from the memory pool pointed
     * to by the given MemoryPoolHandle.
     * @param {Object} options Options
     * @param {PlainText} options.plain - PlainText to transform
     * @param {*} options.parmsId - target parmsId to perform NTT transformation
     * @param {PlainText} options.destinationNtt - PlainText destination to store the transformed result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    plainTransformToNtt({
      plain,
      parmsId,
      destinationNtt,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.plainTransformToNtt(
          plain.instance,
          parmsId,
          destinationNtt.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Transforms a ciphertext to NTT domain. This functions applies David Harvey's
     * Number Theoretic Transform separately to each polynomial of a ciphertext.
     * The result is stored in the destinationNtt parameter.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to transform
     * @param {CipherText} options.destinationNtt - CipherText destination to store the transformed result
     */
    cipherTransformToNtt({ encrypted, destinationNtt }) {
      try {
        _instance.cipherTransformToNtt(
          encrypted.instance,
          destinationNtt.instance
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Transforms a ciphertext back from NTT domain. This functions applies the
     * inverse of David Harvey's Number Theoretic Transform separately to each
     * polynomial of a ciphertext. The result is stored in the destination parameter.
     * @param {Object} options Options
     * @param {CipherText} options.encryptedNtt - CipherText to transform
     * @param {CipherText} options.destination - CipherText destination to store the transformed result
     */
    cipherTransformFromNtt({ encryptedNtt, destination }) {
      try {
        _instance.cipherTransformFromNtt(
          encryptedNtt.instance,
          destination.instance
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Applies a Galois automorphism to a ciphertext and writes the result to the
     * destination parameter. To evaluate the Galois automorphism, an appropriate
     * set of Galois keys must also be provided. Dynamic memory allocations in
     * the process are allocated from the memory pool pointed to by the given
     * MemoryPoolHandle.
     *
     * The desired Galois automorphism is given as a Galois element, and must be
     * an odd integer in the interval [1, M-1], where M = 2*N, and N = degree(poly_modulus).
     * Used with batching, a Galois element 3^i % M corresponds to a cyclic row
     * rotation i steps to the left, and a Galois element 3^(N/2-i) % M corresponds
     * to a cyclic row rotation i steps to the right. The Galois element M-1 corresponds
     * to a column rotation (row swap) in BFV, and complex conjugation in CKKS.
     * In the polynomial view (not batching), a Galois automorphism by a Galois
     * element p changes Enc(plain(x)) to Enc(plain(x^p)).
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to apply the automorphism
     * @param {number} options.galoisElt - Number representing the Galois element
     * @param {GaloisKeys} options.galoisKeys - GaloisKeys used to perform rotations
     * @param {CipherText} options.destination - CipherText destination to store the result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    applyGalois({
      encrypted,
      galoisElt,
      galoisKeys,
      destination,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.applyGalois(
          encrypted.instance,
          galoisElt,
          galoisKeys.instance,
          destination.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Rotates plaintext matrix rows cyclically. When batching is used with the
     * BFV scheme, this function rotates the encrypted plaintext matrix rows
     * cyclically to the left (steps > 0) or to the right (steps < 0) and writes
     * the result to the destination parameter. Since the size of the batched
     * matrix is 2-by-(N/2), where N is the degree of the polynomial modulus,
     * the number of steps to rotate must have absolute value at most N/2-1. Dynamic
     * memory allocations in the process are allocated from the memory pool pointed
     * to by the given MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to rotate rows
     * @param {number} options.steps - Int representing steps to rotate (negative = right, positive = left)
     * @param {GaloisKeys} options.galoisKeys - GaloisKeys used to perform rotations
     * @param {CipherText} options.destination - CipherText destination to store the rotated result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    rotateRows({
      encrypted,
      steps,
      galoisKeys,
      destination,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.rotateRows(
          encrypted.instance,
          steps,
          galoisKeys.instance,
          destination.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Rotates plaintext matrix columns cyclically. When batching is used with
     * the BFV scheme, this function rotates the encrypted plaintext matrix columns
     * cyclically, and writes the result to the destination parameter. Since the
     * size of the batched matrix is 2-by-(N/2), where N is the degree of the
     * polynomial modulus, this means simply swapping the two rows. Dynamic memory
     * allocations in the process are allocated from the memory pool pointed to
     * by the given MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to rotate columns
     * @param {GaloisKeys} options.galoisKeys - GaloisKeys used to perform rotations
     * @param {CipherText} options.destination - CipherText destination to store the rotated result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    rotateColumns({
      encrypted,
      galoisKeys,
      destination,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.rotateColumns(
          encrypted.instance,
          galoisKeys.instance,
          destination.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Rotates plaintext vector cyclically. When using the CKKS scheme, this function
     * rotates the encrypted plaintext vector cyclically to the left (steps > 0)
     * or to the right (steps < 0) and writes the result to the destination parameter.
     * Since the size of the batched matrix is 2-by-(N/2), where N is the degree
     * of the polynomial modulus, the number of steps to rotate must have absolute
     * value at most N/2-1. Dynamic memory allocations in the process are allocated
     * from the memory pool pointed to by the given MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to rotate the entire vector
     * @param {number} options.steps - Int representing steps to rotate (negative = right, positive = left)
     * @param {GaloisKeys} options.galoisKeys - GaloisKeys used to perform rotations
     * @param {CipherText} options.destination - CipherText destination to store the rotated result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    rotateVector({
      encrypted,
      steps,
      galoisKeys,
      destination,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.rotateVector(
          encrypted.instance,
          steps,
          galoisKeys.instance,
          destination.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    },

    /**
     * Complex conjugates plaintext slot values. When using the CKKS scheme, this
     * function complex conjugates all values in the underlying plaintext, and
     * writes the result to the destination parameter. Dynamic memory allocations
     * in the process are allocated from the memory pool pointed to by the given
     * MemoryPoolHandle.
     * @param {Object} options Options
     * @param {CipherText} options.encrypted - CipherText to complex conjugate
     * @param {GaloisKeys} options.galoisKeys - GaloisKeys used to perform rotations
     * @param {CipherText} options.destination - CipherText destination to store the conjugated result
     * @param {MemoryPoolHandle} [options.pool=MemoryPoolHandle.global] - Memory pool pointer
     */
    complexConjugate({
      encrypted,
      galoisKeys,
      destination,
      pool = _MemoryPoolHandle.global
    }) {
      try {
        _instance.complexConjugate(
          encrypted.instance,
          galoisKeys.instance,
          destination.instance,
          pool
        )
      } catch (e) {
        // eslint-disable-next-line no-nested-ternary
        throw new Error(
          typeof e === 'number'
            ? _Exception.getHuman(e)
            : e instanceof Error
            ? e.message
            : e
        )
      }
    }
  }
}
