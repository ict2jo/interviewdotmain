'use client'
import React from "react";
import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";
import OptionContainer from "@/app/_components/OptionContainer";
import Options from "@/app/_components/Options";
import Option from "@/app/_components/Option";
import { OptionProvider, useOptions } from "@/app/_lib/hooks/OptionContext";
import useJobLists from "@/app/_lib/hooks/useJobLists"

function PageContent() {
  const {
    school,
    schoolName,
    major,
    currentJob,
    selectedJob,
    region,
    jobSearchingFor,
    status,
    page,
    handleSelectChange,
    handleInputChange,
    handleNext,
  } = useOptions();

  const { jobLists, jobContainer } = useJobLists();

  const uniqueJobLists = Array.from(new Set(jobLists.map(job => job.profession)));


  const subJobOptions = jobContainer.map(job => {
    const profession = job.profession || '기타';
    return {
      ...job,
      profession: profession
    };
  }).filter(job => job.profession === selectedJob);

  return (
    <Form width="w-2/4">
      <p className="font-semibold border-b-2 border-primary-950 pb-5 mb-8">
        추가 정보를 입력해주세요.
      </p>
      <div className="flex flex-col gap-3">
        {page === 1 && <Options />}
        {page === 2 && (
          <>
            <OptionContainer span='직업' text="현재 직업을 적어주세요">
              <Input placeholder="현재 직업" onChange={handleInputChange("job")} />
            </OptionContainer>

            <OptionContainer span='업종' text="관심 업종을 선택해주세요.">
              <select
                name="selectedJob"
                onChange={handleSelectChange}
                value={selectedJob}
                className="w-full h-10 bg-gray-200 text-gray-700 text-center leading-10"
              >
                <option value="">관심업종</option>
                {uniqueJobLists.map(job => (
                  <Option profession={job} key={job} />
                ))}
              </select>
            </OptionContainer>

            {selectedJob && (
              <>
                <OptionContainer span='직업' text="관심 직업을 선택해주세요.">
                  <select
                    name="jobSearching"
                    onChange={handleSelectChange}
                    value={jobSearchingFor}
                    className="w-full h-10 bg-gray-200 text-gray-700 text-center leading-10"
                  >
                    <option value="">관심직업</option>
                    {subJobOptions.map(job => (
                      <option value={job.job} key={job.job}>{job.job}</option>
                    ))}
                  </select>
                </OptionContainer>
                <button
                  className="mt-4 p-2 bg-primary-500 text-white"
                  onClick={handleNext}

                >
                  다음
                </button>
              </>
            )}
          </>
        )}
      </div>
    </Form >
  );
}


export default function Page() {
  return (
    <OptionProvider>
      <PageContent />
    </OptionProvider>
  );
};

