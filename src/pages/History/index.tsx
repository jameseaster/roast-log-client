// Imports
import React from "react";
import { style } from "./style";
import Table from "components/Table";
import { IHistoryProps } from "./types";
import { useSelector } from "react-redux";
import { roastData } from "state/redux/slices/app";
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
  const { roasts, loadingRoasts, loadingRoastsError } = useSelector(roastData);

  return (
    <Container
      sx={loadingRoasts || loadingRoastsError ? style.container : style.table}
    >
      {/* Loading state */}
      {loadingRoasts && (
        <Card sx={style.card}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h4">Loading...</Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Error state */}
      {loadingRoastsError && (
        <Card sx={style.card}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h4">Error Loading Data</Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Data table */}
      {!loadingRoasts && !loadingRoastsError && roasts && (
        <Card sx={style.tableCard}>
          <CardContent sx={style.tableCardContent}>
            <Table rows={roasts || []} />
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default History;
