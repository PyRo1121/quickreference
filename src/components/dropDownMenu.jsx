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
    <div class="dropdown z-50 relative" onMouseEnter={handleMouseEnter}>
      {/* Toggle Button */}
      <button class="btn-ghost btn-circle btn" aria-expanded={isOpen()} aria-label="Toggle Menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          role="img"
        >
          <title>Toggle Menu</title>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen() && (
        <div class="dropdown-content menu absolute left-0 mt-2 w-52 bg-base-100 p-2 shadow">
          <ul role="presentation">
            {/* Menu Items */}
            <For each={menuItems}>
              {(item) => (
                <li role="none">
                  <a class="menu-item" href={item.href} role="menuitem">
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
