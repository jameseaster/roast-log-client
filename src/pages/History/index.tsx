// Imports
import React from "react";
import { style } from "./style";
import Table from "components/Table";
import { IHistoryProps } from "./types";
import { useSelector } from "react-redux";
import { getRoastsState, getAllRoasts } from "providers/redux/slices/roasts";
// MUI Imports
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

/**
 * History Page
 */
const History: React.FC<IHistoryProps> = () => {
  // Global State
  const { readRoastStatus } = useSelector(getRoastsState);
  const { allRoasts } = useSelector(getAllRoasts);

  return (
    <Container sx={readRoastStatus !== null ? style.container : style.table}>
      {/* Loading state */}
      {readRoastStatus === "loading" && (
        <Card sx={style.card}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h4">Loading...</Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Error state */}
      {readRoastStatus === "error" && (
        <Card sx={style.card}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h4">Error Loading Data</Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Data table */}
      {readRoastStatus === null && !!allRoasts.length && (
        <Card sx={style.tableCard}>
          <CardContent sx={style.tableCardContent}>
            <Table rows={allRoasts} />
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default History;
