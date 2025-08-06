
import styles from '../styles/ActionBar.module.css';
import { Book } from '../pages/index';

interface ActionBarProps {
  book: Book;
  onBackToLanding: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ book, onBackToLanding }) => {
  const handleDownloadPDF = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('Your book content here'));
    element.setAttribute('download', `${book.title}.pdf`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyText = async () => {
    const fullText = book.chapters.map(chapter => 
      `${chapter.title}\n\n${chapter.content}\n\n`
    ).join('');
    
    try {
      await navigator.clipboard.writeText(fullText);
      alert('Book text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: 'Check out this AI-generated book!',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link: ', err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={onBackToLanding} className={styles.backButton}>
        ← New Book
      </button>
      
      <div className={styles.stats}>
        <span>{book.wordCount.toLocaleString()} words</span>
        <span>•</span>
        <span>{book.chapters.length} chapters</span>
        <span>•</span>
        <span>Generated in {book.generationTime}s</span>
      </div>
      
      <div className={styles.actions}>
        <button onClick={handleDownloadPDF} className={styles.actionButton}>
          <span>📄</span>
          Download PDF
        </button>
        
        <button onClick={handleCopyText} className={styles.actionButton}>
          <span>📋</span>
          Copy Text
        </button>
        
        <button onClick={handleShare} className={styles.actionButton}>
          <span>🔗</span>
          Share Link
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
