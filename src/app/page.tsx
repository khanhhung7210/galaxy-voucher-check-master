import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 lg:p-8 flex justify-center items-center">
      <div className="flex justify-center items-center">
        <Image
          src="/images/404-error.png"
          alt="404"
          width={500}
          height={500}
          className="object-cover"
        />
      </div>
    </div>
  );
}
