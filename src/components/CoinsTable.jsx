import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from ".././CryptoContext";
import { CoinList } from "../config/api.js";
import {Container,LinearProgress,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@material-ui/core";
import {Pagination} from "@material-ui/lab"
import "./styles/coinsTable.css";
import { Link } from "react-router-dom";

export function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const [searchFilter, setSearchFilter] = useState();
  const { currency, symbol } = CryptoState();
  //  console.log("CURRENCY ++++ ",searchFilter)
  const tableHeadItems = ["Coins", "Price", "24h change", "market cap"];

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
  };

  useEffect(() => {
    fetchCoins();
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, [currency]);

  const inputSearchFun = () => {
    return coins.filter((val) => {
      return (
        val.name.toLowerCase().includes(search) ||
        val.symbol.toLowerCase().includes(search)
      );
    });
  };




  return (
    <>
      <Container className="coins-table-container">
        <h2> Crypto currency prices by market cap</h2>
        <input
          type="text"
          className="TextField"
          placeholder="Search for Crypto Currency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {tableHeadItems.map((val) => {
                    return (
                      <TableCell
                        // className="table-cell"
                        className="tableCellStyles"
                        style={{ fontWeight: "750" }}
                        key={val}
                        align={val === "Coins" ? "" : "right"}
                      >
                        {val}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody className="coin-table-row">
                {inputSearchFun().slice((page-1) * 10, (page-1) * 10 + 10).map((val) => {
                  const profit = val.price_change_percentage_24h > 0;
                  let color = profit === true ? "rgb(14,203,129)" : "red";
                  return (
                    <TableRow key={val} >
                      {search === "" ? (
                        <>
                          <TableCell
                            className="table-cell"
                            style={{color: "white",fontWeight: "550",letterSpacing: "1.5px",display:"flex",gap:15}}
                          >
                            <Link to={`/coins/${val.id}`}>
                              <img
                                src={val.image}
                                alt={val.name}
                                height={50}
                                style={{display: "flex",gap: 15,marginBottom:10}}
                              />
                              <div style={{display: "flex",flexDirection: "column",}} >
                                <span style={{ textTransform: "uppercase",color:"white",fontSize:20 }}>
                                  {val.symbol}
                                </span>
                                <span style={{ textTransform:"capitalize",color:"darkgrey" }}>{val.name}</span>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell
                            className="table-cell"
                            style={{ color: "white", fontWeight: "600"}}
                            align={val === "Coins" ? "" : "right"}
                          >
                            {symbol}
                            {addCommasToNumber(val.current_price)}
                          </TableCell>
                          <TableCell
                            className="table-cell"
                            style={{ color: color, fontWeight: "600" }}
                            align={val === "Coins" ? "" : "right"}
                          >
                            {symbol}
                            {profit && "+"}
                            {addCommasToNumber(val.price_change_24h.toFixed(2))}
                          </TableCell>
                          <TableCell
                            className="table-cell"
                            style={{ color: "white", fontWeight: "600" }}
                            align={val === "Coins" ? "" : "right"}
                          >
                            {symbol}
                            {addCommasToNumber(val.market_cap)}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell
                            className="table-cell"
                            style={{color: "white",fontWeight: "550",letterSpacing: "1.5px",display:"flex",gap:15}}
                          >
                            <Link to={`/coins/${val.id}`}>
                              <img
                                src={val.image}
                                alt={val.name}
                                height={50}
                                style={{display: "flex",gap: 15,marginBottom:10}}
                              />
                              <div style={{display: "flex",flexDirection: "column",}} >
                                <span style={{ textTransform: "uppercase",color:"white",fontSize:20 }}>
                                  {val.symbol}
                                </span>
                                <span style={{ textTransform:"capitalize",color:"darkgrey" }}>{val.name}</span>
                              </div>
                            </Link>
                          </TableCell>  

                          <TableCell
                            className="table-cell"
                            style={{ color: "white", fontWeight: "600" }}
                            align={val === "Coins" ? "" : "right"}
                          >
                            {symbol}
                            {addCommasToNumber(val.current_price)}
                          </TableCell>
                          <TableCell
                            className="table-cell"
                            style={{ color: color, fontWeight: "600" }}
                            align={val === "Coins" ? "" : "right"}
                          >
                            {symbol}
                            {profit && "+"}
                            {addCommasToNumber(val.price_change_24h.toFixed(2))}
                          </TableCell>
                          <TableCell
                            className="table-cell"
                            style={{ color: "white", fontWeight: "600" }}
                            align={val === "Coins" ? "" : "right"}
                          >
                            {symbol}
                            {addCommasToNumber(val.market_cap)}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{padding:20,width:"100%",display:"flex",justifyContent:"center", backgroundColor:"#EEBC1D",marginTop:40}} 
          count={(inputSearchFun()?.length / 10).toFixed(0)}
          onChange={(_,val)=>{
            setPage(val);
            window.scroll(0,450)
          }}
        />
      </Container>
    </>
  );
}

export default CoinsTable;
