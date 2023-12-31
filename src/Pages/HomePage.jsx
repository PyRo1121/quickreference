/* eslint-disable no-undef */
import { createSignal, onCleanup, createEffect } from 'solid-js';
import { supabase } from '../components/supabaseClient';
import CollapseTable from '../components/CollapseMenu';
import toast, { Toaster } from 'solid-toast';

const notify = () =>
  toast.success('Call Record Saved.', {
    duration: 3000,
    position: 'top-center',
    aria: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

const handleCollapseTableToggle = () => {
  setCollapseTableIsOpen(!collapseTableIsOpen());
};

const Modal = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleToggle = () => {
    props.onModalToggle(props.title, isOpen());
    setIsOpen(!isOpen());
  };

  return (
    <>
      <label
        for={props.id}
        class="h-11 px-4 py-2 border border-info rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer"
      >
        {props.title}
      </label>
      <input type="checkbox" id={props.id} class="modal-toggle" onChange={handleToggle} />
      <div class={`modal ${isOpen() ? 'open' : ''}`}>
        <div class="modal-box">
          <h5 class="text-center select-all">{props.title}</h5>
          <div class="divider" aria-hidden="true" />
          <div class="modal-content break-words">{props.content}</div>
          <div class="modal-action">
            <label for={props.id} class="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

const HomePage = () => {
  const [callerName, setCallerName] = createSignal('');
  const [decedentsName, setDecedentsName] = createSignal('');
  const [partyId, setPartyId] = createSignal('');
  const [referenceNumber, setReferenceNumber] = createSignal('');
  const [notes, setNotes] = createSignal(
    `1. Authentication Notes:\n2. Review Reward Guidelines:\n3. Applicable Disclosures Read:\n4. Complaint Number (If Applicable):\n5. Other Case Details:`
  );
  const [modalTitles, setModalTitles] = createSignal([]);

  const handleCopyNotes = async () => {
    const notesValue = notes();

    try {
      await navigator.clipboard.writeText(notesValue);
      console.log('Notes copied to clipboard:', notesValue);
    } catch (error) {
      console.error('Error copying notes:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform form submission logic here
    console.log('Form submitted:', {
      callerName: callerName(),
      decedentsName: decedentsName(),
      partyId: partyId(),
      referenceNumber: referenceNumber(),
      notes: notes(),
    });

    // Save the form data to Supabase
    const { data, error } = await supabase.from('form').insert([
      {
        caller_name: callerName(),
        decedents_name: decedentsName(),
        party_id: partyId(),
        reference_number: referenceNumber(),
        notes: notes(),
      },
    ]);

    if (error) {
      console.error('Error saving form data:', error);
    } else {
      console.log('Form data saved:', data);
    }

    // Reset form fields```jsx
    setCallerName('');
    setDecedentsName('');
    setPartyId('');
    setReferenceNumber('');
    setNotes(
      `1. Authentication Notes:\n2. Review Reward Guidelines:\n3. Applicable Disclosures Read:\n4. Complaint Number (If Applicable):\n5. Other Case Details:`
    );
    setModalTitles([]); // Clear the modal titles
  };

  const handleReset = () => {
    // Reset form fields
    setCallerName('');
    setDecedentsName('');
    setPartyId('');
    setReferenceNumber('');
    setNotes(
      `1. Authentication Notes:\n2. Review Reward Guidelines:\n3. Applicable Disclosures Read:\n4. Complaint Number (If Applicable):\n5. Other Case Details:`
    );
    setModalTitles([]); // Clear the modal titles
  };

  const handleModalToggle = (title, isOpen) => {
    if (!isOpen) {
      // Modal is being opened, add the title to the modalTitles state if it doesn't already exist
      if (!modalTitles().includes(title)) {
        setModalTitles([...modalTitles(), title]);
      }
    }
  };

  createEffect(() => {
    const applicableDisclosuresRead = '3. Applicable Disclosures Read:';
    const lines = notes().split('\n');
    let applicableDisclosuresLineIndex = -1;

    // Find the index of the line "3. Applicable Disclosures Read"
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith(applicableDisclosuresRead)) {
        applicableDisclosuresLineIndex = i;
        break;
      }
    }

    // If the line "3. Applicable Disclosures Read" doesn't exist, add it
    if (applicableDisclosuresLineIndex === -1) {
      lines.push(applicableDisclosuresRead);
      applicableDisclosuresLineIndex = lines.length - 1;
    }

    const modalTitlesString = modalTitles().join('; ');
    lines[applicableDisclosuresLineIndex] = `${applicableDisclosuresRead} ${modalTitlesString}`;

    setNotes(lines.join('\n'));
  });

  // Add the event listener on component mount
  onCleanup(() => {
    document.removeEventListener('change', handleCheckboxChange);
  });

  return (
    <div class="w-98">
      {/* Modal Buttons */}
      <div class="flex flex-row space-x-2 h-11 my-2 justify-center mb-4" role="toolbar">
        <Modal
          id="my-modal-0"
          title="Non-Liable Disclosure"
          content={
            <p class="text-sm">
              &emsp; Please be advised that we are requesting payment from the assets of the
              decedent’s Estate and not you individually.
            </p>
          }
          onModalToggle={handleModalToggle}
        />
        <Modal
          id="my-modal-1"
          title="Reward Points Disclosure"
          content={
            <>
              <ul class="text-sm">
                &emsp;To redeem rewards, certain conditions must be met and restrictions apply.
                Redemption depends on the final status of the account, is subject to the account
                being closed and paid in full, and is in our sole discretion.
              </ul>
              <br />
              <ul class="text-sm">
                &emsp; Rewards redemption must be requested. If the account is not paid in full at
                the time of the request, you as the authorized representative of the estate must
                state that the remaining account balance will be paid in full, and redemption will
                not occur until such```jsx payment is made. Redemption and payment of the remaining
                account balance must occur within 57 calendar days of [date that account changed to
                deceased status].
              </ul>
              <br />
              <ul class="text-sm">
                &emsp; Do you intend to pay the remaining balance with assets of the estate to
                redeem rewards?
              </ul>
            </>
          }
          onModalToggle={handleModalToggle}
        />
        <Modal
          id="my-modal-2"
          title="Refund Disclosure"
          content={
            <>
              <ul class="text-sm">
                &emsp; Once the requested information is received and verified, a refund request is
                submitted, subject to approval, the refund could take up to ten (10) days before the
                funds are received.
              </ul>
              <br />
              <ul class="text-sm">
                &emsp; Please be advised that if there were any charges made after the date of
                passing of the account holder(s), those charges may be deducted from the payments
                received after the date of passing, which may reduce the amount of any refund.
              </ul>
            </>
          }
          onModalToggle={handleModalToggle}
        />
      </div>
      <CollapseTable isOpen={collapseTableIsOpen()} onToggle={handleCollapseTableToggle} />
      <form onSubmit={handleSubmit} id="quickForm">
        {/* Caller Name */}
        <div class="flex flex-row space-x-2 h-11 my-2">
          <label class="my-3 whitespace-nowrap" for="caller">
            Caller:
          </label>
          <input
            type="text"
            class="form-control w-screen rounded-md border border-info bg-transparent pl-3"
            placeholder="Caller Name"
            id="caller"
            aria-label="Caller Name"
            autofocus
            value={callerName()}
            onInput={(event) => setCallerName(event.target.value)}
          />
        </div>

        {/* Decedent's Name */}
        <div class="flex flex-row space-x-2 h-11 my-2">
          <label class="my-3 whitespace-nowrap" for="deceased">
            Decedent:
          </label>
          <input
            type="text"
            class="form-control w-screen rounded-md border border-info bg-transparent pl-3"
            placeholder="Decedent's Name"
            id="deceased"
            aria-label="Decedent's Name"
            value={decedentsName()}
            onInput={(event) => setDecedentsName(event.target.value)}
          />
        </div>

        {/* Party ID */}
        <div class="flex flex-row space-x-2 h-11 my-2">
          <label class="my-3 whitespace-nowrap" for="partyID">
            Party ID:
          </label>
          <input
            type="text"
            class="form-control w-screen rounded-md border border-info bg-transparent pl-3"
            placeholder="Party ID"
            id="partyID"
            aria-label="Party ID"
            value={partyId()}
            onInput={(event) => setPartyId(event.target.value)}
          />
        </div>

        {/* Reference Number */}
        <div class="flex flex-row space-x-2 h-11 my-2">
          <label class="my-3 whitespace-nowrap" id="addressLabel">
            Reference Number:
          </label>
          <input
            type="text"
            class="form-control w-screen rounded-md border border-info bg-transparent pl-3"
            placeholder="Reference/Case #"
            id="reference"
            aria-label="Reference/```jsx
Case Number"
            value={referenceNumber()}
            onInput={(event) => setReferenceNumber(event.target.value)}
          />
        </div>

        {/* Notes */}
        <label for="notesTextarea" id="notenote">
          Notes:
        </label>
        <div class="flex flex-row pt-2 my-2">
          <textarea
            class="align-left form-control w-full resize-none overflow-hidden rounded-md border border-info bg-transparent pl-2"
            id="notesTextarea"
            aria-label="Notes"
            autoCapitalize="on"
            spellCheck="true"
            name="notes"
            rows="5"
            value={notes()}
            onInput={(event) => setNotes(event.target.value)}
          />
        </div>

        {/* Form Buttons */}
        <div class="flex flex-row justify-center space-x-2 pt-2">
          <button
            class="h-11 px-4 py-2 border border-info rounded-md text-sm font-medium hover:bg-gray-800"
            type="reset"
            aria-label="Reset Notes"
            id="resetButton"
            onClick={handleReset}
          >
            Reset Notes
          </button>
          <button
            class="h-11 px-4 py-2 border border-info rounded-md text-sm font-medium hover:bg-gray-800"
            aria-label="Copy Notes"
            id="copyID"
            value="Copy"
            type="button"
            onClick={handleCopyNotes}
          >
            Copy
          </button>
          <button
            class="h-11 px-4 py-2 border border-info rounded-md text-sm font-medium hover:bg-gray-800"
            aria-label="Submit Form"
            id="submitButton"
            type="submit"
            onClick={notify}
          >
            Submit
          </button>
          <Toaster />
        </div>
      </form>
    </div>
  );
};

export default HomePage;
