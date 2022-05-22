export type ImageObject = {
  name: string
  file: File
  dataUrl: string
}

export function createImageObject(files: FileList): ImageObject {
  return {
    name: files[0].name,
    file: files[0],
    dataUrl: URL.createObjectURL(files[0]),
  }
}
