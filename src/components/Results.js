import React from 'react';
import { sortByKey } from '../utils/helper';

const Results = React.forwardRef(
  ({ data, sortBy, isLoading, fifthLastItem }, observer) => {
    const isReverseSort = ['popularity', 'release_date'].includes(sortBy);

    //   const observer = useRef();
    //   const fifthLastItem = useCallback(
    //     (node) => {
    //       if (isLoading) return;
    //       if (observer.current) observer.current.disconnect();
    //       observer.current = new IntersectionObserver((entries) => {
    //         if (entries[0].isIntersecting && hasNext) {
    //           setHasNext((prev) => prev + 20);
    //         }
    //       });
    //       if (node) observer.current.observe(node);
    //     },
    //     [isLoading, hasNext]
    //   );

    return (
      <>
        {data.error && (
          <p className='error'>
            It looks like there was a {data.error?.status || ''} network
            error... since: "{data.error.message}"
          </p>
        )}
        {isLoading && <div className='loading'>Loading...</div>}
        {data?.items?.length > 0 && (
          <div>
            <div className='albums-count'>{data.total} Results found</div>
            <ul className='albums'>
              {console.log('data: ', data)}
              {console.log(
                'sorted data: ',
                sortByKey(data.items, sortBy, isReverseSort)
              )}

              {sortByKey(data.items, sortBy, isReverseSort).map(
                (
                  {
                    id,
                    name,
                    track_number,
                    popularity,
                    preview_url,
                    release_date,
                    artist_name,
                    album_img,
                  },
                  i
                ) => (
                  <li
                    className='album'
                    key={id}
                    {...(data.items.length === i + 4
                      ? { ref: fifthLastItem }
                      : {})}
                  >
                    <img
                      className='album__img'
                      alt={name}
                      loading='lazy'
                      src={album_img}
                    />
                    <audio className='album__audio' controls src={preview_url}>
                      Your browser does not support the
                      <code>audio</code> element.
                    </audio>
                    <dl className='album__content'>
                      <div>
                        <dt>Artist name</dt>
                        <dd>{artist_name}</dd>
                      </div>
                      <div>
                        <dt>Album Name</dt>
                        <dd>{name}</dd>
                        <dd className='album__track'>track #{track_number}</dd>
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
          </div>
        )}
      </>
    );
  }
);

export default Results;
