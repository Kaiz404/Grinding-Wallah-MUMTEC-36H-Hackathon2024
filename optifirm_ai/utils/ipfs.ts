/**
 * Function to upload a file to IPFS.
 * @param fileToUpload The file to be uploaded to IPFS
 * @returns The IPFS Hash of the uploaded data
 */
export async function uploadFile(fileToUpload :any){
    const data = new FormData();
    data.set("file", fileToUpload);
    //Make API Call to send data to IPFS
    const res = await fetch("/api/ipfs", {
      method: "POST",
      body: data
    });
    const resData = await res.json();
    return resData;
}