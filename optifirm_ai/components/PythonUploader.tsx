'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import { useDropzone } from 'react-dropzone'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { useState } from 'react'

import { convertFileToUrl } from '@/utils/filesToUrl'

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  fileName: string
  setFiles: Dispatch<SetStateAction<File[]>>
  uploadToIpfs: any
}

const PythonUploader = ({ fileName, onFieldChange, setFiles, uploadToIpfs }: FileUploaderProps) => {
  const [acceptedFileName, setAcceptedFileName] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Accepted files:", acceptedFiles); // Log accepted files
    setFiles(acceptedFiles);
    onFieldChange(acceptedFiles[0].name);
    setAcceptedFileName(acceptedFiles[0].name);
    console.log(acceptedFiles)
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["text/x-python", "application/x-python-code"]),
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50 md:min-w-[450px] max-h-1/3">
      <input {...getInputProps()} className="cursor-pointer" />

      {acceptedFileName ? (
        <div className="flex items-center justify-center flex-col py-5 bg-secondary bg-opacity-20 p-10 h-full bg-blue-950">
          <h3 className="mb-6 mt-2 font-semibold text-primary">File Uploaded!</h3>
          {fileName && <p className="text-primary">{fileName}</p>}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col py-5 bg-secondary bg-opacity-20 p-10 h-full bg-blue-950">
          <h3 className="mb-6 mt-2 font-semibold text-primary">Upload your Python File</h3>
          <img src="assets\icons\upload.svg" width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2 text-primary text-opacity-50">Drag & Drop</h3>
          <p className="p-medium-12 mb-4 text-xs text-primary text-opacity-50">Python</p>
          <button type="button" className="rounded-md text-background p-3 bg-blue-700">
            Select from computer
          </button>
        </div>
      )}
    </div>
  );
}

export default PythonUploader;