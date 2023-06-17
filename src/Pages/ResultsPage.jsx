import { createSignal, createEffect, onCleanup } from 'solid-js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ResultsTable = () => {
  const [formRecords, setFormRecords] = createSignal([]);
  const [selectedRecord, setSelectedRecord] = createSignal(null);
  const [isModalOpen, setModalOpen] = createSignal(false);

  createEffect(() => {
    fetchFormRecords();

    const interval = setInterval(fetchFormRecords, 300);

    onCleanup(() => {
      clearInterval(interval);
      setSelectedRecord(null);
    });

    async function fetchFormRecords() {
      const { data, error } = await supabase.from('form').select('*');
      if (error) {
        console.error('Error fetching form records:', error);
      } else {
        setFormRecords(data);
      }
    }
  });

  const deleteRecord = async (recordId) => {
    const { data, error } = await supabase.from('form').delete().eq('id', recordId);
    if (error) {
      console.error('Error deleting record:', error);
    } else {
      const updatedRecords = formRecords().filter((record) => record.id !== recordId);
      setFormRecords(updatedRecords);
      supabase.from('form').upsert(updatedRecords);
    }
  };

  const editRecord = async (record) => {
    try {
      const { data, error } = await supabase.from('form').select('*').eq('id', record.id).single();

      if (error) {
        console.error('Error fetching record:', error);
      } else {
        setSelectedRecord(data);
        setModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching record:', error);
    }
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setModalOpen(false);
  };

  const updateRecord = async (updatedRecord) => {
    const { data, error } = await supabase.from('form').update(updatedRecord).eq('id', updatedRecord.id);
    if (error) {
      console.error('Error updating record:', error);
    } else {
      const updatedRecords = formRecords().map((record) => (record.id === updatedRecord.id ? updatedRecord : record));
      setFormRecords(updatedRecords);
      supabase.from('form').upsert(updatedRecords);
      closeModal();
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Call Notes</h1>
      <div className="max-w-full">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 whitespace-nowrap">Caller Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Decedent's Name</th>
              <th className="px-4 py-2 whitespace-nowrap">Party ID</th>
              <th className="px-4 py-2 whitespace-nowrap">Reference Number</th>
              <th className="px-4 py-2 whitespace-nowrap">Notes</th>
              <th className="px-4 py-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formRecords().map((record, index) => (
              <tr key={record.id} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>
                <td className="px-4 py-2 whitespace-nowrap">{record.caller_name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{record.decedents_name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{record.party_id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{record.reference_number}</td>
                <td className="px-4 py-2 max-w-[20rem] whitespace-pre-wrap overflow-auto break-words">
                  {record.notes}
                </td>
                <td className="px-4 py-2 whitespace-nowrap space-x-5 flex justify-center">
                  <button
                    className="px-4 py-2 border border-info rounded-md text-sm font-medium text-white hover:bg-gray-800 bg-gray-500"
                    onClick={() => editRecord(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 border border-info rounded-md text-sm font-medium text-white hover:bg-gray-800 bg-gray-500"
                    onClick={() => deleteRecord(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen() && selectedRecord() !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="w-96 p-4 mx-auto bg-gray-800 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-white">Edit Record</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedRecord = {
                  id: selectedRecord().id,
                  caller_name: e.target.callerName.value,
                  decedents_name: e.target.decedentsName.value,
                  party_id: e.target.partyId.value,
                  reference_number: e.target.referenceNumber.value,
                  notes: e.target.notes.value,
                };
                updateRecord(updatedRecord);
              }}
            >
              <div className="mb-4">
                <label className="block mb-2 text-white" htmlFor="callerName">
                  Caller Name:
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-white"
                  type="text"
                  id="callerName"
                  value={selectedRecord().caller_name}
                  onInput={(e) =>
                    setSelectedRecord((prev) => ({ ...prev, caller_name: e.target.value }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-white" htmlFor="decedentsName">
                  Decedent's Name:
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-white"
                  type="text"
                  id="decedentsName"
                  value={selectedRecord().decedents_name}
                  onInput={(e) =>
                    setSelectedRecord((prev) => ({ ...prev, decedents_name: e.target.value }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-white" htmlFor="partyId">
                  Party ID:
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-white"
                  type="text"
                  id="partyId"
                  value={selectedRecord().party_id}
                  onInput={(e) =>
                    setSelectedRecord((prev) => ({ ...prev, party_id: e.target.value }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-white" htmlFor="referenceNumber">
                  Reference Number:
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-white"
                  type="text"
                  id="referenceNumber"
                  value={selectedRecord().reference_number}
                  onInput={(e) =>
                    setSelectedRecord((prev) => ({ ...prev, reference_number: e.target.value }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-white" htmlFor="notes">
                  Notes:
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-white h-40"
                  id="notes"
                  value={selectedRecord().notes}
                  onInput={(e) =>
                    setSelectedRecord((prev) => ({ ...prev, notes: e.target.value }))
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="px-4 py-2 border border-info rounded-md text-sm font-medium text-white hover:bg-gray-800 bg-gray-500"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 border border-info rounded-md text-sm font-medium text-white hover:bg-gray-800 bg-gray-500"
                  type="button"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
