import axios from "axios";
import { useEffect, useState } from "react";
import ChartComponent from "./chart";

export default function Table({ Deletuser, UpdatedUser }) {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ total: 0, min: 0, max: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await axios.get("http://localhost:8000/api/get");
        const response = user.data;
        setData(response.users);

        // Calcul des statistiques
        const total = response.totalpay || 0;
        const min = response.minpay || 0;
        const max = response.maxpay || 0;
        setStats({ total, min, max });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [data]);

  return (
    <>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  Gestion Pret <b>Bancaire</b>
                </h2>
              </div>
              <div className="col-sm-6">
                <a
                  href="#"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#addEmployeeModal"
                >
                  <i className="material-icons">&#xE147;</i>{" "}
                  <span>Ajout nouveau Pret</span>
                </a>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Numero Compte</th>
                <th>Nom</th>
                <th>Nom Banque</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Pay</th> {/* Nouvelle colonne pour le champ Pay */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((elem) => {
                return (
                  <tr key={elem._id}>
                    <td></td>
                    <td>{elem.count}</td>
                    <td>{elem.firstname}</td>
                    <td>{elem.bankname}</td>
                    <td>{elem.money} Ariary</td>
                    <td>
                      {new Date(elem.date).getDate()}-
                      {new Date(elem.date).getMonth() + 1}-
                      {new Date(elem.date).getFullYear()}
                    </td>
                    <td>{elem.pay} Ariary</td> {/* Affichage du champ Pay */}
                    <td>
                      <a
                        href="#"
                        className="edit cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#editEmployeeModal"
                        onClick={() => UpdatedUser(elem._id)}
                      >
                        <i
                          className="material-icons"
                          data-bs-toggle="tooltip"
                          title="Edit"
                        >
                          &#xE254;
                        </i>
                      </a>
                      <a
                        href="#"
                        className="delete cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteEmployeeModal"
                        onClick={() => Deletuser(elem._id)}
                      >
                        <i
                          className="material-icons"
                          data-bs-toggle="tooltip"
                          title="delete"
                        >
                          &#xE872;
                        </i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Box pour afficher les statistiques */}
          <div className="container">
            <div>
              <h3>Statistiques</h3>
              <p>Total : {stats.total} Ariary</p>
              <p>Minimum : {stats.min} Ariary</p>
              <p>Maximum : {stats.max} Ariary</p>
              <div className="myChart">
                <ChartComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
