import { useState } from 'react';

import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css'

import { Avatar } from './Avatar';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [isLiked, setIsLiked] = useState(false);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/wspietro.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Pietro Weg Sera</strong>
              <time title="11 de Maio às 8h13" dateTime="2022-05-11 08:13:08">Cerca de 1h atrás</time>
              {/* TODO: alterar horário do comentário */}
            </div>

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={() => setIsLiked(prevState => !prevState)}>
            <ThumbsUp />
            Aplaudir <span>{isLiked ? 1 : 0}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
