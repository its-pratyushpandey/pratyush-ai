import styles from './style.module.scss';

export default function index() {
  return (
    <div className={styles.footer}>
        <a href="https://github.com/its-pratyushpandey" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/pratyush-pandey1/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://peerlist.io/pratyushmeai" target="_blank" rel="noopener noreferrer">Peerlist</a>
        <a href="mailto:pratyush.me.ai@gmail.com">Email</a>
    </div>
  )
}
