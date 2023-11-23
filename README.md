This file was auto-generated with `zdoccer.js` 2.0.3

# Index

  - [@holzchopf/array-buffer-stream](#holzchopf-array-buffer-stream)
    - [`class ArrayBufferStream`](#class-arraybufferstream)
      - [`buffer: ArrayBuffer`](#buffer-arraybuffer)
      - [`cursor = 0`](#cursor-0)
      - [`constructor(buffer: ArrayBuffer)`](#constructor-buffer-arraybuffer)
      - [`eof(): boolean`](#eof-boolean)
      - [`append(buffer: ArrayBuffer)`](#append-buffer-arraybuffer)
      - [`readBytes(byteLength: number): ArrayBuffer`](#readbytes-bytelength-number-arraybuffer)
      - [`readUint8()`](#readuint8)
      - [`readUint16(littleEndian?: boolean | undefined)`](#readuint16-littleendian-boolean-undefined)
      - [`readUint32(littleEndian?: boolean | undefined)`](#readuint32-littleendian-boolean-undefined)
      - [`readBigUint64(littleEndian?: boolean | undefined)`](#readbiguint64-littleendian-boolean-undefined)
      - [`readUleb128()`](#readuleb128)
      - [`readInt8()`](#readint8)
      - [`readInt16(littleEndian?: boolean | undefined)`](#readint16-littleendian-boolean-undefined)
      - [`readInt32(littleEndian?: boolean | undefined)`](#readint32-littleendian-boolean-undefined)
      - [`readBigInt64(littleEndian?: boolean | undefined)`](#readbigint64-littleendian-boolean-undefined)
      - [`readLeb128()`](#readleb128)
      - [`readFloat32(littleEndian?: boolean | undefined)`](#readfloat32-littleendian-boolean-undefined)
      - [`readFloat64(littleEndian?: boolean | undefined)`](#readfloat64-littleendian-boolean-undefined)
      - [`readAsciiString(byteLength: number)`](#readasciistring-bytelength-number)
      - [`readUtf8String(byteLength: number)`](#readutf8string-bytelength-number)
      - [`readUtf16String(byteLength: number, littleEndian?: boolean | undefined)`](#readutf16string-bytelength-number-littleendian-boolean-undefined)
      - [`writeBytes(bytes: ArrayBuffer)`](#writebytes-bytes-arraybuffer)
      - [`writeUint8(value: number)`](#writeuint8-value-number)
      - [`writeUint16(value: number, littleEndian?: boolean | undefined)`](#writeuint16-value-number-littleendian-boolean-undefined)
      - [`writeUint32(value: number, littleEndian?: boolean | undefined)`](#writeuint32-value-number-littleendian-boolean-undefined)
      - [`writeBigUint64(value: bigint, littleEndian?: boolean | undefined)`](#writebiguint64-value-bigint-littleendian-boolean-undefined)
      - [`writeUleb128(value: number)`](#writeuleb128-value-number)
      - [`writeint8(value: number)`](#writeint8-value-number)
      - [`writeInt16(value: number, littleEndian?: boolean | undefined)`](#writeint16-value-number-littleendian-boolean-undefined)
      - [`writeInt32(value: number, littleEndian?: boolean | undefined)`](#writeint32-value-number-littleendian-boolean-undefined)
      - [`writeBigInt64(value: bigint, littleEndian?: boolean | undefined)`](#writebigint64-value-bigint-littleendian-boolean-undefined)
      - [`writeLeb128(value: number)`](#writeleb128-value-number)
      - [`writeFloat32(value: number, littleEndian?: boolean | undefined)`](#writefloat32-value-number-littleendian-boolean-undefined)
      - [`writeFloat64(value: number, littleEndian?: boolean | undefined)`](#writefloat64-value-number-littleendian-boolean-undefined)
      - [`writeAsciiString(string: string)`](#writeasciistring-string-string)
      - [`writeUtf8String(string: string)`](#writeutf8string-string-string)
      - [`writeUtf16String(string: string, littleEndian?: boolean | undefined)`](#writeutf16string-string-string-littleendian-boolean-undefined)
    - [`function joinArrayBuffers(buffers: ArrayBuffer[]): ArrayBuffer`](#function-joinarraybuffers-buffers-arraybuffer-arraybuffer)


---

*original Markdown from src/_preamble.md*

<div id="holzchopf-array-buffer-stream"></div><!-- alias: holzchopf-array-buffer-stream -->

# @holzchopf/array-buffer-stream

Provides a wrapper class that lets you access an ArrayBuffer like a stream, i.e. every read/write operation will move the cursor by the number of bytes read/written.

---

*transformed Javadoc from src/array-buffer-stream.ts*

<div id="class-arraybufferstream"></div><!-- alias: arraybufferstream -->

## `class ArrayBufferStream`


Main ArrayBufferStream class.


<div id="buffer-arraybuffer"></div><!-- alias: buffer -->

### `buffer: ArrayBuffer`


Underlying ArrayBuffer.


<div id="cursor-0"></div><!-- alias: cursor -->

### `cursor = 0`


Read/write position.


<div id="constructor-buffer-arraybuffer"></div><!-- alias: constructor -->

### `constructor(buffer: ArrayBuffer)`


Creates an ArrayBufferStream from an existing ArrayBuffer.


<div id="eof-boolean"></div><!-- alias: eof -->

### `eof(): boolean`


Returns whether the end of the stream is reached.


<div id="append-buffer-arraybuffer"></div><!-- alias: append -->

### `append(buffer: ArrayBuffer)`


Creates a new ArrayBuffer from this stream's buffer and the given one and sets it as this stream's buffer.
- *param* `buffer` &mdash; ArrayBuffer to append.


<div id="readbytes-bytelength-number-arraybuffer"></div><!-- alias: readbytes -->

### `readBytes(byteLength: number): ArrayBuffer`


Reads a number of bytes and returns them as ArrayBuffer copy.
- *param* `byteLength` &mdash; Bytes to read.


<div id="readuint8"></div><!-- alias: readuint8 -->

### `readUint8()`


Reads the next byte as unsigned 8 bit integer and returns it as number.


<div id="readuint16-littleendian-boolean-undefined"></div><!-- alias: readuint16 -->

### `readUint16(littleEndian?: boolean | undefined)`


Reads the next bytes as unsigned 16 bit integer and returns it as number.
- *param* `littleEndian` &mdash; If true, a little-endian value should be read.


<div id="readuint32-littleendian-boolean-undefined"></div><!-- alias: readuint32 -->

### `readUint32(littleEndian?: boolean | undefined)`


Reads the next bytes as unsigned 32 bit integer and returns it as number.
- *param* `littleEndian` &mdash; If true, a little-endian value should be read.


<div id="readbiguint64-littleendian-boolean-undefined"></div><!-- alias: readbiguint64 -->

### `readBigUint64(littleEndian?: boolean | undefined)`


Reads the next bytes as unsigned 64 bit integer and returns it as bigint.
- *param* `littleEndian` &mdash; If true, a little-endian value should be read.


<div id="readuleb128"></div><!-- alias: readuleb128 -->

### `readUleb128()`


Reads the next bytes as unsigned LEB128 value and returns it as number.


<div id="readint8"></div><!-- alias: readint8 -->

### `readInt8()`


Reads the next byte as signed 8 bit integer and returns it as number.


<div id="readint16-littleendian-boolean-undefined"></div><!-- alias: readint16 -->

### `readInt16(littleEndian?: boolean | undefined)`


Reads the next bytes as signed 16 bit integer and returns it as number.
- *param* `littleEndian` &mdash; If true, a little-endian value should be read.


<div id="readint32-littleendian-boolean-undefined"></div><!-- alias: readint32 -->

### `readInt32(littleEndian?: boolean | undefined)`


Reads the next bytes as signed 32 bit integer and returns it as number.
- *param* `littleEndian` &mdash; If true, a little-endian value should be read.


<div id="readbigint64-littleendian-boolean-undefined"></div><!-- alias: readbigint64 -->

### `readBigInt64(littleEndian?: boolean | undefined)`


Reads the next bytes as signed 64 bit integer and returns it as bigint.
- *param* `littleEndian` &mdash; If true, a little-endian value should be read.


<div id="readleb128"></div><!-- alias: readleb128 -->

### `readLeb128()`


Reads the next bytes as signed LEB128 value and returns it as number.


<div id="readfloat32-littleendian-boolean-undefined"></div><!-- alias: readfloat32 -->

### `readFloat32(littleEndian?: boolean | undefined)`


Reads the next bytes as 32 bit float and returns it as number.
- *param* `littleEndian` &mdash; If true, a little-endian value should be read.


<div id="readfloat64-littleendian-boolean-undefined"></div><!-- alias: readfloat64 -->

### `readFloat64(littleEndian?: boolean | undefined)`


Reads the next bytes as 64 bit float and returns it as number.
- *param* `littleEndian` &mdash; If true, a little-endian value should be read.


<div id="readasciistring-bytelength-number"></div><!-- alias: readasciistring -->

### `readAsciiString(byteLength: number)`


Reads a number of bytes as ASCII string and returns it as string.
- *param* `byteLength` &mdash; Bytes to read.


<div id="readutf8string-bytelength-number"></div><!-- alias: readutf8string -->

### `readUtf8String(byteLength: number)`


Reads a number of bytes as UTF8 string and returns it as string.
- *param* `byteLength` &mdash; Bytes to read.


<div id="readutf16string-bytelength-number-littleendian-boolean-undefined"></div><!-- alias: readutf16string -->

### `readUtf16String(byteLength: number, littleEndian?: boolean | undefined)`


Reads a number of bytes as UTF16 string and returns it as string.
- *param* `byteLength` &mdash; Bytes to read.
- *param* `littleEndian` &mdash; If true, a little-endian value should be read.


<div id="writebytes-bytes-arraybuffer"></div><!-- alias: writebytes -->

### `writeBytes(bytes: ArrayBuffer)`


Writes multiple bytes.
- *param* `bytes` &mdash; Bytes to write.


<div id="writeuint8-value-number"></div><!-- alias: writeuint8 -->

### `writeUint8(value: number)`


Writes an unsigned 8 bit integer.
- *param* `value` &mdash; The value to write.


<div id="writeuint16-value-number-littleendian-boolean-undefined"></div><!-- alias: writeuint16 -->

### `writeUint16(value: number, littleEndian?: boolean | undefined)`


Writes an unsigned 16 bit integer.
- *param* `value` &mdash; The value to write.
- *param* `littleEndian` &mdash; If true, a little-endian value should be written.


<div id="writeuint32-value-number-littleendian-boolean-undefined"></div><!-- alias: writeuint32 -->

### `writeUint32(value: number, littleEndian?: boolean | undefined)`


Writes an unsigned 32 bit integer.
- *param* `value` &mdash; The value to write.
- *param* `littleEndian` &mdash; If true, a little-endian value should be written.


<div id="writebiguint64-value-bigint-littleendian-boolean-undefined"></div><!-- alias: writebiguint64 -->

### `writeBigUint64(value: bigint, littleEndian?: boolean | undefined)`


Writes an unsigned 64 bit big integer.
- *param* `value` &mdash; The value to write.
- *param* `littleEndian` &mdash; If true, a little-endian value should be written.


<div id="writeuleb128-value-number"></div><!-- alias: writeuleb128 -->

### `writeUleb128(value: number)`


Writes an unsigned LEB128 value.
- *param* `value` &mdash; The value to write.


<div id="writeint8-value-number"></div><!-- alias: writeint8 -->

### `writeint8(value: number)`


Writes a signed 8 bit integer.
- *param* `value` &mdash; The value to write.


<div id="writeint16-value-number-littleendian-boolean-undefined"></div><!-- alias: writeint16 -->

### `writeInt16(value: number, littleEndian?: boolean | undefined)`


Writes a signed 16 bit integer.
- *param* `value` &mdash; The value to write.
- *param* `littleEndian` &mdash; If true, a little-endian value should be written.


<div id="writeint32-value-number-littleendian-boolean-undefined"></div><!-- alias: writeint32 -->

### `writeInt32(value: number, littleEndian?: boolean | undefined)`


Writes a signed 32 bit integer.
- *param* `value` &mdash; The value to write.
- *param* `littleEndian` &mdash; If true, a little-endian value should be written.


<div id="writebigint64-value-bigint-littleendian-boolean-undefined"></div><!-- alias: writebigint64 -->

### `writeBigInt64(value: bigint, littleEndian?: boolean | undefined)`


Writes a signed 64 bit big integer.
- *param* `value` &mdash; The value to write.
- *param* `littleEndian` &mdash; If true, a little-endian value should be written.


<div id="writeleb128-value-number"></div><!-- alias: writeleb128 -->

### `writeLeb128(value: number)`


Writes a signed LEB128 value.
- *param* `value` &mdash; The value to write.


<div id="writefloat32-value-number-littleendian-boolean-undefined"></div><!-- alias: writefloat32 -->

### `writeFloat32(value: number, littleEndian?: boolean | undefined)`


Writes a 32 bit float.
- *param* `value` &mdash; The value to write.
- *param* `littleEndian` &mdash; If true, a little-endian value should be written.


<div id="writefloat64-value-number-littleendian-boolean-undefined"></div><!-- alias: writefloat64 -->

### `writeFloat64(value: number, littleEndian?: boolean | undefined)`


Writes a 64 bit float.
- *param* `value` &mdash; The value to write.
- *param* `littleEndian` &mdash; If true, a little-endian value should be written.


<div id="writeasciistring-string-string"></div><!-- alias: writeasciistring -->

### `writeAsciiString(string: string)`


Writes a string as ASCII string.
- *param* `string` &mdash; String to write.


<div id="writeutf8string-string-string"></div><!-- alias: writeutf8string -->

### `writeUtf8String(string: string)`


Writes a string as UTF-8 string.
- *param* `string` &mdash; String to write.


<div id="writeutf16string-string-string-littleendian-boolean-undefined"></div><!-- alias: writeutf16string -->

### `writeUtf16String(string: string, littleEndian?: boolean | undefined)`


Writes a string as UTF-16 string.
- *param* `string` &mdash; String to write.




---

*transformed Javadoc from src/join-array-buffers.ts*

<div id="function-joinarraybuffers-buffers-arraybuffer-arraybuffer"></div><!-- alias: joinarraybuffers -->

## `function joinArrayBuffers(buffers: ArrayBuffer[]): ArrayBuffer`


Creates and returns a new ArrayBuffer by concatenating all of the buffers provided.
- *param* `buffers` &mdash; ArrayBuffers to join.


