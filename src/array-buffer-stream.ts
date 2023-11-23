export class ArrayBufferStream {
  /**
   * @type {ArrayBuffer}
   */
  buffer: ArrayBuffer
  offset = 0

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
    return this.offset >= this.buffer.byteLength
  }

  /**
   * Returns a number of bytes as ArrayBuffer copy.
   * @param byteLength bytes to read
   */
  readBytes(byteLength: number): ArrayBuffer {
    const bytes = this.buffer.slice(this.offset, this.offset + byteLength)
    this.offset += byteLength
    return bytes
  }

  readUint8() {
    const view = new DataView(this.buffer, this.offset, 1)
    this.offset += 1
    return view.getUint8(0)
  }

  readUint16LE() {
    const view = new DataView(this.buffer, this.offset, 2)
    this.offset += 2
    return view.getUint16(0, true)
  }
  
  readUint32LE() {
    const view = new DataView(this.buffer, this.offset, 4)
    this.offset += 4
    return view.getUint32(0, true)
  }

  readUint64LE() {
    const view = new DataView(this.buffer, this.offset, 8)
    this.offset += 8
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
    const view = new DataView(this.buffer, this.offset, byteLength)
    this.offset += byteLength
    const decoder = new TextDecoder('ascii')
    return decoder.decode(view)
  }

  /**
   * Returns a number of bytes as UTF16-LE string.
   * @param byteLength bytes to read
   */
  readUTF16LEString(byteLength: number) {
    const view = new DataView(this.buffer, this.offset, byteLength)
    this.offset += byteLength
    const decoder = new TextDecoder('utf-16le')
    return decoder.decode(view)
  }
}