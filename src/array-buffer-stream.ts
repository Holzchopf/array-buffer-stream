import { joinArrayBuffers } from "./join-array-buffers"

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
   * Creates a new ArrayBuffer from this stream's buffer and the given one and sets it as this stream's buffer.
   * @param buffer ArrayBuffer to append.
   */
  append(buffer: ArrayBuffer) {
    this.buffer = joinArrayBuffers([this.buffer, buffer])
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
  readBigUint64(littleEndian?: boolean | undefined) {
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
  readBigInt64(littleEndian?: boolean | undefined) {
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
   * Reads the next bytes as 32 bit float and returns it as number.
   * @param littleEndian If true, a little-endian value should be read.
   */
  readFloat32(littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 4)
    this.cursor += 4
    return view.getFloat32(0, littleEndian)
  }

  /**
   * Reads the next bytes as 64 bit float and returns it as number.
   * @param littleEndian If true, a little-endian value should be read.
   */
  readFloat64(littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 8)
    this.cursor += 8
    return view.getFloat64(0, littleEndian)
  }
  
  /**
   * Reads a number of bytes as ASCII string and returns it as string.
   * @param byteLength Bytes to read.
   */
  readAsciiString(byteLength: number) {
    const view = new DataView(this.buffer, this.cursor, byteLength)
    this.cursor += byteLength
    const decoder = new TextDecoder('ascii')
    return decoder.decode(view)
  }

  /**
   * Reads a number of bytes as UTF8 string and returns it as string.
   * @param byteLength Bytes to read.
   */
  readUtf8String(byteLength: number) {
    const view = new DataView(this.buffer, this.cursor, byteLength)
    this.cursor += byteLength
    const decoder = new TextDecoder('utf-8')
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

  /**
   * Writes multiple bytes.
   * @param bytes Bytes to write.
   */
  writeBytes(bytes: ArrayBuffer) {
    const byteLength = bytes.byteLength
    const srcView = new DataView(bytes, 0, byteLength)
    const dstView = new DataView(this.buffer, this.cursor, byteLength)
    for (let i = 0; i < byteLength; i++) {
      dstView.setInt8(i, srcView.getInt8(i))
    }
    this.cursor += byteLength
  }

  /**
   * Writes an unsigned 8 bit integer.
   * @param value The value to write.
   */
  writeUint8(value: number) {
    const view = new DataView(this.buffer, this.cursor, 1)
    this.cursor += 1
    view.setUint8(0, value)
  }

  /**
   * Writes an unsigned 16 bit integer.
   * @param value The value to write.
   * @param littleEndian If true, a little-endian value should be written.
   */
  writeUint16(value: number, littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 2)
    this.cursor += 2
    view.setUint16(0, value, littleEndian)
  }

  /**
   * Writes an unsigned 32 bit integer.
   * @param value The value to write.
   * @param littleEndian If true, a little-endian value should be written.
   */
  writeUint32(value: number, littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 4)
    this.cursor += 4
    view.setUint32(0, value, littleEndian)
  }

  /**
   * Writes an unsigned 64 bit big integer.
   * @param value The value to write.
   * @param littleEndian If true, a little-endian value should be written.
   */
  writeBigUint64(value: bigint, littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 8)
    this.cursor += 8
    view.setBigUint64(0, value, littleEndian)
  }

  /**
   * Writes an unsigned LEB128 value.
   * @param value The value to write.
   */
  writeUleb128(value: number) {
    value |= 0
    do {
      // write next 7 bits
      const byte = value & 0x7f
      value >>= 7
      // stop, if enough bits are written
      if (value === 0) {
        this.writeUint8(byte)
        break
      }
      this.writeUint8(byte | 0x80)
    } while (true)
  }

  /**
   * Writes a signed 8 bit integer.
   * @param value The value to write.
   */
  writeint8(value: number) {
    const view = new DataView(this.buffer, this.cursor, 1)
    this.cursor += 1
    view.setInt8(0, value)
  }

  /**
   * Writes a signed 16 bit integer.
   * @param value The value to write.
   * @param littleEndian If true, a little-endian value should be written.
   */
  writeInt16(value: number, littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 2)
    this.cursor += 2
    view.setInt16(0, value, littleEndian)
  }

  /**
   * Writes a signed 32 bit integer.
   * @param value The value to write.
   * @param littleEndian If true, a little-endian value should be written.
   */
  writeInt32(value: number, littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 4)
    this.cursor += 4
    view.setInt32(0, value, littleEndian)
  }

  /**
   * Writes a signed 64 bit big integer.
   * @param value The value to write.
   * @param littleEndian If true, a little-endian value should be written.
   */
  writeBigInt64(value: bigint, littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 8)
    this.cursor += 8
    view.setBigInt64(0, value, littleEndian)
  }

  /**
   * Writes a signed LEB128 value.
   * @param value The value to write.
   */
  writeLeb128(value: number) {
    value |= 0
    do {
      // write next 7 bits
      const byte = value & 0x7f
      value >>= 7
      // stop, if enough bits are written
      if (value === 0 && !(byte & 0x40) || value === ~0 && (byte & 0x40)) {
        this.writeUint8(byte)
        break
      }
      this.writeUint8(byte | 0x80)
    } while (true)
  }

  /**
   * Writes a 32 bit float.
   * @param value The value to write.
   * @param littleEndian If true, a little-endian value should be written.
   */
  writeFloat32(value: number, littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 4)
    this.cursor += 4
    view.setFloat32(0, value, littleEndian)
  }

  /**
   * Writes a 64 bit float.
   * @param value The value to write.
   * @param littleEndian If true, a little-endian value should be written.
   */
  writeFloat64(value: number, littleEndian?: boolean | undefined) {
    const view = new DataView(this.buffer, this.cursor, 8)
    this.cursor += 8
    view.setFloat64(0, value, littleEndian)
  }

  /**
   * Writes a string as ASCII string.
   * @param string String to write.
   */
  writeAsciiString(string: string) {
    const byteLength = string.length
    const view = new DataView(this.buffer, this.cursor, byteLength)
    for (let i = 0; i < byteLength; i++) {
      view.setUint8(i, string.charCodeAt(i))
    }
    this.cursor += byteLength
  }

  /**
   * Writes a string as UTF-8 string.
   * @param string String to write.
   */
  writeUtf8String(string: string) {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(string)
    const byteLength = bytes.byteLength
    const view = new DataView(this.buffer, this.cursor, byteLength)
    for (let i = 0; i < byteLength; i++) {
      view.setUint8(i, bytes[i])
    }
    this.cursor += byteLength
  }

  /**
   * Writes a string as UTF-16 string.
   * @param string String to write.
   */
  writeUtf16String(string: string, littleEndian?: boolean | undefined) {
    const length = string.length
    const byteLength = length * 2
    const view = new DataView(this.buffer, this.cursor, byteLength)
    for (let i = 0; i < length; i++) {
      view.setUint16(i * 2, string.charCodeAt(i), littleEndian)
    }
    this.cursor += byteLength
  }
}