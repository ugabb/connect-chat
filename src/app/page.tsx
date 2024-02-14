import Image from "next/image";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import technologies from "./tecnhlogies.json"

import { IoLogoGithub } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
          <h1 className="font-bold text-3xl xl:text-5xl lg:text-center lg:px-10">Conecte com seus amigos em tempo real!</h1>
          <p className="lg:w-1/2 md:text-center">
            "Explore nosso chat: onde palavras se tornam laços, diálogos ganham vida e conexões instantâneas transformam-se em experiências únicas. Conecte-se, converse, celebre cada palavra!"</p>
        </div>
        <Image src={"/malte-helmhold-gw749y0vBaM-unsplash-removebg-preview.png"} width={700} height={400} alt='logo' className="grayscale  md:w-1/2" />
      </div>

      <div className="flex flex-col lg:flex-row justify-around items-center gap-5 p-4 my-10">
        <div className="flex flex-col items-center lg:flex-col-reverse">
          <h1 className="text-3xl bg-gradient-to-r from-main to-rose-300 bg-clip-text text-transparent font-bold">Gabriel Barros</h1>
          <Image src={'/profile-pic (1).png'} width={700} height={400} alt='logo' className="h-32 w-32 lg:h-48 lg:w-48" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl lg:text-3xl font-bold text-gray-700">Front end Developer</h2>
          <p className="text-sm text-gray-400">7° Semestre Ciência da Computação</p>
          <p className="text-sm text-gray-400">Full Stack Developer Ministério do Meio Ambiente</p>
          <div className="flex items-center gap-3">
            <Link href={"https://github.com/ugabb"} target='_blank' className="hover:scale-105">
              <IoLogoGithub size={40} className=" " />
            </Link>
            <Link href={"https://www.linkedin.com/in/ugab/"} target='_blank' className="hover:scale-105">
              <IoLogoLinkedin size={40} className="text-sky-700 " />
            </Link>
          </div>
        </div>
      </div>

      <Separator className="bg-main my-10" />

      <div className="flex flex-col gap-5 mt-10">
        <h1 className="text-3xl bg-gradient-to-r from-main to-rose-300 text-md bg-clip-text text-transparent font-bold px-10">Feito com as Tecnologias:</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:max-w-4xl lg:mx-auto p-5 gap-2">
          {tecnologiesList.map((tech: ITechnologies) => (
            <Badge key={tech.cor} style={{ background: tech.cor }} className={`px-5 py-2 flex items-center justify-center gap-2`}>
              {tech.nome}
              <Image src={tech?.icone} width={700} height={400} alt='logo' className="h-8 w-8" />
            </Badge>
          ))}
        </div>
      </div>


      <footer className="flex flex-col  gap-5 justify-around lg:items-center bg-gradient-to-r from-main to-main/80 py-10 px-5 mt-10">
        <div className="flex flex-col gap-10 md:flex-row lg:flex-row justify-around items-center">
          <div className="flex flex-col gap-1">
            <h1 className='text-2xl font-bold text-white'>Fintalk Chat</h1>
            <p className="text-white text-xs">Real Time Chat</p>
          </div>

          <ul className='flex flex-col md:flex-row justify-around gap-3'>
            <Link href={"/login"}>
              <li className='text-white hover:scale-105  px-5 py-2 rounded-md font-bold underline'>Login</li>
            </Link>
            <Link href={"/register"}>
              <li className='text-white hover:scale-105  px-5 py-2 rounded-md font-bold underline'>Cadastre-se</li>
            </Link>
            <Link href={"https://github.com/ugabb/fintalk-chat"} target='_blank'>
              <li className='text-white hover:scale-105  px-5 py-2 rounded-md font-bold underline'>GitHub</li>
            </Link>
            <Link href={"https://www.linkedin.com/in/ugab/"} target='_blank'>
              <li className='text-white hover:scale-105  px-5 py-2 rounded-md font-bold underline'>Linkedin</li>
            </Link>
          </ul>
        </div>


        <Separator className="bg-white my-10" />
        <div className="flex flex-col lg:flex-row justify-center items-center gap-3">
          <div className="flex flex-col gap-1">
            <h1 className='text-2xl font-bold text-white'>Gabriel Barros</h1>
            <p className="text-white text-xs">Front End Developer</p>
          </div>
          <div className="flex gap-3">
            <Link href={"https://github.com/ugabb"} target='_blank' className="hover:scale-105">
              <IoLogoGithub size={40} className=" text-white" />
            </Link>
            <Link href={"https://www.linkedin.com/in/ugab/"} target='_blank' className="hover:scale-105">
              <IoLogoLinkedin size={40} className="text-white" />
            </Link>
          </div>
        </div>

      </footer>


    </main>
  );
}
