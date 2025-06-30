import  db  from '../Drizzle/db';
import { MaintenanceTable, TIMaintenance } from '../Drizzle/schema';
import { eq } from 'drizzle-orm';

// Get all maintenance records
export const getAll = async () => {
    const maintenances = await db.query.MaintenanceTable.findMany();
    return maintenances;
}


// Get maintenance record by ID
export const getById = async (id: number) => {
    const maintenance = await db.query.MaintenanceTable.findFirst({
        where: eq(MaintenanceTable.maintenanceID, id)
    });
    return maintenance;
}
// Create a new maintenance record
export const create = async (maintenance: TIMaintenance) => {
    const [inserted] = await db.insert(MaintenanceTable).values(maintenance).returning();
    if (inserted) {
        return inserted;
    }
    return null;
}

// Update maintenance record by ID
export const update = async (MaintenanceId: number, maintenance: TIMaintenance) => {
    await db.update(MaintenanceTable).set(maintenance).where(eq(MaintenanceTable.maintenanceID, MaintenanceId));
    return "Maintenance updated successfully";

}


// Delete maintenance record by ID
export const remove = async (maintenanceID: number) => {
    await db
    .delete(MaintenanceTable)
    .where(eq(MaintenanceTable.maintenanceID, maintenanceID));

    return "Maintenance record deleted successfully";
};
