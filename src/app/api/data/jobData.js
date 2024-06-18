"use client";
import axios from "axios";

export const API_KEY = "631411887293319c018c3eeeb7413e40";

export const Q_NUM = "19";

export const Q_URL = "https://www.career.go.kr/inspct/openapi/test";
export const R_URL = "www.career.go.kr/inspct/openapi/test/report?";

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
  const pushResponse = await axios.post(
    `${Q_URL}apikey=${API_KEY}&qestrnSeq=${Q_NUM}`,
    data
  );
  const SEQ_NUM = pushResponse.data.RESULT.url.split("=")[1];
  const pullResponse = await axios.get(`${R_URL}/report?seq=${SEQ_NUM}`);

  return pullResponse;
};
