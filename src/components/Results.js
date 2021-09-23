import { sortByKey } from '../utils/helper';

const Results = ({ data, sortBy }) => {
  const isReverseSort = ['popularity'].includes(sortBy);
  return (
    <div>
      <div>{data?.total} Results found</div>
      <ul>
        {console.log('data: ', data)}
        {data?.items?.length > 0 &&
          sortByKey(data.items, sortBy, isReverseSort).map(
            ({
              id,
              name,
              track_number,
              popularity,
              preview_url,
              release_date,
              artists,
              album,
            }) => (
              <li key={id}>
                <img alt={name} loading='lazy' src={album.images[0].url} />
                <audio controls src={preview_url}>
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
                <dl>
                  <div>
                    <dt>Artist name</dt>
                    <dd>{artists[0].name}</dd>
                  </div>
                  <div>
                    <dt>Album Name</dt>
                    <dd>{name}</dd>
                  </div>
                  <div>
                    <dt>Release Date</dt>
                    <dd>{album.release_date}</dd>
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
  );
};

export default Results;
