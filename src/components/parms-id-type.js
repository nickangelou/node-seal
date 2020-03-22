export const ParmsIdType = library => ({ Exception }) => (instance = null) => {
  const Constructor = library.ParmsIdType
  let _instance = createParms(instance)

  function createParms(instance) {
    if (instance) {
      const inst = new Constructor(instance)
      instance.delete()
      return inst
    } else {
      return new Constructor()
    }
  }

  /**
   * @implements ParmsIdType
   */

  /**
   * @interface ParmsIdType
   */
  return {
    /**
     * Get the underlying WASM instance
     *
     * @private
     * @readonly
     * @name ParmsIdType#instance
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
     * @name ParmsIdType#inject
     * @param {instance} instance WASM instance
     */
    inject(instance) {
      if (_instance) {
        _instance.delete()
        _instance = null
      }
      _instance = new Constructor(instance)
      instance.delete()
    },

    /**
     * Delete the underlying WASM instance.
     *
     * Should be called before dereferencing this object to prevent the
     * WASM heap from growing indefinitely.
     * @function
     * @name ParmsIdType#delete
     */
    delete() {
      if (_instance) {
        _instance.delete()
        _instance = null
      }
    },

    /**
     * The values of the current ParmsIdType as an Array of BigInts.
     *
     * @readonly
     * @name ParmsIdType#values
     * @type {Array<BigInt>}
     */
    get values() {
      try {
        const values = _instance.values()
        // eslint-disable-next-line no-undef
        return values.split(',').map(x => BigInt(x))
      } catch (e) {
        throw Exception.safe(e)
      }
    }
  }
}
