export class ArrayBufferStream {
  /**
   * Underlying ArrayBuffer
   */
  buffer: ArrayBuffer
  /**
   * Read/write position
   */
  cursor = 0

  /**
   * Creates an ArrayBufferStream from an existing ArrayBuffer.
   */
  constructor(buffer: ArrayBuffer) {
    this.buffer = buffer
  }

  /**
   * Returns whether the end of the stream is reached.
   */
  eof(): boolean {
    return this.cursor >= this.buffer.byteLength
  }

  /**
   * Reads a number of bytes and returns them as ArrayBuffer copy.
   * @param byteLength Bytes to read.
   */
  readBytes(byteLength: number): ArrayBuffer {
    const bytes = this.buffer.slice(this.cursor, this.cursor + byteLength)
    this.cursor += byteLength
    return bytes
  }

  /**
   * Reads the next byte as unsigned 8 bit integer and returns it as number.
   */
  readUint8() {
    const view = new DataView(this.buffer, this.cursor, 1)
    this.cursor += 1
    return view.getUint8(0)
  }

  /**
   * Reads the next bytes as unsigned 16 bit integer and returns it as number.
   * @param littleEndian If true, a little-endian value should be read.
   */
  readUint16(littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 2)
    this.cursor += 2
    return view.getUint16(0, littleEndian)
  }
  
  /**
   * Reads the next bytes as unsigned 32 bit integer and returns it as number.
   * @param littleEndian If true, a little-endian value should be read.
   */
  readUint32(littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 4)
    this.cursor += 4
    return view.getUint32(0, littleEndian)
  }

  /**
   * Reads the next bytes as unsigned 64 bit integer and returns it as bigint.
   * @param littleEndian If true, a little-endian value should be read.
   */
  readUint64(littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 8)
    this.cursor += 8
    return view.getBigUint64(0, littleEndian)
  }

  /**
   * Reads the next bytes as unsigned LEB128 value and returns it as number.
   */
  readUleb128() {
    let num = 0
    let shift = 0
    do {
      const byte = this.readUint8()
      // append next 7 bits to number
      num |= (byte & 0x7f) << shift
      // stop once highest bit is 0
      if (!(byte & 0x80)) break
      shift += 7
    } while (true)
    return num
  }

  /**
   * Reads the next byte as signed 8 bit integer and returns it as number.
   */
  readInt8() {
    const view = new DataView(this.buffer, this.cursor, 1)
    this.cursor += 1
    return view.getInt8(0)
  }

  /**
   * Reads the next bytes as signed 16 bit integer and returns it as number.
   * @param littleEndian If true, a little-endian value should be read.
   */
  readInt16(littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 2)
    this.cursor += 2
    return view.getInt16(0, littleEndian)
  }
  
  /**
   * Reads the next bytes as signed 32 bit integer and returns it as number.
   * @param littleEndian If true, a little-endian value should be read.
   */
  readInt32(littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 4)
    this.cursor += 4
    return view.getInt32(0, littleEndian)
  }

  /**
   * Reads the next bytes as signed 64 bit integer and returns it as bigint.
   * @param littleEndian If true, a little-endian value should be read.
   */
  readInt64(littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 8)
    this.cursor += 8
    return view.getBigInt64(0, littleEndian)
  }

  /**
   * Reads the next bytes as signed LEB128 value and returns it as number.
   */
  readLeb128() {
    let num = 0
    let shift = 0
    do {
      const byte = this.readUint8()
      // append next 7 bits to number
      num |= (byte & 0x7f) << shift
      shift += 7
      // stop once highest bit is 0
      if (!(byte & 0x80)) {
        // sign bit is second high order bit
        if (shift < 32 && (byte & 0x40)) {
          num |= (~0 << shift)
        }
        break
      }
    } while (true)
    return num
  }
  
  /**
   * Reads a number of bytes as ascii string and returns it as string.
   * @param byteLength Bytes to read.
   */
  readAsciiString(byteLength: number) {
    const view = new DataView(this.buffer, this.cursor, byteLength)
    this.cursor += byteLength
    const decoder = new TextDecoder('ascii')
    return decoder.decode(view)
  }

  /**
   * Reads a number of bytes as UTF16 string and returns it as string.
   * @param byteLength Bytes to read.
   * @param littleEndian If true, a little-endian value should be read.
   */
  readUtf16String(byteLength: number, littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, byteLength)
    this.cursor += byteLength
    const decoder = new TextDecoder(littleEndian ? 'utf-16le' : 'utf-16be')
    return decoder.decode(view)
  }


}