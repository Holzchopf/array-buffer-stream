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
   * Returns a number of bytes as ArrayBuffer copy.
   * @param byteLength bytes to read
   */
  readBytes(byteLength: number): ArrayBuffer {
    const bytes = this.buffer.slice(this.cursor, this.cursor + byteLength)
    this.cursor += byteLength
    return bytes
  }

  readUint8() {
    const view = new DataView(this.buffer, this.cursor, 1)
    this.cursor += 1
    return view.getUint8(0)
  }

  readUint16LE() {
    const view = new DataView(this.buffer, this.cursor, 2)
    this.cursor += 2
    return view.getUint16(0, true)
  }
  
  readUint32LE() {
    const view = new DataView(this.buffer, this.cursor, 4)
    this.cursor += 4
    return view.getUint32(0, true)
  }

  readUint64LE() {
    const view = new DataView(this.buffer, this.cursor, 8)
    this.cursor += 8
    return view.getBigUint64(0, true)
  }

  readLEB128() {
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
   * Returns a number of bytes as ascii string.
   * @param byteLength bytes to read
   */
  readAsciiString(byteLength: number) {
    const view = new DataView(this.buffer, this.cursor, byteLength)
    this.cursor += byteLength
    const decoder = new TextDecoder('ascii')
    return decoder.decode(view)
  }

  /**
   * Returns a number of bytes as UTF16-LE string.
   * @param byteLength bytes to read
   */
  readUTF16LEString(byteLength: number) {
    const view = new DataView(this.buffer, this.cursor, byteLength)
    this.cursor += byteLength
    const decoder = new TextDecoder('utf-16le')
    return decoder.decode(view)
  }
}