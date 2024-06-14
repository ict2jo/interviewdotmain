import Link from "next/link";
import Form from "../_components/Form";
import Input from "../_components/Input";
import { useOption } from "../_lib/optionContext";
import Button from "../_components/Button";

export default function Page() {
  const { state, dispatch } = useOption();

  const handleSelectChange = (e) => {
    dispatch({ type: "selected", payload: e.target.value });
  };

  const handleInputChange = (type) => (e) => {
    dispatch({ type, payload: e.target.value });
  };

  const handleNext = () => {
    dispatch({ type: "next" });
  };

  return (
    <Form width="w-2/4">
      <p className="font-semibold"> XX님, 환영합니다.</p>
      <p className="font-semibold border-b-2 border-primary-950 pb-5 mb-8">
        추가 정보를 입력해주세요.
      </p>
      <div className="flex flex-col gap-3">
        {state.page === 1 && (
          <>
            {state.status === "ready" && (
              <div className="flex flex-col">
                <div className="my-2">
                  <span className="text-bold mx-1">학력</span>
                  <span className="text-xs text-gray-700 mx-2">
                    최종학력을 입력해주세요
                  </span>
                </div>
                <select
                  name="school"
                  onChange={handleSelectChange}
                  className="w-full h-10 bg-gray-200 text-gray-700 text-center leading-10"
                >
                  <option value="">+</option>
                  <option value="primary">초등학교 졸업</option>
                  <option value="middle">중학교 졸업</option>
                  <option value="high">고등학교 졸업</option>
                  <option value="college">대학(2,3년)</option>
                  <option value="uni">대학(4년)</option>
                  <option value="master">대학원</option>
                </select>
              </div>
            )}

            {state.school && (
              <>
                <Input
                  placeholder="학교명을 입력해주세요 예)고려대학교"
                  onChange={handleInputChange("schoolName")}
                />
                {state.nameOfSchool && (
                  <Input
                    placeholder="전공을 입력해주세요"
                    onChange={handleInputChange("major")}
                  />
                )}
              </>
            )}

            {state.school && state.nameOfSchool && state.major && (
              <button
                className="mt-4 p-2 bg-primary-500 text-white"
                onClick={handleNext}
              >
                다음
              </button>
            )}
          </>
        )}

        {state.page === 2 && (
          <>
            <div className="flex flex-col">
              <div className="my-2">
                <span className="text-bold mx-1">직업</span>
                <span className="text-xs text-gray-700 mx-2">
                  현재 직업을 입력해주세요
                </span>
              </div>
              <Input
                placeholder="현재 직업"
                onChange={handleInputChange("job")}
              />
            </div>

            {state.job && (
              <div className="flex flex-col">
                <div className="my-2">
                  <span className="text-bold mx-1">업종</span>
                  <span className="text-xs text-gray-700 mx-2">
                    관심 업종을 선택해주세요.
                  </span>
                </div>
                <select
                  name="jobSearchingFor"
                  onChange={handleInputChange("jobSearching")}
                  className="w-full h-10 bg-gray-200 text-gray-700 text-center leading-10"
                >
                  <option value="">+</option>
                  <option value="primary">직무1</option>
                  <option value="middle">직무2</option>
                  <option value="high">직무3</option>
                  <option value="college">직무4</option>
                  <option value="uni">직무5</option>
                  <option value="master">직무6</option>
                </select>
              </div>
            )}
          </>
        )}
      </div>
    </Form>
  );
}
