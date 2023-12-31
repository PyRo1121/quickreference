import { createSignal, createEffect, onCleanup, For } from 'solid-js';
import { supabase } from '../components/supabaseClient';
import toast, { Toaster } from 'solid-toast';

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
    const { error } = await supabase.from('form').delete().eq('id', recordId);
    if (error) {
      console.error('Error deleting record:', error);
    } else {
      const updatedRecords = formRecords().filter((record) => record.id !== recordId);
      setFormRecords(updatedRecords);
      supabase.from('form').upsert(updatedRecords);
      toast.success('Call Record Deleted.', {
        duration: 3000,
        position: 'top-center',
        aria: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
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
    const { error } = await supabase.from('form').update(updatedRecord).eq('id', updatedRecord.id);
    if (error) {
      console.error('Error updating record:', error);
    } else {
      const updatedRecords = formRecords().map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record
      );
      setFormRecords(updatedRecords);
      supabase.from('form').upsert(updatedRecords);
      closeModal();
    }
  };

  return (
    <div class="overflow-x-auto">
      <h1 class="text-2xl font-bold mb-4 text-center" tabIndex="0">
        Call Notes
        <Toaster />
      </h1>
      <div class="max-w-full">
        <table class="w-full table-auto" role="table">
          <thead>
            <tr>
              <th class="px-4 py-2 whitespace-nowrap text-left" scope="col" tabIndex="0">
                Caller Name
              </th>
              <th class="px-4 py-2 whitespace-nowrap text-left" scope="col" tabIndex="0">
                Decedent's Name
              </th>
              <th class="px-4 py-2 whitespace-nowrap text-left" scope="col" tabIndex="0">
                Party ID
              </th>
              <th class="px-4 py-2 whitespace-nowrap text-left" scope="col" tabIndex="0">
                Reference Number
              </th>
              <th class="px-4 py-2 whitespace-nowrap text-left" scope="col" tabIndex="0">
                Notes
              </th>
              <th class="px-4 py-2 whitespace-nowrap text-center" scope="col" tabIndex="0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <For each={formRecords()}>
              {(record, index) => (
                <tr class={`${index() % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>
                  <td class="px-4 py-2 whitespace-nowrap" tabIndex="0">
                    {record.caller_name}
                  </td>
                  <td class="px-4 py-2 whitespace-nowrap" tabIndex="0">
                    {record.decedents_name}
                  </td>
                  <td class="px-4 py-2 whitespace-nowrap" tabIndex="0">
                    {record.party_id}
                  </td>
                  <td class="px-4 py-2 whitespace-nowrap" tabIndex="0">
                    {record.reference_number}
                  </td>
                  <td
                    class="px-4 py-2 max-w-[20rem] whitespace-pre-wrap overflow-auto break-words"
                    tabIndex="0"
                  >
                    {record.notes}
                  </td>
                  <td class="px-4 py-2 whitespace-nowrap">
                    <div class="flex items-center justify-center h-full space-x-5">
                      <button
                        class="px-4 py-2 border border-info rounded-md text-sm font-medium"
                        onClick={() => editRecord(record)}
                      >
                        Edit
                      </button>
                      <button
                        class="px-4 py-2 border border-info rounded-md text-sm font-medium"
                        onClick={() => deleteRecord(record.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>

      {isModalOpen() && selectedRecord() !== null && (
        <div
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div class="w-96 p-4 mx-auto bg-gray-800 rounded shadow">
            <h2 class="text-2xl font-bold mb-4" tabIndex="0">
              Edit Record
            </h2>
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
              <div class="mb-4">
                <label class="block mb-2" for="callerName" tabIndex="0">
                  Caller Name:
                </label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="callerName"
                  value={selectedRecord().caller_name}
                  onInput={(e) =>
                    setSelectedRecord((prev) => ({
                      ...prev,
                      caller_name: e.target.value,
                    }))
                  }
                />
              </div>
              <div class="mb-4">
                <label class="block mb-2" for="decedentsName" tabIndex="0">
                  Decedent's Name:
                </label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="decedentsName"
                  value={selectedRecord().decedents_name}
                  onInput={(e) =>
                    setSelectedRecord((prev) => ({
                      ...prev,
                      decedents_name: e.target.value,
                    }))
                  }
                />
              </div>
              <div class="mb-4">
                <label class="block mb-2" for="partyId" tabIndex="0">
                  Party ID:
                </label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="partyId"
                  value={selectedRecord().party_id}
                  onInput={(e) =>
                    setSelectedRecord((prev) => ({
                      ...prev,
                      party_id: e.target.value,
                    }))
                  }
                />
              </div>
              <div class="mb-4">
                <label class="block mb-2" for="referenceNumber" tabIndex="0">
                  Reference Number:
                </label>
                <input
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  type="text"
                  id="referenceNumber"
                  value={selectedRecord().reference_number}
                  onInput={(e) =>
                    setSelectedRecord((prev) => ({
                      ...prev,
                      reference_number: e.target.value,
                    }))
                  }
                />
              </div>
              <div class="mb-4">
                <label class="block mb-2" for="notes" tabIndex="0">
                  Notes:
                </label>
                <textarea
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 h-40"
                  id="notes"
                  value={selectedRecord().notes}
                  onInput={(e) =>
                    setSelectedRecord((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                />
              </div>
              <div class="flex justify-between items-center">
                <button
                  class="px-4 py-2 border border-info rounded-md text-sm font-medium"
                  type="button"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  class="px-4 py-2 border border-info rounded-md text-sm font-medium"
                  type="submit"
                >
                  Save
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
