import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRequest } from "ahooks";
import { fetchAllCharacters } from "../api/characterApi";

const CharacterTable = ({ darkMode }) => {
  const navigate = useNavigate();

  // ИСПОЛЬЗУЮ useRequest
  const { data: characters, loading } = useRequest(fetchAllCharacters);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  return (
    <Box sx={{ height: 500, width: "100%", margin: "20px auto" }}>
      {loading ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <DataGrid
          rows={characters || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          onRowClick={(params) => navigate(`/heroes/${params.id}`)}
          sx={{
            "& .MuiDataGrid-row": {
              bgcolor: darkMode ? "#424242" : "#36eee0",
              color: darkMode ? "white" : "black",
            },
            "& .MuiDataGrid-row:hover": {
              bgcolor: darkMode ? "#FF4081" : "#f652a0",
            },
          }}
        />
      )}
    </Box>
  );
};

export default CharacterTable;
