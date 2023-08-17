import { useEffect, useState } from "react";
import UserLink from "../components/UserLink";


export default function EventsForm() {
  const [users, setUsers] = useState([]);

  
  return <>
    <h1>Events Form: </h1>
    <UploadImg/>
  </>;
}