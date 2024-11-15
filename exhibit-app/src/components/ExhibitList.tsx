import React from "react";
import { ExhibitI } from "../../interfaces";
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
}) => (
  <>
    <Paginator
      navigationPath="exhibits?page="
      page={+page}
      lastPage={lastPage}
    />
    {data.map((exhibit: ExhibitI) => (
      <ExhibitCard key={exhibit.id} {...exhibit} />
    ))}
    <Paginator
      navigationPath="exhibits?page="
      page={+page}
      lastPage={lastPage}
    />
  </>
);

export default ExhibitList;
