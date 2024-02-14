import Image from "next/image";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import technologies from "./tecnhlogies.json"

interface ITechnologies {
  nome: string;
  cor: string;
  icone: string;
}
const tecnologiesList: ITechnologies[] = technologies.tecnologias

export default async function Home() {

  return (
    <main className="w-full">

      <Header />
      <div className="bg-gradient-to-r from-main to-main/80 text-white flex flex-col lg:flex-row justify-around items-center pt-10">
        <div className="flex flex-col items-center gap-3 lg:w-1/2 p-5">
          <h1 className="font-bold lg:text-3xl xl:text-5xl lg:text-center lg:px-10">Conecte com seus amigos em tempo real!</h1>
          <p className="lg:w-1/2 md:text-center">
            "Explore nosso chat: onde palavras se tornam laços, diálogos ganham vida e conexões instantâneas transformam-se em experiências únicas. Conecte-se, converse, celebre cada palavra!"</p>
        </div>
        <Image src={"/malte-helmhold-gw749y0vBaM-unsplash-removebg-preview.png"} width={700} height={400} alt='logo' className="grayscale  md:w-1/2" />
      </div>

      <div className="flex flex-col gap-5 mt-10">
        <h1 className="text-3xl text-main font-bold px-10">Feito com as Tecnologias:</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:max-w-4xl lg:mx-auto p-5 gap-2">
          {tecnologiesList.map((tech: ITechnologies) => (
            <Badge key={tech.cor} style={{ background: tech.cor }} className={`px-5 py-2 flex items-center justify-center gap-2`}>
              {tech.nome}
              <Image src={tech?.icone} width={700} height={400} alt='logo' className="h-10 w-10" />
            </Badge>
          ))}
        </div>
      </div>
    </main>
  );
}
