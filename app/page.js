import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Title from "@/components/helpers/title";
import { stateList } from "@/data";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <section className="flex flex-col items-center justify-center mt-20">
        <div className="py-2 pl-4">
          <Title>List of DOT LSA in India</Title>
        </div>
        <div className="flex flex-wrap gap-3 mx-8">
          {stateList.map((lsa) => (
            <Button key={lsa.value} variant="outline" asChild>
              <Link href={`/lsa/${lsa.value}/view`}>{lsa.label}</Link>
            </Button>
          ))}
        </div>
      </section>
    </>
  );
}
