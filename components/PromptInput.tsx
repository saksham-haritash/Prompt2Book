
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
          
          <div className={styles.optionsContainer}>
            <div className={styles.optionSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>📚 Choose Your Genre</h3>
                <p className={styles.sectionSubtitle}>Select the style and mood for your story</p>
              </div>
              <div className={styles.genreGrid}>
                {[
                  { id: 'fantasy', name: 'Fantasy', emoji: '🧙‍♂️', desc: 'Magic & adventure', color: '#8B5CF6' },
                  { id: 'scifi', name: 'Sci-Fi', emoji: '🚀', desc: 'Future & technology', color: '#06B6D4' },
                  { id: 'mystery', name: 'Mystery', emoji: '🔍', desc: 'Puzzles & intrigue', color: '#F59E0B' },
                  { id: 'romance', name: 'Romance', emoji: '💕', desc: 'Love & relationships', color: '#EC4899' },
                  { id: 'thriller', name: 'Thriller', emoji: '⚡', desc: 'Suspense & action', color: '#EF4444' },
                  { id: 'horror', name: 'Horror', emoji: '👻', desc: 'Fear & supernatural', color: '#6B7280' }
                ].map((genre) => (
                  <button
                    key={genre.id}
                    type="button"
                    className={`${styles.genreCard} ${selectedGenre === genre.id ? styles.selected : ''}`}
                    onClick={() => setSelectedGenre(genre.id)}
                    style={{ '--genre-color': genre.color } as React.CSSProperties}
                  >
                    <div className={styles.genreHeader}>
                      <span className={styles.genreEmoji}>{genre.emoji}</span>
                      <div className={styles.genreSelector}>
                        <div className={styles.radioButton}></div>
                      </div>
                    </div>
                    <div className={styles.genreContent}>
                      <h4 className={styles.genreName}>{genre.name}</h4>
                      <p className={styles.genreDesc}>{genre.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className={styles.optionSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>📖 Book Length</h3>
                <p className={styles.sectionSubtitle}>How long should your story be?</p>
              </div>
              <div className={styles.lengthGrid}>
                {[
                  { 
                    id: 'short', 
                    name: 'Short Story', 
                    chapters: '3-4 chapters', 
                    time: '15 min read',
                    words: '~5,000 words',
                    icon: '📄',
                    color: '#10B981'
                  },
                  { 
                    id: 'novella', 
                    name: 'Novella', 
                    chapters: '6-8 chapters', 
                    time: '45 min read',
                    words: '~12,000 words',
                    icon: '📚',
                    color: '#3B82F6'
                  },
                  { 
                    id: 'novel', 
                    name: 'Full Novel', 
                    chapters: '10-15 chapters', 
                    time: '2 hour read',
                    words: '~25,000 words',
                    icon: '📖',
                    color: '#8B5CF6'
                  }
                ].map((length) => (
                  <button
                    key={length.id}
                    type="button"
                    className={`${styles.lengthCard} ${selectedLength === length.id ? styles.selected : ''}`}
                    onClick={() => setSelectedLength(length.id)}
                    style={{ '--length-color': length.color } as React.CSSProperties}
                  >
                    <div className={styles.lengthIcon}>{length.icon}</div>
                    <div className={styles.lengthContent}>
                      <h4 className={styles.lengthName}>{length.name}</h4>
                      <div className={styles.lengthStats}>
                        <span className={styles.lengthChapters}>{length.chapters}</span>
                        <span className={styles.lengthWords}>{length.words}</span>
                        <span className={styles.lengthTime}>{length.time}</span>
                      </div>
                    </div>
                    <div className={styles.lengthSelector}>
                      <div className={styles.radioButton}></div>
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
