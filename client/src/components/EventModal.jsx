import { useState } from "react";

const EventModal = ({ date, onClose, onSave }) => {
  const [text, setText] = useState("");

  const submit = () => {
    if (text.trim()) {
      onSave(date, text.trim());
      setText("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl shadow-xl w-80">
        <h3 className="text-lg font-semibold mb-2">Add Event - {date}</h3>
        <input
          type="text"
          className="w-full border p-2 rounded mb-3"
          placeholder="Event description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button onClick={submit} className="px-3 py-1 bg-primary text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
