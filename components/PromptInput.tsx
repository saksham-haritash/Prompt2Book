
import { useState } from 'react';
import styles from '../styles/PromptInput.module.css';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputSection}>
          <h2 className={styles.title}>What story would you like to create?</h2>
          <div className={`${styles.inputWrapper} ${isFocused ? styles.focused : ''}`}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your story idea... e.g., A fantasy tale about a lost time traveler discovering ancient magic"
              className={styles.input}
              rows={4}
            />
            <div className={styles.inputDecorator}></div>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={!prompt.trim()}
          className={styles.generateButton}
        >
          <div className={styles.buttonContent}>
            <span className={styles.buttonIcon}>✨</span>
            <span>Generate Your Book</span>
            <span className={styles.shortcut}>⌘ Enter</span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default PromptInput;
