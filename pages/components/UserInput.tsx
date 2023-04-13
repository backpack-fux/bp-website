// src/components/UserInput.tsx
import React from 'react';

interface UserInputProps {
  input: string;
  setInput: (value: string) => void;
  onSendMessage: () => void;
}

const UserInput: React.FC<UserInputProps> = ({ input, setInput, onSendMessage }) => {
  return (
    <div className="input-area">
      <input
        className="message-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="send-button" onClick={onSendMessage}>
        Send
      </button>
    </div>
  );
};

export default UserInput;
