import PropTypes from "prop-types"; // Ajoutez cette importation en haut de votre fichier

// Définissez les types attendus pour vos props
UpdatedUser.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  value: PropTypes.shape({
    count: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    bankname: PropTypes.string.isRequired,
    money: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
};

export default function UpdatedUser({ handleOnSubmit, value, handleOnChange }) {
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
                    onChange={handleOnChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    value={value.firstname}
                    name="firstname"
                    onChange={handleOnChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Nom Banque</label>
                  <input
                    type="text"
                    value={value.bankname}
                    name="bankname"
                    onChange={handleOnChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Montant</label>
                  <input
                    type="text"
                    value={value.money}
                    name="money"
                    onChange={handleOnChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>

                  <input
                    type="date"
                    value={value.date}
                    name="date"
                    onChange={handleOnChange}
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
