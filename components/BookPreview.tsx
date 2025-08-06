
import { useState } from 'react';
import styles from '../styles/BookPreview.module.css';
import ChapterNav from './ChapterNav';
import ActionBar from './ActionBar';
import { Book } from '../pages/index';

interface BookPreviewProps {
  book: Book;
  onBackToLanding: () => void;
}

const BookPreview: React.FC<BookPreviewProps> = ({ book, onBackToLanding }) => {
  const [currentChapter, setCurrentChapter] = useState(0);

  return (
    <div className={styles.container}>
      <ActionBar book={book} onBackToLanding={onBackToLanding} />
      
      <div className={styles.content}>
        <div className={styles.previewSection}>
          <div className={styles.bookCover}>
            <h1 className={styles.bookTitle}>{book.title}</h1>
            <p className={styles.bookMeta}>
              {book.chapters.length} Chapters • {book.wordCount.toLocaleString()} Words
            </p>
          </div>
          
          <div className={styles.chapterContent}>
            <h2 className={styles.chapterTitle}>
              {book.chapters[currentChapter]?.title}
            </h2>
            <div className={styles.chapterText}>
              {book.chapters[currentChapter]?.content}
            </div>
          </div>
        </div>
        
        <ChapterNav 
          chapters={book.chapters}
          currentChapter={currentChapter}
          onChapterSelect={setCurrentChapter}
        />
      </div>
    </div>
  );
};

export default BookPreview;
