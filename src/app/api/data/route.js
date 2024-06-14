import axios from 'axios';

export default async function handler(req, res) {
  console.log("hi");
  if (req.method === 'GET') {
    try {

      const response = await axios.get("https://openapi.naver.com/v1/search/news.json", {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-Naver-Client-Id': process.env.NEWS_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NEWS_CLIENT_SECRET
        }
      });

      console.log(response);
      return res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      // 데이터를 가져오는 도중에 오류가 발생하면 500 에러를 반환합니다.
      return res.status(500).json({ error: 'Failed to fetch data from external API' });
    }
  } else {
    // GET 요청 이외의 요청에는 405 에러를 반환합니다.
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}