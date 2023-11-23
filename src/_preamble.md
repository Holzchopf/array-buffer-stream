# @holzchopf/array-buffer-stream

Provides a wrapper class that lets you access an ArrayBuffer like a stream, i.e. every read/write operation will move the cursor by the number of bytes read/written.