import { Template } from "@/components/common/Template";
import { Banner } from "@/components/home/Banner";
import { Binfo } from "@/components/book/Binfo";
import BookShowcase from "@/components/book/BookShowcase";

export default function Home() {
  return (
    <Template noBack={true}>
      <Banner />
      <div>
        <BookShowcase query={"bestsellered=true"} label={"Best Seller"} />
        <BookShowcase query={"promotioned=true"} label={"Special Offers"} />
      </div>
    </Template>
  );
}
