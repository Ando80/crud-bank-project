import React, { useRef } from "react";

export default function DeletUser({ handleUserDelet }) {
  return (
    <>
      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h4 className="modal-title">Supprimer</h4>
                {/* <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button> */}
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer ces enregistrements ?</p>
                <p className="text-warning">
                  <small>Cette action ne peut pas être annulée.</small>
                </p>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-bs-dismiss="modal"
                  value="Cancel"
                />
                <input
                  type="button"
                  className="btn btn-danger"
                  value="Delete"
                  data-bs-dismiss="modal"
                  onClick={handleUserDelet}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
