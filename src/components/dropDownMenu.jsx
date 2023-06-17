import { createSignal, createEffect } from 'solid-js';
// TODO: Fix menu to not derender contents of CollapseTable when dropDown is clicked
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  createEffect(() => {
    const dropdownContent = document.querySelector('.dropdown-content');
    if (dropdownContent) {
      dropdownContent.style.zIndex = isOpen() ? 9999 : 'auto';
    }
  });

  return (
    <div
      class="dropdown"
      style={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        class="btn-ghost btn-circle btn"
        aria-expanded={isOpen()}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen())}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>
      {isOpen() && (
        <ul
          class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
          role="menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
      )}
    </div>
  );
};

export default DropdownMenu;
