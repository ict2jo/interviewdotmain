"use client";
import axios from "axios";

export const API_KEY = "631411887293319c018c3eeeb7413e40";
export const Q_NUM = "19";
export const Q_URL = "https://www.career.go.kr/inspct/openapi/test";


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
  try {
    const pushResponse = await axios.post(
      "http://localhost:8080/api/report",
      // `${Q_URL}/report?apikey=${API_KEY}&questrnSeq=${Q_NUM}`,
      data, {
      headers: {
        "Content-Type": "application/json",
      },
    }
    );

    const job = pushResponse.data;
    console.log(job);

    return pushResponse;
  } catch (error) {
    console.error("Error posting result:", error);
    throw error;
  }
};
