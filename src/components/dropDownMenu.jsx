import { createSignal } from 'solid-js';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div class="dropdown fixed top-0 left-0" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button class="btn-ghost btn-circle btn" aria-expanded={isOpen()} aria-haspopup="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>
      <ul
        class={`dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow ${isOpen() ? 'open' : ''}`}
        role="menu"
      >
        <li>
          <a class="link1" href="/" role="menuitem">
            Home
          </a>
        </li>
        <li>
          <a class="link1" target="_blank" href="/results" role="menuitem">
            Calls
          </a>
        </li>
        <li>
          <a class="link1" target="_blank" href="" role="menuitem">
            Redeem Rewards
          </a>
        </li>
        <li>
          <a class="link1" target="_blank" href="" role="menuitem">
            CAPTURE Records
          </a>
        </li>
        <li>
          <a class="link1" target="_blank" href="" role="menuitem">
            Credit Card Statements
          </a>
        </li>
        <li>
          <a class="link1" target="_blank" href="" role="menuitem">
            A Place to be heard
          </a>
        </li>
        <li>
          <a class="link1" target="_blank" href="" role="menuitem">
            Solution Center
          </a>
        </li>
        <li>
          <a class="link1" target="_blank" href="" role="menuitem">
            DMP
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
