import { LoaderOptions, Library } from './seal'

export type SchemeTypeDependencies = {
  (): SchemeTypeConstructorOptions
}

export type SchemeTypeConstructorOptions = {
  (): SchemeType
}

export type SchemeType = {
  readonly none: any
  readonly bfv: any
  readonly ckks: any
}

const SchemeTypeConstructor = (
  library: Library
): SchemeTypeDependencies => (): SchemeTypeConstructorOptions => (): SchemeType => {
  // Static methods
  const _none = library.SchemeType.none
  const _bfv = library.SchemeType.bfv
  const _ckks = library.SchemeType.ckks

  /**
   * @implements SchemeType
   */

  /**
   * @interface SchemeType
   */
  return {
    /**
     * Return the 'none' scheme type
     *
     * @readonly
     * @name SchemeType.none
     * @type {SchemeType.none}
     */
    get none() {
      /**
       * @typedef {SchemeType.none} SchemeType.none
       */
      return _none
    },

    /**
     * Return the 'bfv' scheme type
     *
     * @readonly
     * @name SchemeType.bfv
     * @type {SchemeType.bfv}
     */
    get bfv() {
      /**
       * @typedef {SchemeType.bfv} SchemeType.bfv
       */
      return _bfv
    },

    /**
     * Return the 'ckks' scheme type
     *
     * @readonly
     * @name SchemeType.ckks
     * @type {SchemeType.ckks}
     */
    get ckks() {
      /**
       * @typedef {SchemeType.ckks} SchemeType.ckks
       */
      return _ckks
    }
  }
}

export const SchemeTypeInit = ({
  loader
}: LoaderOptions): SchemeTypeDependencies => {
  const library: Library = loader.library
  return SchemeTypeConstructor(library)
}
