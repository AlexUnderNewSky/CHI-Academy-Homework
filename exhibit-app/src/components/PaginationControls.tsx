"use client";

import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";

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
        <Link
          href={`${navigationPath}${item.page}`}
          style={{ textDecoration: "none" }}
        >
          <PaginationItem {...item} />
        </Link>
      )}
    />
  );
};

export default Paginator;
