
import { FC } from 'react';
import styles from '../styles/Footer.module.css';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.branding}>
            <h3 className={styles.brandName}>Prompt2Book</h3>
            <p className={styles.tagline}>Transform ideas into books instantly</p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#examples">Examples</a>
            </div>
            
            <div className={styles.linkGroup}>
              <h4>Support</h4>
              <a href="#help">Help Center</a>
              <a href="#contact">Contact</a>
              <a href="#docs">Documentation</a>
            </div>
            
            <div className={styles.linkGroup}>
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#blog">Blog</a>
              <a href="#careers">Careers</a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 Prompt2Book. All rights reserved.
          </p>
          <div className={styles.social}>
            <a href="#twitter" aria-label="Twitter">🐦</a>
            <a href="#github" aria-label="GitHub">⚡</a>
            <a href="#discord" aria-label="Discord">💬</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
