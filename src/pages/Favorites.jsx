import { useSelector } from "react-redux";
import AllHeader from "../componats/AllHeader";
import { Container } from "react-bootstrap";
import StaticHeader from "../componats/StaticHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";

function Favorites() {
  useEffect(() => {
    document.title = "Nooni - Wishlist";
  }, []);
  const favorites = useSelector((stats) => stats.favorites);
  return (
    <>
      <header>
        <AllHeader />
      </header>
      <div className="landing" style={{ background: "#fff" }}>
        <Container>
          <StaticHeader />
        </Container>
        <div className="">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right"> Stock Status</TableCell>
                  <TableCell align="right"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {favorites.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div className="imgd" style={{ width: "100px" }}>
                        <img src={product.image_path} className="w-100" />
                      </div>
                      {product.name}
                    </TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.category}</TableCell>
                    <TableCell align="right"> Show </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default Favorites;
