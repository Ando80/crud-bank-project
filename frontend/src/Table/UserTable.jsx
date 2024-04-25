import { useState, useEffect } from "react";
import Table from "../Component/Table";
import AddUser from "../Component/AddUser";
import UpdatedUser from "../Component/UpdatedUser";
import DeletUser from "../Component/DeletUser";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserTable() {
  const [userId, setUserId] = useState(null);
  const [updatedUserId, setUpdatedUserId] = useState(null);
  const [value, setValue] = useState({
    count: "",
    firstname: "",
    bankname: "",
    money: "",
    date: "",
  });
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ total: 0, min: 0, max: 0 });

  useEffect(() => {
    fetchData();
  }, [userId, updatedUserId]); // Rafraîchir les données lorsque userId ou updatedUserId change

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get");
      const responseData = response.data;
      setData(responseData.users);
      setStats({
        total: responseData.totalpay || 0,
        min: responseData.minpay || 0,
        max: responseData.maxpay || 0,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await axios.put(
        `http://localhost:8000/api/update/${updatedUserId}`,
        value
      );
      const responseData = updatedUser.data;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchData(); // Rafraîchir les données après la mise à jour
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUserDelet = async () => {
    try {
      const deletedUser = await axios.delete(
        `http://localhost:8000/api/delete/${userId}`
      );
      const responseData = deletedUser.data;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchData(); // Rafraîchir les données après la suppression
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const deletuser = (userId) => {
    setUserId(userId);
  };

  const UpadteUserData = (updatedUserId) => {
    setUpdatedUserId(updatedUserId);
    // Récupérer les données de l'utilisateur à mettre à jour
    const userToUpdate = data.find((user) => user._id === updatedUserId);
    if (userToUpdate) {
      setValue(userToUpdate);
    }
  };

  return (
    <>
      <Table Deletuser={deletuser} UpdatedUser={UpadteUserData} data={data} />
      <AddUser />
      <UpdatedUser
        handleOnSubmit={handleOnSubmit}
        value={value}
        handleOnChange={handleOnChange}
      />
      <DeletUser handleUserDelet={handleUserDelet} />
    </>
  );
}
