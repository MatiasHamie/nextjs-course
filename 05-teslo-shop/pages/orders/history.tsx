import { ShopLayout } from "@/components/layouts";
import { Chip, Grid, Link, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import React from "react";
import NextLink from "next/link";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullName", headerName: "Nombre Completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra información si la orden esta pagada o no",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined" />
      );
    },
  },
  {
    field: "orden",
    headerName: "Ver orden",
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} legacyBehavior passHref>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

const rows: GridRowsProp = [
  { id: 1, paid: true, fullName: "Fernando Herrera" },
  { id: 2, paid: false, fullName: "Melisa Flores" },
  { id: 3, paid: true, fullName: "Eduardo Rios" },
  { id: 4, paid: false, fullName: "Natalia Herrera" },
];
const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de órdenes"
      pageDescription="Historial de órdenes del cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de órdenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[10]} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
