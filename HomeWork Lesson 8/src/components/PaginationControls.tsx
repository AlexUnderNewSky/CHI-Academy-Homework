import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
      <Button
        variant="contained"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Typography sx={{ padding: 2 }}>
        Page {currentPage} of {lastPage}
      </Typography>
      <Button
        variant="contained"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;
