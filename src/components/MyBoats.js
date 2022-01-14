import facade from "../apiFacade";
import { useState, useEffect } from "react";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "bootstrap";
import { Select} from "react-bootstrap"

function Boats() {
  const [boats, setBoats] = useState([{
    id: 1,
    name: "Raceren",
    brand: "Fiat",
    make: "Punto",
    year: 2003,
    image: "URL"
}]);

const [newBoat, setNewBoat] = useState([{
  id: "",
  name: "",
  brand: "",
  make: "",
  year: null,
  image: "",
  auctionid: null 
}]);

const [updateBoat, setUpdateBoat] = useState({
  id: "",
  name: "",
  brand: "",
  make: "",
  year: null,
  image: ""
})

  const updates = (data) => {
    const boatsList = [];
    data.map((i) => {
      boatsList.push({
        id: i.id,
        name: i.name,
        brand: i.brand,
        make: i.make,
        year: i.year,
        image: i.image
      });
    });
    setBoats(boatsList);
  };


  useEffect(() => {
    facade.fetchData("boat/userboats", updates);
  }, [facade]);

  
  /*function tableRows() {
    return boats.map((i) => {
      return (
        <tr>
          <td>{i.id}</td>
          <td>{i.name}</td>
          <td>{i.brand}</td>
          <td>{i.make}</td>
          <td>{i.year}</td>
          <td>{i.image}</td>
        </tr>
      );
    });
  }*/
function tableRows() {
    return boats.map((i) => {
      return (
        <tr>
          <td colSpan={1}>
          <div>Id: {i.id}</div>
          <div>Name: {i.name}</div>
          <div>Brand: {i.brand}</div>
          <div>Make: {i.make}</div>
          <div>Year: {i.year}</div>
          <div><button type="submit" id={i.id} onClick={onClickUpdate}>Update</button></div>
          </td>
          <td><img src={i.image} style={{height: "200px"}}></img></td>
        </tr>
      );
    });
  }

const onClickUpdate = (e) => {
  console.log(e.target.id)
  boats.map(boat => {
    if (boat.id == e.target.id) {
      setUpdateBoat(boat)  
    }
  })

}

const addBoat = (evt) => {
  evt.preventDefault();
  facade.postNewBoat(
    newBoat.name,
    newBoat.brand,
    newBoat.make,
    newBoat.year,
    newBoat.image,
    newBoat.auctionid
    )
}

const onClickUpdateBoat = (e) => {
  e.preventDefault()
  console.log(updateBoat)
  facade.updateBoat(
    updateBoat
  )
}

function handleUpdateBoatInput(e){
  setUpdateBoat({...updateBoat, [e.target.id]: e.target.value})
  console.log(e.target.value)
}

function handleInput(e){
  setNewBoat({...newBoat, [e.target.id]: e.target.value })
}

//dropdown
/*
const [value, setValue] = useState("")
const [auctionName, setAuctionName] = useState([{id: null, name: ""}])
const init = {name: "", brand: "", make: "", year: null, image: ""}
const [boatInfo, setBoatInfo] = useState({init})

const handleSelect = (e) => {
  setValue(e);
}

function auctionList(){
  return auctionName.map((i) => {
    return <Dropdown.Item eventKey={i.id}>{i.id}</Dropdown.Item>
  })
}

useEffect(()=>{
  facade.fetchData("auction/all", auctionUpdate)
}, [facade])

const auctionUpdate = (data) => {
  const auctionNameList = [];
  data.map((i) => {
    auctionNameList.push({id: i.id, name: i.name})
  })
  setAuctionName(auctionNameList)
}
const onChange = (evt) => {
    setBoatInfo({
      ...boatInfo, [evt.target.id]: evt.target.value
    })
}*/



  return (
    <div className="container">
      <h2 className="my-4">This is a list of your boats registered on our site</h2>
      <h4>Add new boat</h4>
      <form onChange={handleInput}>
        <div className="form-row">
          <div className="form-group col-md-3">
           <label for="name">Boat Name</label>
            <input type="text" className="form-control" id="name" placeholder="Name" required="required"/>
          </div>
        </div>

        <div className="form-row my-1">
          <div className="form-group col-md-3">
           <label for="brand">Brand</label>
            <input type="text" className="form-control" id="brand" placeholder="Brand" required="required"/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
           <label for="make">Make</label>
            <input type="text" className="form-control" id="make" placeholder="Make" required="required"/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
           <label for="year">Year</label>
            <input type="text" className="form-control" id="year" placeholder="Year" required="required"/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
           <label for="image">Year</label>
            <input type="text" className="form-control" id="image" placeholder="Image URL" required="required"/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
           <label for="auctionid">Year</label>
            <input type="text" className="form-control" id="auctionid" placeholder="Auction ID" required="required"/>
          </div>
        </div>

        <button type="button" className="btn btn-primary my-1" onClick={addBoat}>Create boat</button>
      </form>
      <div className="row row-cols-2">     
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              {/*<th scope="col">Boat Id</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Make</th>
              <th scope="col">Year</th>
  <th scope="col">Image</th>*/}
            <th scope="col">Boat Info</th>
            <th scope="col">Boat Image</th>
            </tr>
          </thead>
          <tbody>{tableRows()}</tbody>
        </table>
      </div>

      <form onChange={handleUpdateBoatInput}>
        <div className="form-row">
          <div className="form-group col-md-3">
           <label for="updateid">Boat ID</label>
            <input type="text" className="form-control" id="id" value={updateBoat.id} placeholder={updateBoat.id} required="required" disabled/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
           <label for="updatename">Boat Name</label>
            <input type="text" className="form-control" id="name" placeholder={updateBoat.name} required="required"/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
           <label for="updatebrand">Boat Brand</label>
            <input type="text" className="form-control" id="brand" placeholder={updateBoat.brand} required="required"/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
           <label for="updatemake">Boat Make</label>
            <input type="text" className="form-control" id="make" placeholder={updateBoat.make} required="required"/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
           <label for="updateyear">Boat Year</label>
            <input type="text" className="form-control" id="year" placeholder={updateBoat.year} required="required"/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
           <label for="updateimage">Boat Image URL</label>
            <input type="text" className="form-control" id="image" placeholder={updateBoat.image} required="required"/>
          </div>
        </div>

        <button type="button" className="btn btn-primary my-1" onClick={onClickUpdateBoat}>Update boat</button>
      </form>
    </div>
  );
}

export default Boats;
