import React, { useState } from "react";
import Table from "../Component/Table";
import AddUser from "../Component/AddUser";
import UpdatedUser from "../Component/UpdatedUser";
import DeletUser from "../Component/DeletUser";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserTable() {
  const [userId, setUserId] = useState();
  const [updateduserId, setUpdatedUserId] = useState();

  const [value, setValue] = useState({
    count: "",
    firstname: "",
    bankname: "",
    money: "",
    date: "",
  });
  const deletuser = (userid) => {
    setUserId(userid);
  };
  const handleUserDelet = async () => {
    try {
      const DeletUser = await axios.delete(
        `http://localhost:8000/api/delete/${userId}`
      );
      const response = DeletUser.data;
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const UpadteUserData = (Updatedid) => {
    setUpdatedUserId(Updatedid);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const Updateduser = await axios.putForm(
        `http://localhost:8000/api/update/${updateduserId}`,
        value
      );
      const response = Updateduser.data;

      if (response.success) {
        toast.success(response.message);
      }
      // console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table Deletuser={deletuser} UpdatedUser={UpadteUserData}></Table>

      <AddUser></AddUser>
      <UpdatedUser
        handleOnSubmit={handleOnSubmit}
        value={value}
        handleChange={handleChange}
      ></UpdatedUser>
      <DeletUser handleUserDelet={handleUserDelet}></DeletUser>
    </>
  );
}
