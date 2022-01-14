import { useState, useEffect } from "react";
import facade from "../apiFacade";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";


function HomePage() {
  const userName = facade.getUsername();
  const init = { username: userName, cryptoid: "", count: "" };
  const [UCCredentials, setUCCredentials] = useState(init);
  const [auction, setAuction] = useState([{id: "", name: "", date: "", location: ""}]);


  const updates = (data) => {
    const auctionList = [];
    data.map((i) => {
      auctionList.push({ id: i.id, name: i.name, date: i.date, location: i.location });
    });
    setAuction(auctionList);
  };


  const onChange = (evt) => {
    setUCCredentials({
      ...UCCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  function tableRows() {
    return auction.map((i) => {
      return (
        <tr>
          <td>{i.id}</td>
          <td>{i.name}</td>
          <td>{i.date}</td>
          <td>{i.location}</td>
        </tr>
      );
      });
  }

  useEffect(() => {
    facade.fetchData("auction/all", updates);
  }, [facade]);


  return (
    <div className="container">
      <div className="row row-cols">
        <div />
        <h2 className="my-4">Our planned auctions:</h2>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Auction Id</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>{tableRows()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
