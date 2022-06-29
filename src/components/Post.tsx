import { FormEvent, useState } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, content, publishedAt }: PostProps) {
  const [textareaValue, setTextareaValue] = useState('');
  const [comments, setComments] = useState(['Post muito bacana, hein?!']);

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateComment(e: FormEvent) {
    e.preventDefault();

    setComments(prevState => [...prevState, textareaValue]);
    setTextareaValue('');
  }

  function deleteComment(comment: string) {
    setComments(prevState => prevState.filter(c => c !== comment));
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder='Deixe um comentário...'
          onChange={e => setTextareaValue(e.target.value)}
          value={textareaValue}
        />

        {textareaValue && <button type='submit'>Publicar</button>}

      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              onDeleteComment={deleteComment}
              key={comment}
              content={comment}
            />
          )
        })}
      </div>
    </article>
  );
};