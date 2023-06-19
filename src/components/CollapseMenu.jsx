import { onCleanup, onMount, createSignal, For } from 'solid-js';
import data from '../assets/data.json'; // or the path where you placed data.json

const CollapseTable = () => {
  const [state, setState] = createSignal({});

  const toggle = (type) => setState((prev) => ({ ...prev, [type]: !prev[type] }));

  onMount(() => {
    const handleClick = (event) => {
      const type = event.target.getAttribute('data-type');
      const isTitle = event.target.classList.contains('collapse-title');

      if (isTitle) {
        toggle(type);
      }
    };

    document.addEventListener('click', handleClick);

    onCleanup(() => {
      document.removeEventListener('click', handleClick);
    });
  });

  return (
    <div class='flex flex-col space-y-4'>
      <For each={data}>
        {({ title, type, rows }) => (
          <div
            tabIndex='0'
            class={`flex flex-col collapse collapse-arrow border border-base-300 bg-base-200`}
            role='region'
            aria-expanded={state()[type]}
          >
            {/* Collapse Title */}
            <div
              class={`collapse-title text-xl font-medium p-4`}
              data-type={type}
              role='button'
              aria-label='Toggle Collapse'
              tabIndex='0'
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  toggle(type);
                }
              }}
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
