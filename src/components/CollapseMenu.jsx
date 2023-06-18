import { createSignal, onCleanup, onMount, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

const CollapseTable = () => {
  const [state, setState] = createStore({
    isWeeklySlaOpen: false,
    isContactsOpen: false,
  });

  const toggleWeeklySla = () => setState('isWeeklySlaOpen', (prev) => !prev);
  const toggleContacts = () => setState('isContactsOpen', (prev) => !prev);

  onMount(() => {
    const handleClick = (event) => {
      const isWeeklySlaTitle = event.target.closest(
        '.collapse-title.weekly-sla'
      );
      const isContactsTitle = event.target.closest('.collapse-title.contacts');

      // Check if the click occurred on the top portion of the table
      const isWeeklySlaTable = event.target.closest(
        '.collapse-table.weekly-sla'
      );
      const isContactsTable = event.target.closest('.collapse-table.contacts');

      if (isWeeklySlaTitle && !isWeeklySlaTable) {
        toggleWeeklySla();
      } else if (isContactsTitle && !isContactsTable) {
        toggleContacts();
      }
    };

    document.addEventListener('click', handleClick);

    onCleanup(() => {
      document.removeEventListener('click', handleClick);
    });
  });

  return (
    <div class='flex flex-col space-y-4'>
      <div
        tabIndex='0'
        class={`flex flex-col collapse collapse-arrow border border-base-300 bg-base-200`}
      >
        {/* Weekly SLA */}
        <div class='collapse-title text-xl font-medium p-4 weekly-sla'>
          Weekly SLA's
        </div>
        {state.isWeeklySlaOpen && (
          <div class='collapse-content p-4 weekly-sla'>
            <table class='table table-striped w-full'>
              <thead>
                <tr>
                  <th class='font-bold text-lg text-white'>Type</th>
                  <th class='font-bold text-lg text-white text-center'>
                    Business Days
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Reclamations</td>
                  <td class='text-center'>3</td>
                </tr>
                <tr>
                  <td>Funds Disbursement</td>
                  <td class='text-center'>2</td>
                </tr>
                <tr>
                  <td>Document Intake Review</td>
                  <td class='text-center'>7</td>
                </tr>
                <tr>
                  <td>Expedited Funds Disbursement</td>
                  <td class='text-center'>1</td>
                </tr>
                <tr>
                  <td>Escalated</td>
                  <td class='text-center'>2</td>
                </tr>
                <tr>
                  <td>Date of Death Balance</td>
                  <td class='text-center'>3</td>
                </tr>
                <tr>
                  <td>Unmapped</td>
                  <td class='text-center'>1</td>
                </tr>
                <tr>
                  <td>Protective Maintenance</td>
                  <td class='text-center'>2</td>
                </tr>
                <tr>
                  <td>Mailbox: Broken Case</td>
                  <td class='text-center'>2</td>
                </tr>
                <tr>
                  <td>Safe Deposit Box</td>
                  <td class='text-center'>5</td>
                </tr>
                <tr>
                  <td>Stop Payment</td>
                  <td class='text-center'>2</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div
        tabIndex='0'
        class={`flex flex-col collapse collapse-arrow border border-base-300 bg-base-200`}
      >
        {/* Contacts */}
        <div class='collapse-title text-xl font-medium p-4 contacts'>
          Contacts
        </div>
        {state.isContactsOpen && (
          <div class='collapse-content p-4 contacts'>
            <table class='table table-striped w-full'>
              <thead>
                <tr>
                  <th class='font-bold text-lg text-white'>Area</th>
                  <th class='font-bold text-lg text-white'>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Date of Death Balance Fax</td>
                  <td class='select-all'>415.343.9314</td>
                </tr>
                <tr>
                  <td>Fax</td>
                  <td class='select-all'>866.694.9046</td>
                </tr>
                <tr>
                  <td>Estate Recovery Unit</td>
                  <td class='select-all'>888.221.4299</td>
                </tr>
                <tr>
                  <td>Estate Unit</td>
                  <td class='select-all'>855.893.8793</td>
                </tr>
                <tr>
                  <td>Wealth</td>
                  <td class='select-all'>888.689.4476</td>
                </tr>
                <tr>
                  <td>Complex</td>
                  <td class='select-all'>888.689.4482</td>
                </tr>
                <tr>
                  <td>Preferred</td>
                  <td class='select-all'>888.698.5590</td>
                </tr>
                <tr>
                  <td>Preferred(IRA)</td>
                  <td class='select-all'>888.698.5591</td>
                </tr>
                <tr>
                  <td>Standard</td>
                  <td class='select-all'>866.337.1189</td>
                </tr>
                <tr>
                  <td>Reclamations</td>
                  <td class='select-all'>800.820.3057</td>
                </tr>
                <tr>
                  <td>Unclaimed</td>
                  <td class='select-all'>877.830.4910</td>
                </tr>
                <tr>
                  <td>Auto</td>
                  <td class='select-all'>877.243.5796</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapseTable;
