import { createSignal, createEffect, onCleanup } from 'solid-js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ResultsTable = () => {
  const [formRecords, setFormRecords] = createSignal([]);

  createEffect(() => {
    // Fetch initial form records from Supabase
    fetchFormRecords();

    // Subscribe to real-time changes
    const subscription = supabase
      .from('form')
      .on('*', handleRealtimeUpdate)
      .subscribe();

    // Clean up subscription on component unmount
    onCleanup(() => {
      subscription.unsubscribe();
    });

    // Define the fetchFormRecords function within the effect
    async function fetchFormRecords() {
      const { data, error } = await supabase.from('form').select('*');
      if (error) {
        console.error('Error fetching form records:', error);
      } else {
        setFormRecords(data);
      }
    }
  });

  const handleRealtimeUpdate = (payload) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    if (eventType === 'INSERT') {
      setFormRecords((prevRecords) => [...prevRecords, newRecord]);
    } else if (eventType === 'UPDATE') {
      setFormRecords((prevRecords) =>
        prevRecords.map((record) => (record.id === newRecord.id ? newRecord : record))
      );
    } else if (eventType === 'DELETE') {
      setFormRecords((prevRecords) => prevRecords.filter((record) => record.id !== oldRecord.id));
    }
  };

  const deleteRecord = async (recordId) => {
    const { data, error } = await supabase.from('form').delete().eq('id', recordId);
    if (error) {
      console.error('Error deleting record:', error);
    } else {
      // Handle the real-time update for the deleted record
      const updatedRecords = formRecords().filter((record) => record.id !== recordId);
      setFormRecords(updatedRecords);
      supabase.from('form').upsert(updatedRecords);
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
              <tr
                key={record.id}
                className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg#A6ADBA'}`}
              >
                <td className="px-4 py-2 whitespace-nowrap">{record.caller_name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{record.decedents_name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{record.party_id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{record.reference_number}</td>
                <td className="px-4 py-2 max-w-[20rem] whitespace-pre-wrap overflow-auto break-words">{record.notes}</td>
                <td className="px-4 py-2 whitespace-nowrap space-x-5 flex justify-center">
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
    </div>
  );
};

export default ResultsTable;
