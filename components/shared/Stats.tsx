import { formatBigNumber } from "@/lib/utils";
import React from "react";
interface Props {
  totalQuestions: number;
  totalAnswers: number;
  totalAnnouncements: number ;
   totalTrainning : number;
    totalKnowlegde: number 
}
// grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4
const Stats = ({ totalQuestions, totalAnswers, totalAnnouncements , totalTrainning, totalKnowlegde }: Props) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900 ">Stats</h4>
      <div className="mt-5 ">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shdow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatBigNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatBigNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatBigNumber(totalAnnouncements)}
            </p>
            <p className="body-medium text-dark400_light700">Announcements</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatBigNumber(totalKnowlegde)}
            </p>
            <p className="body-medium text-dark400_light700">Knowlegde</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatBigNumber(totalTrainning)}
            </p>
            <p className="body-medium text-dark400_light700">Trainning</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
