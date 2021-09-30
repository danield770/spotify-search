import { sortByKey } from '../utils/helper';
import styles from './Results.module.css';

const Results = ({ data, sortBy, isLoading, onFetchMore }) => {
  const isReverseSort = ['popularity', 'release_date'].includes(sortBy);

  return (
    <div>
      <div className={`${styles['albums-count']} sticky`}>
        {data.total} Results found
      </div>
      <ul className={styles.albums}>
        {console.log('data: ', data)}

        {sortByKey(data.items, sortBy, isReverseSort).map(
          ({
            id,
            name,
            track_number,
            popularity,
            preview_url,
            release_date,
            artist_name,
            album_img,
          }) => (
            <li className={styles.album} key={id}>
              <img
                className={styles.album__img}
                alt={name}
                loading='lazy'
                src={album_img}
              />
              <audio className={styles.album__audio} controls src={preview_url}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
              <dl className={styles.album__content}>
                <div>
                  <dt>Artist name</dt>
                  <dd>{artist_name}</dd>
                </div>
                <div>
                  <dt>Album Name</dt>
                  <dd>{name}</dd>
                  <dd className={styles.album__track}>track #{track_number}</dd>
                </div>
                <div>
                  <dt>Release Date</dt>
                  <dd>{release_date}</dd>
                </div>
                <div>
                  <dt>Popularity</dt>
                  <dd>{popularity}</dd>
                </div>
              </dl>
            </li>
          )
        )}
      </ul>
      {data.next !== null && (
        <button
          className={`btn--primary ${isLoading ? 'loading' : ''}`}
          type='button'
          onClick={() => {
            onFetchMore(data.next);
          }}
        >
          {isLoading ? 'Loading...' : 'Load more albums'}
        </button>
      )}
    </div>
  );
};

export default Results;
