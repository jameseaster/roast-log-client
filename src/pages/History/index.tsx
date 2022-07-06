// Imports
import React from "react";
import { style } from "./style";
import Table from "components/Table";
import { getRoasts } from "api/axios";
import { useQuery } from "react-query";
import { IHistoryProps } from "./types";
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
  // Fetch roast data
  const query = useQuery("roasts", getRoasts);

  return (
    <Container
      sx={query.isLoading || query.isError ? style.container : style.table}
    >
      {/* Loading state */}
      {query.isLoading && (
        <Card sx={style.card}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h4">Loading...</Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Error state */}
      {query.isError && (
        <Card sx={style.card}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h4">Error...</Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Data table */}
      {!query.isLoading && !query.isError && query.data?.data && (
        <Table rows={query.data?.data || []} />
      )}
    </Container>
  );
};

export default History;
