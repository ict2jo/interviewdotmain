"use client";
import React, { useEffect, useState } from "react";
import { JobTestProvider } from "@/app/_lib/hooks/JobTestContext";
import userStore from "@/stores/UserStore";
import Spinner from "@/app/_components/Spinner";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Paper, Typography } from "@mui/material";
import resultData from "@/app/api/result/result.json";
import ResultDetails from "@/app/_components/ResultDetails";

function PageContent() {
  const [answers, setAnswers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [score, setScore] = useState({ first: {}, second: {} });
  const [hoveredData, setHoveredData] = useState(null);
  const typeMapping = [
    "현실형(R)",
    "탐구형(I)",
    "예술형(A)",
    "사회형(S)",
    "진취형(E)",
    "관습형(C)",
  ];
  const COLORS = [
    "#0e7490",
    "#083344",
    "#7dd3fc",
    "#075985",
    "#0891b2",
    "#a8a29e",
  ];

  const onPieEnter = (data, index) => {
    setHoveredData(resultData[data.name]);
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${chartData[index].name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    const results = {
      "현실형(R)": [],
      "탐구형(I)": [],
      "예술형(A)": [],
      "사회형(S)": [],
      "진취형(E)": [],
      "관습형(C)": [],
    };
    const storedAnswers = localStorage.getItem("answers");
    if (storedAnswers) {
      try {
        const parsedAnswers = JSON.parse(storedAnswers);
        setAnswers(parsedAnswers);

        parsedAnswers.forEach((answer, index) => {
          const typeIndex = index % 6;
          results[typeMapping[typeIndex]].push(answer);
        });

        const sums = {};
        Object.keys(results).forEach((type) => {
          sums[type] = results[type].reduce((acc, cur) => acc + cur, 0);
        });

        const formattedData = Object.entries(sums).map(([key, value]) => ({
          name: key,
          value: value,
        }));

        setChartData(formattedData);

        const sortedSums = Object.entries(sums)
          .sort(([, valueA], [, valueB]) => valueB - valueA)
          .slice(0, 2)
          .reduce((obj, [key, value], index) => {
            if (index === 0) {
              obj.first = { type: key, score: value };
            } else if (index === 1) {
              obj.second = { type: key, score: value };
            }
            return obj;
          }, {});

        setScore({
          first: sortedSums.first,
          second: sortedSums.second,
        });
      } catch (error) {
        console.error("Error parsing answers:", error);
        setAnswers([]);
      }
    } else {
      setAnswers([]);
    }
  }, []);

  if (!userStore.name) {
    return <Spinner />;
  }

  return (
    <div className="w-full bg-white py-10">
      <div className="m-auto">
        {storedAnswers  ? (
          <>
            <div className="flex justify-center gap-3">
              <div className="h-[90vh]">
                <Paper elevation={3} style={{ padding: 16 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className="arrow flex items-center justify-center"
                  >
                    <span className="text-lg text-white leading-2">
                      직업흥미유형 탐색결과 (T점수)
                    </span>
                  </Typography>

                  <div className="flex items-center ml-5 gap-3 mt-8 max-w-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="text-red-500 h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                      />
                    </svg>
                    <p className="text-sm text-red-500">
                      T점수 : T점수는 평균이 50, 표준편차가 10인 표준점수 체계로
                      또래 집단 내에서 피검자의 상대적인 위치를 알 수 있는
                      점수입니다.
                    </p>
                  </div>
                  <div className="flex items-center ml-5 gap-3 mt-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                      />
                    </svg>
                    <p className="text-sm text-primary-800">
                      각각의 파이 차트를 클릭하면 상세 내용을 확인할 수
                      있습니다.
                    </p>
                  </div>

                  <PieChart width={600} height={600}>
                    <Pie
                      data={chartData}
                      cx={300}
                      cy={300}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={250}
                      dataKey="value"
                      onClick={onPieEnter}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </Paper>
              </div>
              <div>
                <Paper elevation={3} style={{ padding: 16 }}>
                  <div className="mx-5 my-5 text-3xl tracking-wider h-[90vh]">
                    <div className="my-10 border-b-2 border-dashed">
                      {userStore.name}님은,{" "}
                      <p className="my-3 text-sm">
                        <span className="underline decoration-solid leading-2">
                          {score.first.type}
                        </span>
                        와{" "}
                        <span className="underline decoration-solid">
                          {score.second.type}
                        </span>
                        에서 T점수가 높게 나왔습니다.{" "}
                      </p>
                    </div>
                    {hoveredData && (
                      <div>
                        <Typography variant="h6" gutterBottom>
                          <div className="bg-gray-200">
                            {hoveredData.유형} {hoveredData.이름}
                          </div>
                        </Typography>
                        <Typography variant="body1">
                          <div className="grid grid-cols-3 gap-6">
                            <ResultDetails title="흥미특성">
                              {hoveredData.흥미특성}
                            </ResultDetails>
                            <ResultDetails title="자기평가">
                              {hoveredData.자기평가}
                            </ResultDetails>
                            <ResultDetails title="타인평가">
                              {hoveredData.타인평가}
                            </ResultDetails>
                            <ResultDetails title="선호활동">
                              {hoveredData.선호활동}
                            </ResultDetails>
                            <ResultDetails title="적성">
                              {hoveredData.적성}
                            </ResultDetails>
                            <ResultDetails title="성격">
                              {hoveredData.성격}
                            </ResultDetails>
                            <ResultDetails title="가치">
                              {hoveredData.가치}
                            </ResultDetails>
                            <ResultDetails title="회피활동">
                              {hoveredData.회피활동}
                            </ResultDetails>
                            <ResultDetails title="대표직업">
                              {hoveredData.대표직업}
                            </ResultDetails>
                          </div>
                        </Typography>
                      </div>
                    )}
                  </div>
                </Paper>
              </div>
            </div>
          </>
        ) : (
          <p>진행한 검사 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default function Result() {
  return (
    <JobTestProvider>
      <PageContent />
    </JobTestProvider>
  );
}
