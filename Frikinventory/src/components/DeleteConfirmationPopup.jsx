import PopupWithForm from "./PopupWithForm";

function DeleteConfirmationPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onProductDelete();
  }
  return (
    <PopupWithForm
      name="delete"
      title="¿Estás seguro?"
      buttonTitle={props.isLoading ? "Guardando..." : "Si"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      {" "}
    </PopupWithForm>
  );
}
export default DeleteConfirmationPopup;
