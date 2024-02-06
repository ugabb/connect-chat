import Image from "next/image";

import { redisDB } from '@/lib/prismadb'
import { Button } from "@/components/ui/button";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Works</Button>
    </main>
  );
}
