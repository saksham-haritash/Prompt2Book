
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

  const handleGenerateBook = async (prompt: string) => {
    setCurrentView('generating');
    
    // Simulate book generation (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockBook: Book = {
      title: "The Lost Time Traveler",
      chapters: [
        {
          title: "Chapter 1: The Temporal Rift",
          content: "In the depths of a forgotten laboratory, Dr. Elena Vasquez discovered something that would change everything. The machine hummed with an otherworldly energy, its crystalline core pulsing with colors that shouldn't exist. As she approached the device, reality itself seemed to waver around her, like heat waves rising from summer pavement. The air crackled with potential, and Elena felt the weight of infinite possibilities pressing against her consciousness. This was it—the breakthrough she had spent decades pursuing. But as her fingers hovered over the activation sequence, she couldn't shake the feeling that some doors, once opened, could never be closed again."
        },
        {
          title: "Chapter 2: Displaced in Time",
          content: "The world that greeted Elena was not her own. The sky burned orange, painted with hues that belonged to no earthly sunset. Buildings twisted into impossible geometries, their surfaces flowing like liquid mercury yet solid to the touch. She clutched her temporal compass, its needle spinning wildly as if drunk on the chaotic energies that permeated this place. Every step forward felt like walking through thick honey, each movement requiring tremendous effort. The air itself seemed alive, whispering secrets in languages that predated human speech. Elena realized with growing horror that she wasn't just in another place—she was in another time, perhaps another reality entirely."
        },
        {
          title: "Chapter 3: The Paradox Unfolds",
          content: "Every step forward seemed to pull her deeper into the temporal maze. The echoes of her past decisions rippled through reality, creating new timelines with each breath. Elena watched in fascination and terror as alternate versions of herself flickered in and out of existence around her. Some were older, bearing scars from battles she had never fought. Others were younger, their eyes bright with hope she had long since lost. The paradox was consuming everything, unraveling the very fabric of causality. She began to understand that her presence here wasn't an accident—it was a necessity, a correction the universe was making to prevent something far worse."
        },
        {
          title: "Chapter 4: Finding the Way Home",
          content: "With determination forged in the crucible of impossible circumstances, Elena began to understand the true nature of time itself. It wasn't a river flowing in one direction, as she had always believed, but an ocean—vast, deep, and full of currents that could carry the unwary to strange shores. The key to returning home lay not in fighting the temporal storm, but in learning to navigate it. She closed her eyes and reached out with senses she didn't know she possessed, feeling for the thread of her own timeline among the countless strands of possibility. When she finally grasped it, the connection burned like fire, but she held on, knowing that this singular moment would determine not just her fate, but the fate of all realities."
        }
      ],
      wordCount: 15420,
      generationTime: 3.2
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
