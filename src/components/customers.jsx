import React, { useState } from "react";
import { PencilLine, Trash } from "lucide-react";
import Modal from "react-modal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

Modal.setAppElement("#root"); // For accessibility

const initialCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 123 456 7890",
    status: "Active",
    locked: false,
  },
  {
    id: 2,
    name: "Amal Benali",
    email: "amal.benali@gmail.com",
    phone: "+212 600 123456",
    status: "Inactive",
    locked: true,
  },
  // Add more customers here
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Export to Excel handler
  const exportToExcel = () => {
    // Prepare data (map to fields you want)
    const data = customers.map(({ id, name, email, phone, status, locked }) => ({
      ID: id,
      Name: name,
      Email: email,
      Phone: phone,
      Status: status,
      Locked: locked ? "Yes" : "No",
    }));

    // Create worksheet & workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    // Write workbook buffer
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Create Blob and save
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "customers.xlsx");
  };

  // The rest of your modal and table code stays the same, just add the export button

  // Open edit modal
  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setEditOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (customer) => {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  };

  // Handle form changes for editing
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedCustomer((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save edited customer
  const saveEdit = (e) => {
    e.preventDefault();
    setCustomers((prev) =>
      prev.map((cust) =>
        cust.id === selectedCustomer.id ? selectedCustomer : cust
      )
    );
    setEditOpen(false);
  };

  // Confirm delete customer
  const confirmDelete = () => {
    setCustomers((prev) => prev.filter((cust) => cust.id !== selectedCustomer.id));
    setDeleteOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Customers Management
        </h2>
        <button
          onClick={exportToExcel}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          title="Export customers to Excel"
        >
          Export Excel
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Locked
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {customers.map((customer, index) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {customer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {customer.locked ? (
                    <span className="text-red-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-green-600 font-semibold">No</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-4 justify-end">
                  <button
                    onClick={() => openEditModal(customer)}
                    className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                    aria-label={`Edit ${customer.name}`}
                  >
                    <PencilLine size={20} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(customer)}
                    className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                    aria-label={`Delete ${customer.name}`}
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={editOpen}
        onRequestClose={() => setEditOpen(false)}
        contentLabel="Edit Customer"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full p-6 outline-none"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Edit Customer
        </h3>
        {selectedCustomer && (
          <form onSubmit={saveEdit} className="space-y-4 text-gray-900 dark:text-gray-100">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={selectedCustomer.name}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={selectedCustomer.email}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={selectedCustomer.phone}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={selectedCustomer.status}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="locked"
                name="locked"
                type="checkbox"
                checked={selectedCustomer.locked}
                onChange={handleEditChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="locked" className="text-sm font-medium">
                Locked
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteOpen}
        onRequestClose={() => setDeleteOpen(false)}
        contentLabel="Delete Customer"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6 outline-none"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Confirm Delete
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{selectedCustomer?.name}</span>?
        </p>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setDeleteOpen(false)}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Customers;
