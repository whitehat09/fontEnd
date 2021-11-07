import { useEffect, useState } from "react";

import "./css/style.css";
import { useAppDispatch } from "../../app/hooks";

import { useHistory } from "react-router";
import { db } from "../../firebase/config";
import { getProducts } from "../../features/products/productsSlice";

import { showHeaderAdmin } from "../../features/auth/authSlice";
//ui
import * as React from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import deleteDocument from "../../firebase/service/deleteDocument";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 16.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const DashboardProducts = () => {
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //
  const [products, setProducts] = useState([]);
  const dispatch = useAppDispatch();

  dispatch({ type: showHeaderAdmin.type });
  useEffect(() => {
    db.collection("products").onSnapshot((snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(data);
      dispatch({ type: getProducts.type, payload: data });
      dispatch({ type: showHeaderAdmin.type });
    });
  }, [dispatch]);
  console.log("Dashboard product", products);
  return (
    <>
      <section>
        <div className="container">
          <div className="row p-2  ">
            <Button
              className="mb-2"
              variant="contained"
              onClick={() => history.push(`/admin/addproduct`)}
            >
              Thêm sản phẩm
            </Button>

            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Id </StyledTableCell>
                    <StyledTableCell align="right">Tên</StyledTableCell>
                    <StyledTableCell align="right">Ảnh</StyledTableCell>
                    <StyledTableCell align="right">Mô tả</StyledTableCell>
                    <StyledTableCell align="right">Danh mục</StyledTableCell>
                    <StyledTableCell align="right">Giá</StyledTableCell>
                    <StyledTableCell align="right">Hành động</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? products.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : products
                  ).map((row: any) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {row.productName}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        <img
                          src={row.image}
                          alt="displayName"
                          style={{
                            width: "80px",
                            height: "auto",
                          }}
                        />
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {row.description}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {row.category}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {row.price}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        <Stack spacing={2} direction="row">
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>{
                              
                               history.push(`/admin/updateproduct/${row.id}`)
                            }
                             
                            }
                            // onClick={() =>
                            //   updateDocument("products", row.id, {
                            //     productName: "a",
                            //     image:
                            //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ydV8wLPF5eyPAf8r4tB_ozHVP9IffgwLPA&usqp=CAU",
                            //     description: "a",
                            //     price: "2000",
                            //     category: ["latop"],
                            //   })
                            // }
                          >
                            Sửa
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteDocument("products", row.id)}
                          >
                            Xoá
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={6}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardProducts;
