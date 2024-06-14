'use client'
import React from "react";
import Form from "@/app/_components/Form";
import Input from "@/app/_components/Input";
import OptionContainer from "@/app/_components/OptionContainer";
import Option from "@/app/_components/Option";
import { OptionProvider, useOptions } from "@/app/_lib/hooks/OptionContext";
import useJobLists from "@/app/_lib/hooks/useJobLists"
import Select from "@/app/_components/Select";

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
    handleRemoveJob
  } = useOptions();

  const { jobLists, jobContainer } = useJobLists();
  const uniqueJobLists = Array.from(new Set(jobLists.map(job => job.profession)));
  const subJobOptions = jobContainer.filter(job => selectedJob.includes(job.profession || '기타'));


  const SelectedItemsList = ({ selectedItems, handleRemoveItem }) => {
    const uniqueItems = Array.from(new Set(selectedItems));

    return (
      <div>
        {uniqueItems.map(item => (
          <div key={item} className="flex">
            {item}
            <button onClick={() => handleRemoveItem(item)}>X</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Form width="w-2/4">
      <p className="font-semibold border-b-2 border-primary-950 pb-5 mb-8">
        추가 정보를 입력해주세요.
      </p>
      <div className="flex flex-col gap-3">
        {page === 1 && (<>
          <OptionContainer span='학력' text=" 최종학력을 입력해주세요">
            <Select name="school" value={school}>
              <option value="">+</option>
              <option value="primary">초등학교 졸업</option>
              <option value="middle">중학교 졸업</option>
              <option value="high">고등학교 졸업</option>
              <option value="college">대학(2,3년)</option>
              <option value="uni">대학(4년)</option>
              <option value="master">대학원</option>
            </Select>
          </OptionContainer>

          {school && (
            <>
              <Input
                placeholder="학교명을 입력해주세요 예)고려대학교"
                onChange={handleInputChange("schoolName")}
                name="schoolName"
              />
              <Input
                placeholder="전공을 입력해주세요"
                onChange={handleInputChange("major")}
                name="major"
              />
              <button
                className="mt-4 p-2 bg-primary-500 text-white"
                onClick={handleNext}>
                다음
              </button>
            </>
          )}
        </>)}

        {page === 2 && (
          <>
            <OptionContainer span='직업' text="현재 직업을 적어주세요">
              <Input placeholder="현재 직업" onChange={handleInputChange("job")} />
            </OptionContainer>

            <OptionContainer span='업종' text="관심 업종을 선택해주세요.">
              <Select
                name="selectedJob"
                value={selectedJob}
                multiple
              >
                <option value="">관심업종</option>
                {uniqueJobLists.map(job => (
                  <Option profession={job} key={job} />
                ))}
              </Select>
            </OptionContainer>
            <SelectedItemsList selectedItems={selectedJob} handleRemoveItem={handleRemoveJob} />

            {selectedJob && (
              <>
                <OptionContainer span='직업' text="관심 직업을 선택해주세요.">
                  <Select
                    name="jobSearching"
                    value={jobSearchingFor}
                    multiple
                  >
                    <option value="">관심직업</option>
                    {subJobOptions.map(job => (
                      <option value={job.job} key={job.job}>{job.job}</option>
                    ))}
                  </Select>
                </OptionContainer>
                <SelectedItemsList selectedItems={jobSearchingFor} handleRemoveItem={handleRemoveJob} />
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
        {page === 3 && (
          <OptionContainer span='지역' text="관심 지역을 선택해주세요.">
            <Select name="region" value="region" multiple>
              <option value="">+</option>
              <option value="서울특별시">서울특별시</option>
              <option value="부산광역시">부산광역시</option>
              <option value="인천광역시">인천광역시</option>
              <option value="광주광역시">광주광역시</option>
              <option value="세종특별자치시">세종특별자치시</option>
              <option value="대구광역시">대구광역시</option>
              <option value="울산광역시">울산광역시</option>
              <option value="강원특별자자치도">강원특별자자치도</option>
              <option value="경기도">경기도</option>
              <option value="경상남도">경상남도</option>
              <option value="경상북도">경상북도</option>
              <option value="전라남도">전라남도</option>
              <option value="전라북도">전라북도</option>
              <option value="전북특별자자치도">전북특별자자치도</option>
              <option value="충청남도">충청남도</option>
              <option value="충청북도">충청북도</option>
              <option value="제주자자치도">제주자자치도</option>
            </Select>
          </OptionContainer>
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

