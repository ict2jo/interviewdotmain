"use client";

import { useState, useEffect } from "react";

const KEY = "631411887293319c018c3eeeb7413e40";

export default function useJobLists() {
  const [jobLists, setJobLists] = useState([]);
  const [jobContainer, setJobContainer] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchJobLists() {
      try {
        const res = await fetch(
          `http://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${KEY}&svcType=api&svcCode=JOB&contentType=json&gubun=job_dic_list`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const jobDatas = data.dataSearch.content.map((job) => ({
          profession: job.profession || "기타",
        }));

        setJobLists(jobDatas);
        setJobContainer(data.dataSearch.content);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchJobLists();

    return () => {
      controller.abort();
    };
  }, []);

  return { jobLists, jobContainer };
}
