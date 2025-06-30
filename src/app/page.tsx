import SchemesHero from "@/components/SchemesHero";
import Categories from "@/components/Categories";
import BackgroundCarousel from "../components/BackgroundCarousel";
import ZycoonDescription from "@/components/ZycoonDescription";

export default function Home() {
  return (
    <>
      <BackgroundCarousel />
      <div className="pt-0 sm:pt-80 md:pt-96 lg:pt-[28rem]">
        <SchemesHero />
        <Categories />
        <ZycoonDescription />
      </div>
    </>
  );
}
