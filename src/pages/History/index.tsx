// Imports
import React from "react";
import { style } from "./style";
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
  return (
    <Container sx={style.container}>
      <Card sx={style.card}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h4">History Page</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default History;
