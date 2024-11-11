// ExhibitCardActionBar.tsx
import React from "react";
import { Button, Box } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface ExhibitCardActionBarProps {
  userId: number;
  exhibitId: number;
  children?: React.ReactNode; 
}

const ExhibitCardActionBar: React.FC<ExhibitCardActionBarProps> = ({
  // userId,
  // exhibitId,
  children,  
}) => {
  return (
    <Box>
      {/* User ID: {userId}
      <Box sx={{ mb: 2 }} />
      Exhibit ID: {exhibitId} */}
      {children}
    </Box>
  );
};

export default ExhibitCardActionBar;
