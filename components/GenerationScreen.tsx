
import { useEffect, useState } from 'react';
import styles from '../styles/GenerationScreen.module.css';

const GenerationScreen = () => {
  const [currentStatus, setCurrentStatus] = useState(0);
  
  const statuses = [
    'Analyzing your prompt...',
    'Crafting your chapters...',
    'Weaving the narrative...',
    'Polishing the prose...',
    'Almost ready!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus((prev) => (prev + 1) % statuses.length);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.spinner}>
          <div className={styles.spinnerInner}></div>
        </div>
        
        <h2 className={styles.title}>Creating Your Book</h2>
        <p className={styles.status}>{statuses[currentStatus]}</p>
        
        <div className={styles.progress}>
          <div className={styles.progressBar}></div>
        </div>
      </div>
      
      <div className={styles.backgroundPattern}></div>
    </div>
  );
};

export default GenerationScreen;
