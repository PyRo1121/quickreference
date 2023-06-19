import { createSignal, For } from 'solid-js';

const CollapseTable = () => {
  const [state, setState] = createSignal({});

  const toggle = (type) => setState((prev) => ({ ...prev, [type]: !prev[type] }));

  const handleToggle = (type) => {
    toggle(type);
  };

  const data = [
    {
      title: "Weekly SLA's",
      type: 'weekly-sla',
      rows: [
        { Type: 'Reclamations', 'Business Days': '3' },
        { Type: 'Funds Disbursement', 'Business Days': '2' },
        { Type: 'Document Intake Review', 'Business Days': '7' },
        { Type: 'Expedited Funds Disbursement', 'Business Days': '1' },
        { Type: 'Escalated', 'Business Days': '2' },
        { Type: 'Date of Death Balance', 'Business Days': '3' },
        { Type: 'Unmapped', 'Business Days': '1' },
        { Type: 'Protective Maintenance', 'Business Days': '2' },
        { Type: 'Mailbox: Broken Case', 'Business Days': '2' },
        { Type: 'Safe Deposit Box', 'Business Days': '5' },
        { Type: 'Stop Payment', 'Business Days': '2' },
      ],
    },
    {
      title: 'Contacts',
      type: 'contacts',
      rows: [
        { Area: 'Date of Death Balance Fax', 'Phone Number': '415.343.9314' },
        { Area: 'Fax', 'Phone Number': '866.694.9046' },
        { Area: 'Estate Recovery Unit', 'Phone Number': '888.221.4299' },
        { Area: 'Estate Unit', 'Phone Number': '855.893.8793' },
        { Area: 'Wealth', 'Phone Number': '888.689.4476' },
        { Area: 'Complex', 'Phone Number': '888.689.4482' },
        { Area: 'Preferred', 'Phone Number': '888.698.5590' },
        { Area: 'Preferred(IRA)', 'Phone Number': '888.698.5591' },
        { Area: 'Standard', 'Phone Number': '866.337.1189' },
        { Area: 'Reclamations', 'Phone Number': '800.820.3057' },
        { Area: 'Unclaimed', 'Phone Number': '877.830.4910' },
        { Area: 'Auto', 'Phone Number': '877.243.5796' },
      ],
    },
  ];

  return (
    <div class='flex flex-col space-y-4'>
      <For each={data}>
        {({ title, type, rows }) => (
          <div
            tabIndex='0'
            class={`flex flex-col collapse collapse-arrow border border-base-300 bg-base-200 ${
              state()[type] ? 'open' : ''
            }`}
            role='region'
            aria-expanded={state()[type]}
            onClick={() => handleToggle(type)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleToggle(type);
              }
            }}
          >
            {/* Collapse Title */}
            <div
              class={`collapse-title text-xl font-medium p-4`}
              role='button'
              aria-label='Toggle Collapse'
            >
              {title}
            </div>

            {/* Collapse Content */}
            {state()[type] && (
              <div class={`collapse-content p-4`}>
                <table class='table table-striped w-full' role='table'>
                  <thead>
                    <tr>
                      <For each={Object.keys(rows[0])}>
                        {(key) => <th class='font-bold text-lg text-white'>{key}</th>}
                      </For>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={rows}>
                      {(row) => (
                        <tr>
                          <For each={Object.values(row)}>
                            {(value) => <td class='select-all'>{value}</td>}
                          </For>
                        </tr>
                      )}
                    </For>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </For>
    </div>
  );
};

export default CollapseTable;
