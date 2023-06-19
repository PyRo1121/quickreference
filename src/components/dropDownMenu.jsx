import { createSignal, onCleanup } from 'solid-js';
import { For } from 'solid-js';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // Cleanup function to set isOpen to false on component unmount
  onCleanup(() => {
    setIsOpen(false);
  });

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Calls', href: '/results' },
    { label: 'Redeem Rewards', href: '' },
    { label: 'CAPTURE Records', href: '' },
    { label: 'Credit Card Statements', href: '' },
    { label: 'A Place to be heard', href: '' },
    { label: 'Solution Center', href: '' },
    { label: 'DMP', href: '' },
  ];

  return (
    <div class='dropdown z-50' onMouseEnter={handleMouseEnter}>
      <button class='btn-ghost btn-circle btn' aria-expanded={isOpen()}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'>
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='1'
            d='M4 6h16M4 12h16M4 18h7'
          />
        </svg>
      </button>
      {isOpen() && (
        <div class='dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow'>
          <ul>
            <For each={menuItems}>
              {(item) => (
                <li>
                  <a class='menu-item' href={item.href}>
                    {item.label}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
