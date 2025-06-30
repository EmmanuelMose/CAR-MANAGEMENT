import { toast } from "sonner";
import { carsAPI, type TCar } from "../../../Features/cars/carsAPI";


type DeleteCarProps = {
  car: TCar | null;
};

const DeleteCar = ({ car }: DeleteCarProps) => {
  const [deleteCar, { isLoading }] = carsAPI.useDeleteCarMutation({
    fixedCacheKey: "deleteCar",
  });

  const handleDelete = async () => {
    try {
      if (!car) {
        toast.error("No car selected for deletion.");
        return;
      }

      await deleteCar(car.carID);
      toast.success("Car deleted successfully!");
      (document.getElementById("delete_car_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Failed to delete car. Please try again.");
    }
  };

  return (
    <dialog id="delete_car_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-blue-100 text-blue-700 w-full max-w-lg rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Delete Car</h3>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{car?.carModel}</span>?
        </p>

        <div className="modal-action flex justify-end gap-4 border-t pt-4">
          <button
            className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner" /> Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
          <button
            type="button"
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
            onClick={() =>
              (document.getElementById("delete_car_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteCar;
