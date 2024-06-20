"use client";
//import NewsItem from "@/app/_components/NewsItem";
import Button from "@/app/_components/Button";
import Search from "@/app/_components/Search";
import Footer from "@/app/_components/Footer";

// import { useContext } from "react";
// import { NewsContext, NewsProvider } from "@/app/_lib/hooks/NewsContext";
//import newsData from "@/app/api/data/news.json";

export default function News() {
  // const news = useContext(NewsContext);
  //const news = newsData.items;

  return (
    // <>
    //   <div className="px-8 py-12 bg-gray-100 mx-auto">
    //     {/* <NewsProvider> */}
    //     <h1 className="text-center text-3xl font-extrabold">뉴스</h1>
    //     <div className="flex w-4/5 mx-auto justify-between">
    //       <div className="flex-3 justify-center items-center gap-3 my-5">
    //         <Button type="smBlue">All</Button>
    //         <Button type="outline">All</Button>
    //       </div>

    //       <Search />
    //     </div>
    //     <div className="w-4/5 p-2 mx-auto">
    //       <div className="grid my-5 grid-cols-3 gap-2 justify-center items-center">
    //         {news &&
    //           news.map((item) => (
    //             <NewsItem
    //               key={item.link}
    //               title={item.title}
    //               link={item.originallink}
    //               content={item.description}
    //               date={item.pubDate}
    //             />
    //           ))}
    //       </div>
    //     </div>

    {
      /* </NewsProvider> */
    }
    // </div>
    // <Footer />
    // </>
  );
}
