import { createSignal, onCleanup } from 'solid-js';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // Cleanup function to set isOpen to false on component unmount
  onCleanup(() => {
    setIsOpen(false);
  });

  return (
    <div class='dropdown z-50 ' onMouseEnter={handleMouseEnter}>
      <button class='btn-ghost btn-circle btn' aria-expanded={isOpen()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='white'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='1'
            d='M4 6h16M4 12h16M4 18h7'
          />
        </svg>
      </button>
      {isOpen() && (
        <div
          class='dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow'
          onMouseEnter={handleMouseEnter}
        >
          <ul>
            <li>
              <a class='link1' href='/' role='menuitem'>
                Home
              </a>
            </li>
            <li>
              <a class='link1' target='_blank' href='/results' role='menuitem'>
                Calls
              </a>
            </li>
            <li>
              <a class='link1' target='_blank' href='' role='menuitem'>
                Redeem Rewards
              </a>
            </li>
            <li>
              <a class='link1' target='_blank' href='' role='menuitem'>
                CAPTURE Records
              </a>
            </li>
            <li>
              <a class='link1' target='_blank' href='' role='menuitem'>
                Credit Card Statements
              </a>
            </li>
            <li>
              <a class='link1' target='_blank' href='' role='menuitem'>
                A Place to be heard
              </a>
            </li>
            <li>
              <a class='link1' target='_blank' href='' role='menuitem'>
                Solution Center
              </a>
            </li>
            <li>
              <a class='link1' target='_blank' href='' role='menuitem'>
                DMP
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
