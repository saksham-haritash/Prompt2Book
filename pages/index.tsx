
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PromptInput from '../components/PromptInput';
import GenerationScreen from '../components/GenerationScreen';
import BookPreview from '../components/BookPreview';
import Header from '../components/Header';
import Footer from '../components/Footer';

export interface Book {
  title: string;
  chapters: {
    title: string;
    content: string;
  }[];
  wordCount: number;
  generationTime: number;
}

const Home = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'generating' | 'preview'>('landing');
  const [book, setBook] = useState<Book | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize dark mode from localStorage
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      const isDark = JSON.parse(savedTheme);
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const handleGenerateBook = async (prompt: string) => {
    setCurrentView('generating');
    
    // Simulate book generation (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockBook: Book = {
      title: "The Lost Time Traveler",
      chapters: [
        {
          title: "Chapter 1: The Temporal Rift",
          content: "In the depths of a forgotten laboratory, Dr. Elena Vasquez discovered something that would change everything. The machine hummed with an otherworldly energy, its crystalline core pulsing with colors that shouldn't exist..."
        },
        {
          title: "Chapter 2: Displaced in Time",
          content: "The world that greeted Elena was not her own. The sky burned orange, and buildings twisted into impossible geometries. She clutched her temporal compass, its needle spinning wildly..."
        },
        {
          title: "Chapter 3: The Paradox Unfolds",
          content: "Every step forward seemed to pull her deeper into the temporal maze. The echoes of her past decisions rippled through reality, creating new timelines with each breath..."
        },
        {
          title: "Chapter 4: Finding the Way Home",
          content: "With determination forged in the crucible of impossible circumstances, Elena began to understand the true nature of time itself..."
        }
      ],
      wordCount: 15420,
      generationTime: 3.2
    };
    
    setBook(mockBook);
    setCurrentView('preview');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? 'dark' : ''}`}>
      <Head>
        <title>Prompt2Book - From Prompt to Book. Instantly.</title>
        <meta name="description" content="Transform a single creative prompt into a fully formatted, downloadable eBook in seconds" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header 
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        currentView={currentView}
        onBackToLanding={currentView !== 'landing' ? () => setCurrentView('landing') : undefined}
      />

      {currentView === 'landing' && (
        <main className={styles.landing}>
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>
              From Prompt to Book. <span className={styles.accent}>Instantly.</span>
            </h1>
            <p className={styles.heroSubtext}>
              Write a single idea and get a downloadable book powered by AI.
            </p>
          </div>
          
          <PromptInput onGenerate={handleGenerateBook} />
          
          <div className={styles.backgroundGradient}></div>
        </main>
      )}

      {currentView === 'generating' && (
        <GenerationScreen />
      )}

      {currentView === 'preview' && book && (
        <BookPreview book={book} onBackToLanding={() => setCurrentView('landing')} />
      )}

      {currentView === 'landing' && <Footer />}
    </div>
  );
};

export default Home;
