"use client"

import NavBar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";
import { uploadFile } from "@/utils/ipfs";
import FileUploader from "@/components/FileUploader";
import PythonUploader from "@/components/PythonUploader";
import Link from "next/link";

export default function Home() {

  const [pyFile, setPyFile] = useState<File[]>([]);
  const [pyData, setPyData] = useState({
    title: "",
    files: [] as File[],
    fileName: "",
    description: "",
  })

  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    files: [] as File[],
    fileName: "",
    description: "",
  })

  const uploadToIpfs = async (file: any) => {
    console.log("Uploading file to ipfs");
    console.log(file);
    setIsUploading(true);
    const resData = await uploadFile(file);
    const imageLink = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${resData.IpfsHash}`
    console.log("IPFS Hash is:", imageLink);
    setIsUploading(false);
  }


  return (
    <div className="h-full w-full items-center justify-center p-12 gap-16 flex-col">

    <div className="flex w-full items-center justify-center gap-16 my-24">
      <div>
        <FileUploader
          fileName = {formData.fileName}
          setFiles={setFiles}
          uploadToIpfs = {uploadToIpfs}
          onFieldChange={(name: string) => setFormData(prevState =>({ ...prevState, fileName: name}))}
          />
      </div>

      <div>
        <PythonUploader
          fileName = {pyData.fileName}
          setFiles={setPyFile}
          uploadToIpfs = {uploadToIpfs}
          onFieldChange={(name: string) => setPyData(prevState =>({ ...prevState, fileName: name}))}
          />
      </div>
    </div>

    <div>
      {formData.fileName !== "" && pyData.fileName !== "" ? (
        <Link className="w-full items-center justify-center flex" href="/testcases">
          <button className="bg-blue-950 p-4 text-white rounded-lg">
            Generate Test Cases
          </button>
        </Link>
      ) : (
        <div className="w-full items-center justify-center flex">
          <button className="bg-gray-500 p-4 text-white rounded-lg pointer-events-none">
            Generate Test Cases
          </button>
        </div>
      )}
    </div>

    </div>
  );
}
