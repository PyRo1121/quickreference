import { createSignal } from 'solid-js';
import { createClient } from '@supabase/supabase-js';
import CollapseTable from '../components/CollapseMenu';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const Modal = ({ id, title, content }) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <label for={id} class="h-11 px-4 py-2 border border-info rounded-md text-sm font-medium text-white hover:bg-gray-800 cursor-pointer">
        {title}
      </label>
      <input type="checkbox" id={id} class="modal-toggle" />
      <div class={`modal ${isOpen() ? 'open' : ''}`}>
        <div class="modal-box">
          <h5 class="text-center select-all">{title}</h5>
          <div class="divider"></div>
          {content}
          <div class="modal-action">
            <label for={id} class="btn">Close</label>
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
  const [notes, setNotes] = createSignal(`1. Authentication Notes:\n2. Review Reward Guidelines:\n3. Applicable Disclosures Read:\n4. Complaint Number (If Applicable):\n5. Other Case Details:`);

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
    const { data, error } = await supabase
      .from('form')
      .insert([
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

    // Reset form fields
    setCallerName('');
    setDecedentsName('');
    setPartyId('');
    setReferenceNumber('');
    setNotes(`1. Authentication Notes:\n2. Review Reward Guidelines:\n3. Applicable Disclosures Read:\n4. Complaint Number (If Applicable):\n5. Other Case Details:`);
  };

  const handleReset = () => {
    // Reset form fields
    setCallerName('');
    setDecedentsName('');
    setPartyId('');
    setReferenceNumber('');
    setNotes(`1. Authentication Notes:\n2. Review Reward Guidelines:\n3. Applicable Disclosures Read:\n4. Complaint Number (If Applicable):\n5. Other Case Details:`);

    // Reset the notes field by its element ID
    const notesTextarea = document.getElementById('notesTextarea');
    if (notesTextarea) {
      notesTextarea.textContent = `1. Authentication Notes:\n2. Review Reward Guidelines:\n3. Applicable Disclosures Read:\n4. Complaint Number (If Applicable):\n5. Other Case Details:`;
    }
  };

  return (
    <div>
      <div class="flex flex-row space-x-2 h-11 my-2 justify-center mb-4">
      <Modal
        id="my-modal-0"
        title="Non-Liable Disclosure"
        content={
          <p>
            &emsp; Please be advised that we are requesting payment from the assets of the decedent’s Estate and not you individually.
          </p>
        }
      />
      <Modal
        id="my-modal-1"
        title="Reward Points Disclosure"
        content={
          <>
            <ul class="p-0">
              &emsp;To redeem rewards, certain conditions must be met and restrictions apply. Redemption depends on the final status of the account, is subject to the account being closed and paid in full, and is in our sole discretion.
            </ul>
            <br />
            <ul class="p-0">
              &emsp; Rewards redemption must be requested. If the account is not paid in full at the time of the request, you as the authorized representative of the estate must state that the remaining account balance will be paid in full, and redemption will not occur until such payment is made. Redemption and payment of the remaining account balance must occur within 57 calendar days of [date that account changed to deceased status].
            </ul>
            <br />
            <ul class="p-0">
              &emsp; Do you intend to pay the remaining balance with assets of the estate to redeem rewards?
            </ul>
          </>
        }
      />
      <Modal
        id="my-modal-2"
        title="Refund Disclosure"
        content={
          <>
            <ul class="p-0">
              &emsp; Once the requested information is received and verified, a refund request is submitted, subject to approval, the refund could take up to ten (10) days before the funds are received.
            </ul>
            <br />
            <ul class="p-0">
              &emsp; Please be advised that if there were any charges made after the date of passing of the account holder(s), those charges may be deducted from the payments received after the date of passing, which may reduce the amount of any refund.
            </ul>
          </>
        }
      /></div>
      <CollapseTable />
      <form onSubmit={handleSubmit} id="quickForm">
        {/* Caller Name */}
        <div class="flex flex-row space-x-2 h-11 my-2">
          <label class="my-3 whitespace-nowrap" for="caller">
            Caller:
          </label>
          <input
            type="text"
            class="form-control w-screen rounded-md border border-info bg-transparent"
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
            class="form-control w-screen rounded-md border border-info bg-transparent"
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
            class="form-control w-screen rounded-md border border-info bg-transparent"
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
            class="form-control w-screen rounded-md border border-info bg-transparent placeholder:ms-3"
            placeholder="Reference/Case #"
            id="reference"
            aria-label="Reference/Case Number"
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
            autocapitalize="on"
            spellcheck="true"
            name="notes"
            rows="5"
            value={notes()}
            onInput={(event) => setNotes(event.target.value)}
          ></textarea>
        </div>

        {/* Form Buttons */}
        <div class="flex flex-row justify-center space-x-2 pt-2">
          <button
            class="h-11 px-4 py-2 border border-info rounded-md text-sm font-medium text-white hover:bg-gray-800"
            type="reset"
            aria-label="Reset Notes"
            id="resetButton"
            onClick={handleReset}
          >
            Reset Notes
          </button>
          <button
            class="h-11 px-4 py-2 border border-info rounded-md text-sm font-medium text-white hover:bg-gray-800"
            aria-label="Copy Notes"
            id="copyID"
            value="Copy"
            type="button"
          >
            Copy
          </button>
          <button
            class="h-11 px-4 py-2 border border-info rounded-md text-sm font-medium text-white hover:bg-gray-800"
            aria-label="Submit Form"
            id="submitButton"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
