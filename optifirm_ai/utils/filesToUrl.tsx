export const convertFileToUrl = (file: File) => {
    if (!(file instanceof File)) {
      throw new TypeError("Expected a File object");
    }
    return URL.createObjectURL(file);
  }