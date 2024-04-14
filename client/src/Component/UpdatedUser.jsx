export default function UpdateUser({ handleOnSubmit, value, handleChange }) {
  return (
    <>
      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleOnSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Modifier</h4>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Numero Compte</label>
                  <input
                    type="text"
                    value={value.count}
                    name="count"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    value={value.firstname}
                    name="firstname"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Nom Banque</label>
                  <input
                    type="text"
                    value={value.bankname}
                    name="bankname"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Montant</label>
                  <input
                    type="text"
                    value={value.money}
                    name="money"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>

                  <input
                    type="date"
                    value={value.date}
                    name="date"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Update"
                  data-bs-dismiss="modal"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
