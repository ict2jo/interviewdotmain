"use client";
import NewsItem from "@/app/_components/NewsItem";
import Button from "../../_components/Button";
import { useEffect } from "react";
import Search from "@/app/_components/Search";

export default function Page() {
  const data = null;
  // useEffect(function () {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch(
  //         "https://openapi.naver.com/v1/search/news.json"
  //       );
  //       const data = await res.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
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
        {data && data.map((item) => <NewsItem key={item.id} />)}
      </div>
    </div>
  );
}
