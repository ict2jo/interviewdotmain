
import React, { useEffect, useState } from 'react';
import authStore from '@/stores/AuthStore';
import ResultChart from '@/app/_components/ResultChart';
import { JobTestProvider, useJobTest } from '@/app/_lib/hooks/JobTestContext';

function PageContent() {
  const user = authStore.getUser();
  const [answers, setAnswers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [score, setScore] = useState({ first: {}, second: {} });
  const typeMapping = ["현실형(R)", "탐구형(I)", "예술형(A)", "사회형(S)", "진취형(E)", "관습형(C)"];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
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
      "관습형(C)": []
    };
    const storedAnswers = localStorage.getItem('answers');
    if (storedAnswers) {
      try {
        const parsedAnswers = JSON.parse(storedAnswers);
        setAnswers(parsedAnswers);

        parsedAnswers.forEach((answer, index) => {
          const typeIndex = index % 6;
          results[typeMapping[typeIndex]].push(answer);
        });

        const sums = {};
        Object.keys(results).forEach(type => {
          sums[type] = results[type].reduce((acc, cur) => acc + cur, 0);
        });

        const formattedData = Object.entries(sums).map(([key, value]) => ({
          name: key,
          value: value
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
          second: sortedSums.second
        });


      } catch (error) {
        console.error('Error parsing answers:', error);
        setAnswers([]); // 에러 발생 시 기본값 설정
      }
    } else {
      setAnswers([]);
    }
  }, []);


  return (
    <div className='w-full bg-white py-10'>
      <div className='w-2/4 m-auto' >
        {score.first && score.second ? (
          <>
            <div className='w-2/4 m-auto flex whitespace-nowrap gap-5 py-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
              </svg>
              <h1 className='text-3xl text-center border-b-2 border-gray-900'>직업흥미유형 탐색결과 (T점수)</h1>
            </div>
            <p className='my-3 w-2/4 m-auto'>

              <div className='flex gap-3 text-xl tracking-wider'>
                {user.name}님은, <span className='bg-yellow-100'>{score.first.type}</span>와 <span className='bg-yellow-100'>{score.second.type}</span>
                에서 T점수가 높게 나왔습니다.
              </div>
            </p>
            <div className='flex items-center ml-5 gap-3 mt-8'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-red-500 h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
              <p className='text-sm text-red-500'>
                T점수 : T점수는 평균이 50, 표준편차가 10인 표준점수 체계로 또래 집단 내에서 피검자의 상대적인 위치를 알 수 있는 점수입니다.
              </p>
            </div>

          </>
        ) : (
          <p>진행한 검사 결과가 없습니다.</p>
        )}
      </div>
      <div className='m-auto mt-10'>
        <ResultChart chartData={chartData} renderCustomizedLabel={renderCustomizedLabel} />
      </div>
    </div >
  )
}


export default function Result() {
  return (
    <JobTestProvider>
      <PageContent />
    </JobTestProvider>
  )
}
