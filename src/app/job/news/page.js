"use client";
import NewsItem from "@/app/_components/NewsItem";
import Button from "../../_components/Button";
import Search from "@/app/_components/Search";
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import { useContext } from "react";
import { NewsContext, NewsProvider } from "@/app/_lib/hooks/NewsContext";

export default function Page() {
  const news = useContext(NewsContext);
  console.log(news);
  return (
    <>
      <Header />
      <div className="flex-1 px-8 py-12 bg-gray-100">

        <NewsProvider>
          <div>
            <h1 className="text-center text-3xl font-extrabold">뉴스</h1>
            <div className="flex justify-center items-center gap-2 my-5">
              <Button type="smBlue">All</Button>
              <Button type="outline">All</Button>
              <div className="ml-auto">
                <Search />
              </div>
            </div>
            <div className="grid my-5">
              {news && news.map((item) => <NewsItem key={item.link} item={item} />)}
            </div>

          </div>
        </NewsProvider>
      </div>
      <Footer />
    </>
  );
}
