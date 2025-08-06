
import { FC } from 'react';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentView: string;
  onBackToLanding?: () => void;
}

const Header: FC<HeaderProps> = ({ darkMode, onToggleDarkMode, currentView, onBackToLanding }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={onBackToLanding}>
          <span className={styles.logoText}>Prompt2Book</span>
          {currentView !== 'landing' && (
            <span className={styles.logoSubtext}>✨ AI-Powered</span>
          )}
        </div>
        
        <nav className={styles.nav}>
          <button 
            onClick={onToggleDarkMode}
            className={styles.themeToggle}
            aria-label="Toggle dark mode"
          >
            <span className={`${styles.toggleIcon} ${darkMode ? styles.dark : ''}`}>
              {darkMode ? '☀️' : '🌙'}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
