"use client"

import NavBar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";
import { uploadFile } from "@/utils/ipfs";
import FileUploader from "@/components/FileUploader";
import PythonUploader from "@/components/PythonUploader";
import Link from "next/link";

import { useReadContract, useSendTransaction, useWriteContract } from 'wagmi'
import abi from '@/contract/abi.json'
import dummyAbi from '@/contract/dummy.json';

export default function Home() {

  const [pyFile, setPyFile] = useState<File[]>([]);
  const [pyData, setPyData] = useState({
    title: "",
    files: [] as File[],
    fileName: "",
    description: "",
  })
  const [authorized, setAuthorized] = useState(false);

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

  const { data:hash, writeContract } = useWriteContract();
  const getAuthorization = async () => {
    alert("Caling Contract")
    const response = await writeContract({
      abi: dummyAbi,
      address: "0x9FBF48624ce269536dcEEA6EBe3908e400a3b3DE",
      functionName: 'update',
      args: [168],
    })
    // const res = await writeContract({
    //   abi,
    //   address: "0x2c65BDF703539B172EeCADeA6C4b4C07fE5a0987",
    //   functionName: 'generateToken',
    //   args: ['0x2c65BDF703539B172EeCADeA6C4b4C07fE5a0987'],
    // })
    alert("Contract Called");
    setAuthorized(true);
  };


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
      {authorized?
        <>
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
        {hash && <div className="m-3 text-gray-400 w-full items-center justify-center flex"><a href={`https://sepolia.etherscan.io/tx/${hash}`} target='_blank'>Tx Proof: {hash}</a></div>}
        </>
        :
        <div className="w-full items-center justify-center flex">
          <button className="bg-blue-950 p-4 text-white rounded-lg" onClick={getAuthorization}>
            Get Token Authorization
          </button>
        </div>
      }
    </div>

    </div>
  );
}
