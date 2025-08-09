
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
  const [isThemeSwitching, setIsThemeSwitching] = useState(false);

  useEffect(() => {
    // Initialize dark mode from localStorage
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      const isDark = JSON.parse(savedTheme);
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const handleGenerateBook = async (prompt: string, genre: string, length: string) => {
    setCurrentView('generating');
    
    // Simulate book generation (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate different content based on selections
    const chapterCounts = { short: 4, novella: 7, novel: 12 };
    const chapterCount = chapterCounts[length as keyof typeof chapterCounts];
    
    const genreStyles = {
      fantasy: { title: "The Enchanted Realm", theme: "magic and mystical creatures" },
      scifi: { title: "Quantum Horizons", theme: "advanced technology and space exploration" },
      mystery: { title: "The Silent Witness", theme: "dark secrets and hidden clues" },
      romance: { title: "Hearts Entwined", theme: "passionate love and emotional connections" },
      thriller: { title: "Edge of Danger", theme: "high-stakes suspense and action" },
      horror: { title: "Shadows of Fear", theme: "supernatural terror and dark forces" }
    };
    
    const selectedGenreStyle = genreStyles[genre as keyof typeof genreStyles];
    
    const mockBook: Book = {
      title: selectedGenreStyle.title,
      chapters: Array.from({ length: chapterCount }, (_, i) => ({
        title: `Chapter ${i + 1}: ${['The Beginning', 'Rising Action', 'Complications', 'Climax', 'Resolution', 'New Mysteries', 'Deeper Secrets', 'The Revelation', 'Final Confrontation', 'Aftermath', 'New Dawn', 'Legacy'][i] || `Part ${i + 1}`}`,
        content: `This chapter explores ${selectedGenreStyle.theme} as the story unfolds. ${prompt} The narrative weaves through compelling scenes that capture the essence of ${genre} storytelling, building tension and character development that keeps readers engaged. Each paragraph flows naturally into the next, creating an immersive reading experience that brings the world to life. The characters face challenges that test their resolve, while the plot moves forward with purpose and meaning. Rich descriptions paint vivid scenes, while dialogue reveals personality and advances the story. This ${length} format allows for the perfect balance of depth and pacing, ensuring that every word serves the greater narrative purpose.`
      })),
      wordCount: chapterCount * 1200 + Math.floor(Math.random() * 500),
      generationTime: 2.8 + Math.random() * 1.5
    };
    
    setBook(mockBook);
    setCurrentView('preview');
  };

  const toggleDarkMode = () => {
    setIsThemeSwitching(true);
    
    // Add theme switching class for animation
    document.documentElement.classList.add('theme-switching');
    
    setTimeout(() => {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Remove animation classes
      setTimeout(() => {
        document.documentElement.classList.remove('theme-switching');
        setIsThemeSwitching(false);
      }, 600);
    }, 150);
  };

  return (
    <div className={`${styles.container} ${darkMode ? 'dark' : ''}`}>
      <Head>
        <title>Prompt2Book - From Prompt to Book. Instantly.</title>
        <meta name="description" content="Transform a single creative prompt into a fully formatted, downloadable eBook in seconds with AI-powered generation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={darkMode ? "#0f0f23" : "#ffffff"} />
        <meta property="og:title" content="Prompt2Book - AI-Powered eBook Generation" />
        <meta property="og:description" content="Transform any creative prompt into a complete eBook instantly" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Prompt2Book" />
        <meta name="twitter:description" content="From Prompt to Book. Instantly." />
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
              Write a single creative idea and watch it transform into a beautifully formatted, downloadable eBook powered by cutting-edge AI.
            </p>
          </div>
          
          <PromptInput onGenerate={handleGenerateBook} />
          
          <div className={styles.backgroundGradient}></div>
          <div className={styles.sparkles}>
            <div className={styles.sparkle}></div>
            <div className={styles.sparkle}></div>
            <div className={styles.sparkle}></div>
            <div className={styles.sparkle}></div>
            <div className={styles.sparkle}></div>
          </div>
        </main>
      )}

      {currentView === 'generating' && (
        <GenerationScreen />
      )}

      {currentView === 'preview' && book && (
        <BookPreview book={book} onBackToLanding={() => setCurrentView('landing')} />
      )}

      {currentView === 'landing' && <Footer />}

      {/* Theme transition overlay */}
      <div className={`theme-transition ${isThemeSwitching ? 'active' : ''}`}></div>
    </div>
  );
};

export default Home;
