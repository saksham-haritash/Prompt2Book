
import { useState } from 'react';
import styles from '../styles/PromptInput.module.css';

interface PromptInputProps {
  onGenerate: (prompt: string, genre: string, length: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('fantasy');
  const [selectedLength, setSelectedLength] = useState('novella');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt.trim(), selectedGenre, selectedLength);
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
          
          <div className={styles.optionsGrid}>
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Genre</label>
              <div className={styles.genreGrid}>
                {[
                  { id: 'fantasy', name: 'Fantasy', emoji: '🧙‍♂️', desc: 'Magic & adventure' },
                  { id: 'scifi', name: 'Sci-Fi', emoji: '🚀', desc: 'Future & technology' },
                  { id: 'mystery', name: 'Mystery', emoji: '🔍', desc: 'Puzzles & intrigue' },
                  { id: 'romance', name: 'Romance', emoji: '💕', desc: 'Love & relationships' },
                  { id: 'thriller', name: 'Thriller', emoji: '⚡', desc: 'Suspense & action' },
                  { id: 'horror', name: 'Horror', emoji: '👻', desc: 'Fear & supernatural' }
                ].map((genre) => (
                  <button
                    key={genre.id}
                    type="button"
                    className={`${styles.genreButton} ${selectedGenre === genre.id ? styles.selected : ''}`}
                    onClick={() => setSelectedGenre(genre.id)}
                  >
                    <span className={styles.genreEmoji}>{genre.emoji}</span>
                    <div className={styles.genreInfo}>
                      <span className={styles.genreName}>{genre.name}</span>
                      <span className={styles.genreDesc}>{genre.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Book Length</label>
              <div className={styles.lengthOptions}>
                {[
                  { id: 'short', name: 'Short Story', chapters: '3-4', time: '~15 min read' },
                  { id: 'novella', name: 'Novella', chapters: '6-8', time: '~45 min read' },
                  { id: 'novel', name: 'Full Novel', chapters: '10-15', time: '~2 hour read' }
                ].map((length) => (
                  <button
                    key={length.id}
                    type="button"
                    className={`${styles.lengthButton} ${selectedLength === length.id ? styles.selected : ''}`}
                    onClick={() => setSelectedLength(length.id)}
                  >
                    <div className={styles.lengthInfo}>
                      <span className={styles.lengthName}>{length.name}</span>
                      <span className={styles.lengthDetails}>
                        {length.chapters} chapters • {length.time}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
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
