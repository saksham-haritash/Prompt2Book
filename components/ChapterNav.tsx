
import styles from '../styles/ChapterNav.module.css';

interface Chapter {
  title: string;
  content: string;
}

interface ChapterNavProps {
  chapters: Chapter[];
  currentChapter: number;
  onChapterSelect: (index: number) => void;
}

const ChapterNav: React.FC<ChapterNavProps> = ({ 
  chapters, 
  currentChapter, 
  onChapterSelect 
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Table of Contents</h3>
      <nav className={styles.nav}>
        {chapters.map((chapter, index) => (
          <button
            key={index}
            onClick={() => onChapterSelect(index)}
            className={`${styles.chapterButton} ${
              index === currentChapter ? styles.active : ''
            }`}
          >
            <span className={styles.chapterNumber}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={styles.chapterTitle}>
              {chapter.title.replace(/^Chapter \d+:\s*/, '')}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ChapterNav;
