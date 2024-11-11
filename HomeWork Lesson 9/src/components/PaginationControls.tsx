import React from "react";
import { Pagination, PaginationItem } from "@mui/material";

interface PaginatorPropsI {
  navigationPath: string;
  page: number;
  lastPage: number;
}

const Paginator: React.FC<PaginatorPropsI> = ({
  page,
  lastPage,
  navigationPath,
}) => {
  return (
    <Pagination
      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
      page={page}
      count={lastPage}
      renderItem={(item) => (
        <a href={`${navigationPath}${item.page}`} style={{ textDecoration: "none" }}>
          <PaginationItem {...item} />
        </a>
      )}
    />
  );
};

export default Paginator;
