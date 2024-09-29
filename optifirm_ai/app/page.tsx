import ConnectButton from "@/components/ConnectButton";

export default function Home() {
  return (
    <div className="h-full w-full items-center justify-center flex flex-col gap-16">
      <p className="text-4xl text-blue-300 font-semibold">WELCOME TO OPTIFIRM AI</p>
      <ConnectButton />
    </div>
  );
}
