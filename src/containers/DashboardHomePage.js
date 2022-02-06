import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/actions/usersAction";
import DashboardTable from "./DashboardTable";

const DashboardHomePage = () => {
  const dispatch = useDispatch();
  const fetchUsers = async () => {
    const response = await axios
      .get("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data")
      .catch((err) => {
        console.log("Error: ", err);
      });
    dispatch(setUsers(response.data));
  };

  const FetchUsersOnce = () => {
    useEffect(() => {
      fetchUsers();
    }, []);
  }

  FetchUsersOnce();

  return (
    <div className="DashboardHomePage">
      <DashboardTable />
    </div>
  );
};

export default DashboardHomePage;
