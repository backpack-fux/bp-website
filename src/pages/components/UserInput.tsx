// pages/components/UserInput.tsx
import React from 'react';
import styles from './UserInput.module.css';

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className={styles.userInput}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
      <button onClick={onSendMessage} disabled={isLoading || input.trim() === ''} className={styles.sendButton}>
        Send
      </button>
    </div>
  );
};

export default UserInput;
