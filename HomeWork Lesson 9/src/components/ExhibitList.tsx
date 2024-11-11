import React from "react";
import { ExhibitI } from "../interfaces";
import ExhibitCard from "./ExhibitCard";
import Paginator from "./PaginationControls";

interface ExhibitStripePropsI {
  data: ExhibitI[];
  page: number;
  lastPage: number;
}

const ExhibitList: React.FC<ExhibitStripePropsI> = ({
  data,
  page,
  lastPage,
}) => {
  return (
    <>
      <Paginator navigationPath="?page=" page={+page} lastPage={lastPage} />
      {data.map((exhibit: ExhibitI) => (
        <ExhibitCard key={exhibit.id} {...exhibit} />
      ))}
      <Paginator navigationPath="?page=" page={+page} lastPage={lastPage} />
    </>
  );
};

export default ExhibitList;
