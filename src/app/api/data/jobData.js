"use client";
import axios from "axios";

export const API_KEY = "631411887293319c018c3eeeb7413e40";
export const Q_NUM = "19";
export const Q_URL = "https://www.career.go.kr/inspct/openapi/test";
//export const R_URL = "https://www.career.go.kr/inspct/openapi/test/report?";

export const GetQuestionAPI = async () => {
  try {
    const response = await axios.get(
      `${Q_URL}/questions?apikey=${API_KEY}&q=${Q_NUM}`
    );
    if (response.data.SUCC_YN === "N") {
      throw new Error(response.data.ERROR_REASON);
    }
    return response.data.RESULT;
  } catch (error) {
    const status = error.response?.status || "undefined";
    const message = error.message || "No message available";
    throw new Error(`Failed to fetch questions: ${message}, status: ${status}`);
  }
};

export const PostResultAPI = async (data) => {
  // const pushResponse = await axios.post(
  //   `${R_URL}apikey=${API_KEY}&questrnSeq=${Q_NUM}`,
  //   data
  // );

  const response = await fetch(
    `${Q_URL}/report?apikey=${API_KEY}&questrnSeq=${Q_NUM}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // 현재 상태를 서버로 전송
    }
  );

  const job = response.json();
  console.log(job);
  // const SEQ_NUM = pushResponse.data.RESULT.url.split("=")[1];
  // console.log(SEQ_NUM);
  // const pullResponse = await axios.get(`${R_URL}seq=${SEQ_NUM}`);

  // return pullResponse;
};
