// pages/components/UserInput.tsx
import React from 'react';
import './UserInput.css';

interface UserInputProps {
  input: string;
  setInput: (input: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ input, setInput, onSendMessage, isLoading }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="user-input">
      <input type="text" value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} />
      <button onClick={onSendMessage} disabled={isLoading || input.trim() === ''}>
        Send
      </button>
    </div>
  );
};

export default UserInput;
