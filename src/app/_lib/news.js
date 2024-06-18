const URL = `https://openapi.naver.com/v1/search/news.json`;
console.log("hi");

export default async function handler(query = "채용") {
  if (req.method === "GET") {
    try {
      const response = await fetch(
        URL + `?query=${query}&display=100&start=1&sort=sim`,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-Naver-Client-Id": process.env.NEWS_CLIENT_ID,
            "X-Naver-Client-Secret": process.env.NEWS_CLIENT_SECRET,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // 응답을 JSON으로 변환

      console.log(data);
      return res.status(200).json(data); // 응답 데이터를 JSON으로 반환
    } catch (error) {
      console.error(error);
      // 데이터를 가져오는 도중에 오류가 발생하면 500 에러를 반환합니다.
      return res
        .status(500)
        .json({ error: "Failed to fetch data from external API" });
    }
  } else {
    // GET 요청 이외의 요청에는 405 에러를 반환합니다.
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
