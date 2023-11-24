import React from "react";
import Image from "next/image";
import Bg from "../../assets/bg1.jpg";
import { CardLayout } from "../../components/CardLayout/CardLayout";

export default function ToExtense() {
  return (
    <div>
      <div className="relative w-full h-80">
        <Image src={Bg} alt="bgimage" fill className="object-cover" />
      </div>
      <main className="px-20 py-12 max-xl:px-5">
        <CardLayout />
      </main>
    </div>
  );
}
