import React, { useEffect, useState } from "react";
import { ExhibitI } from "../interfaces";
import ExhibitCard from "./ExhibitCard";
import Paginator from "./PaginationControls";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data.length > 1) {
      setLoading(false);
    }
  }, [data]);
  return (
    <>
      {loading ? (
        <p></p>
      ) : (
        <Paginator navigationPath="?page=" page={+page} lastPage={lastPage} />
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        // После загрузки, показываем ExhibitCards
        data.map((exhibit: ExhibitI) => (
          <ExhibitCard key={exhibit.id} {...exhibit} />
        ))
      )}

      {loading ? (
        <p></p>
      ) : (
        <Paginator navigationPath="?page=" page={+page} lastPage={lastPage} />
      )}
    </>
  );
};

export default ExhibitList;
