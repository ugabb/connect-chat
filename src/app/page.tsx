import Image from "next/image";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import technologies from "./tecnhlogies.json"

import { IoLogoGithub } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { PiChatCircleText, PiChatsCircle, PiImage, PiPaperPlaneTilt, PiUserPlus } from "react-icons/pi";
import BoxIconText from "@/components/BoxIconText";

interface ITechnologies {
  nome: string;
  cor: string;
  icone: string;
}
const tecnologiesList: ITechnologies[] = technologies.tecnologias

export default async function Home() {

  return (
    <main className="w-full bg-gradient-to-r from-zinc-100 to-orange-50">

      <Header />
      <section className="bg-gradient-to-r from-main to-main/80 text-white flex flex-col lg:flex-row justify-around items-center pt-10 lg:px-36 ">
        <div className="flex flex-col items-center gap-3 lg:w-1/2 p-5">
          <h1 className="font-bold text-3xl xl:text-5xl lg:text-center lg:px-10">Conect with your friends in real time!</h1>
          <p className="md:text-center">
            Explore our chat: where words become bonds, dialogues come to life, and instant connections turn into unique experiences. Connect, chat, celebrate every word!
          </p>
        </div>
        <Image src={"/online-worlds.svg"} width={700} height={400} alt='logo' className="md:w-1/2 lg:w-1/3 saturate-50" />
      </section>

      {/* <div className="flex flex-col lg:flex-row justify-around items-center gap-5 p-4 my-10">
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
      </div> */}
      <section className="flex flex-col gap-3 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex flex-col md:grid md:grid-cols-2 md:place-items-center md:max-w-2xl lg:max-w-3xl lg:w-1/2 mx-auto lg:flex-row justify-around items-center gap-5 p-4 my-10">
            <BoxIconText text={"Chat In Group"} icon={<PiChatsCircle size={100} className="text-white" />} />
            <BoxIconText text={"Real Time Chat"} icon={<PiPaperPlaneTilt size={100} className="text-white" />} />
            <BoxIconText text={"Send Media"} icon={<PiImage size={100} className="text-white" />} />
            <BoxIconText text={"Invite Your Friends"} icon={<PiUserPlus size={100} className="text-white" />} />
          </div>

          <section className="flex flex-col justify-center items-center gap-3 lg:w-1/2 mx-auto p-5">
            <h1 className="text-3xl text-main font-bold text-center">Chat from anywhere</h1>
            <div className="flex flex-col lg:flex-row gap-3 justify-center items-center ">
              <Image src={"/homepage-mac.png"} width={700} height={700} alt='logo' className="w-full md:w-1/2 lg:w-2/3 object-contain" />
              <Image src={"/homepage-phone.png"} width={700} height={700} alt='logo' className="w-1/2 md:w-1/3 lg:w-1/4 object-contain" />
            </div>
          </section>

        </div>

        <section className="flex flex-col lg:flex-row-reverse items-center justify-center p-4 my-10">
          <div className="flex flex-col justify-center items-center">
            <p className="text-zinc-700 text-xl">Don't miss out on the opportunity to join our vibrant community. Start chatting, make new friends, share experiences, and create lasting memories. Your journey towards enriching conversations begins here!</p>
            <Image src="/male-and-female-chatting-with-each-other-through-mobile.png" width={500} height={500} alt="male-and-female-chatting-with-each-other-through-mobile" className=" drop-shadow-2xl" />
          </div>

          <div className="flex flex-col">
            <Image src="/short-hair-man-with-glasses.png" width={500} height={500} alt="short-hair-man-with-glasses" className=" drop-shadow-2xl" />
            <button className="w-[300px] md:w-[500px] px-5 py-3 rounded-xl hover:text-main text-white text-xl bg-gradient-to-r from-main to-main/80 uppercase font-bold hover:bg-none hover:outline hover:outline-main outline-1 transition-colors z-10">Sign Up Now</button>
            <h1 className="font-bold text-4xl text-main text-center pt-3">Totally Free</h1>
          </div>
        </section>
      </section>


      {/* <Separator className="bg-main my-10" /> */}

      {/* <div className="flex flex-col gap-5 mt-10">
        <h1 className="text-3xl bg-gradient-to-r from-main to-rose-300 text-md bg-clip-text text-transparent font-bold px-10">Feito com as Tecnologias:</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:max-w-4xl lg:mx-auto p-5 gap-2">
          {tecnologiesList.map((tech: ITechnologies) => (
            <Badge key={tech.cor} style={{ background: tech.cor }} className={`px-5 py-2 flex items-center justify-center gap-2`}>
              {tech.nome}
              <Image src={tech?.icone} width={700} height={400} alt='logo' className="h-8 w-8" />
            </Badge>
          ))}
        </div>
      </div> */}


      <footer className="flex flex-col  gap-5 justify-around lg:items-center bg-gradient-to-r from-main to-main/80 py-10 px-5 mt-10">
        <div className="flex flex-col gap-10 md:flex-row lg:flex-row justify-around items-center">
          <div className="flex gap-3 px-3 items-center">
            <h1 className='text-2xl font-bold text-white'>Connect Chat</h1>
            <PiChatCircleText size={30} className="text-white" />
          </div>

          <ul className='flex flex-col md:flex-row justify-around gap-3'>
            <Link href={"/login"}>
              <li className='text-white hover:scale-105  px-5 py-2 rounded-md font-bold underline'>Login</li>
            </Link>
            <Link href={"/register"}>
              <li className='text-white hover:scale-105  px-5 py-2 rounded-md font-bold underline'>Sign Up</li>
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
