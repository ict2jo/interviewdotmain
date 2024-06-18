"use client";

import Form from "@/app/_components/Form";
import Footer from "@/app/_components/Footer";
import JobQuestion from "@/app/_components/JobQuestion";
import FinishScreen from "@/app/_components/FinishScreen";
import { JobTestProvider, useJobTest } from "@/app/_lib/hooks/JobTestContext";
import Spinner from "@/app/_components/Spinner";
import Error from "@/app/_components/Error";
import StartScreen from "@/app/_components/StartScreen";

function PageContent() {
  const { questions, status, index, answer, points, numQuestions, dispatch } =
    useJobTest();

  return (
    <>
      <div className="flex-1 px-8 py-12 bg-gray-100">
        <Form width="2/3">
          {status === "loading" && <Spinner />}
          {status === "error" && <Error />}
          {status === "ready" && <StartScreen />}
          {status === "active" && <JobQuestion />}
          {status === "finished" && <FinishScreen />}
        </Form>
      </div>
      <Footer />
    </>
  );
}
export default function JobTest() {
  return (
    <JobTestProvider>
      <PageContent />
    </JobTestProvider>
  );
}
