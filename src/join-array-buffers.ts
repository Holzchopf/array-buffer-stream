/**
 * Creates and returns a new ArrayBuffer by concatenating all of the buffers provided.
 * @param buffers ArrayBuffers to join.
 */
export function joinArrayBuffers(buffers: ArrayBuffer[]): ArrayBuffer {
  // total length
  const byteLength = buffers.reduce((acc, buffer) => {
    acc += buffer.byteLength
    return acc
  }, 0)
  const out = new Uint8Array(byteLength)
  // copy all sources to out buffer
  let offset = 0
  buffers.forEach((buffer) => {
    out.set(new Uint8Array(buffer), offset)
    offset += buffer.byteLength
  })
  return out.buffer
}