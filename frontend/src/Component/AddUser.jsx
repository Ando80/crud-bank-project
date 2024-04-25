import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddUser() {
  const [formValues, setFormValues] = useState({
    count: "",
    firstname: "",
    bankname: "",
    money: "",
    date: "",
  });
  const [errors, setErrors] = useState({
    count: "",
    firstname: "",
    bankname: "",
    money: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "count":
      case "money":
        errorMessage = isNaN(value) ? "Ce champ doit être un nombre." : "";
        break;
      case "firstname":
      case "bankname":
        errorMessage = /^[a-zA-Z]+$/.test(value)
          ? ""
          : "Ce champ doit être une chaîne de caractères.";
        break;
      default:
        errorMessage = "";
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const CloseRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isError = false;
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        setErrors({
          ...errors,
          [key]: `Veuillez remplir le champ ${key}`,
        });
        isError = true;
      }
    });

    if (isError) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/create",
        formValues
      );
      if (response.data.success) {
        toast.success(response.data.Message);
        CloseRef.current.click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Nouveau Prêt</h4>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-hidden="true"
                  ref={CloseRef}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Numero Compte</label>
                  <input
                    type="text"
                    value={formValues.count}
                    name="count"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <span className="text-danger">{errors.count}</span>
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    value={formValues.firstname}
                    name="firstname"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <span className="text-danger">{errors.firstname}</span>
                </div>
                <div className="form-group">
                  <label>Nom Banque </label>
                  <input
                    type="text"
                    value={formValues.bankname}
                    name="bankname"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <span className="text-danger">{errors.bankname}</span>
                </div>
                <div className="form-group">
                  <label>Montant</label>
                  <input
                    type="text"
                    value={formValues.money}
                    name="money"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <span className="text-danger">{errors.money}</span>
                </div>
                <div className="form-group">
                  <label>Date Prêt</label>
                  <input
                    type="date"
                    value={formValues.date}
                    name="date"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <span className="text-danger">{errors.date}</span>
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-bs-dismiss="modal"
                  value="Annuler"
                />
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Ajouter"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
