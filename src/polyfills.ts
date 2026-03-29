// Polyfill for crypto.randomUUID for older browsers/environments
interface CryptoWithUUID {
  subtle?: SubtleCrypto | undefined;
  getRandomValues?: (
    array:
      | ArrayBufferView
      | Int8Array
      | Int16Array
      | Int32Array
      | Uint8Array
      | Uint16Array
      | Uint32Array
      | Uint8ClampedArray
      | Float32Array
      | Float64Array
      | DataView,
  ) =>
    | ArrayBufferView
    | Int8Array
    | Int16Array
    | Int32Array
    | Uint8Array
    | Uint16Array
    | Uint32Array
    | Uint8ClampedArray
    | Float32Array
    | Float64Array
    | DataView;
  randomUUID?: () => string;
}

interface WindowWithCrypto extends Window {
  crypto: Crypto & CryptoWithUUID;
}

const win = window as WindowWithCrypto;

if (!win.crypto) {
  (win as WindowWithCrypto).crypto = {} as Crypto & CryptoWithUUID;
}

if (!win.crypto.randomUUID) {
  win.crypto.randomUUID = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  } as (() => `${string}-${string}-${string}-${string}-${string}`) &
    (() => string);
}
