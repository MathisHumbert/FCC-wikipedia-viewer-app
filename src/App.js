import axios from 'axios';
import { useState } from 'react';

let url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=';

// 'https://en.wikipedia.org/wiki/Special:Random'

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [wiki, setWiki] = useState('');
  const [articles, setArticles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    if (!wiki) {
      setLoading(false);
    }

    axios(`${url}${wiki}`)
      .then((response) => {
        const data = response.data.query.search;
        if (data.length === 0) {
          setLoading(false);
          setError(true);
          return;
        }
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  };

  return (
    <main>
      <header>
        <h1>Free Code Camp</h1>
        <h1>Wikipedia Viewer</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <a
          href='https://en.wikipedia.org/wiki/Special:Random'
          target='_blank'
          rel='noreferrer'
        >
          <button type='button'>random article</button>
        </a>
        <input
          type='text'
          value={wiki}
          onChange={(e) => setWiki(e.target.value)}
          placeholder='Search in Wikipedia'
        />
      </form>
      <section>
        {error ? (
          <h1 className='fallback'>There was an error, try again</h1>
        ) : loading ? (
          <h1 className='fallback'>Loading ...</h1>
        ) : (
          <div className='articles-container'>
            {articles.map((item) => {
              let { snippet, title, pageid, size, wordcount, timestamp } = item;
              timestamp = timestamp.split('T')[0];
              size = (size / 1000).toFixed(0);
              const url = `https://en.wikipedia.org/?curid=${pageid}`;

              return (
                <article key={pageid}>
                  <h3 className='article-title'>
                    <a href={url} target='_blank' rel='noreferrer'>
                      {title}
                    </a>
                  </h3>
                  <p
                    className='article-content'
                    dangerouslySetInnerHTML={{ __html: snippet }}
                  ></p>
                  <span className='article-footer'>
                    {size}Kio ({wordcount} words) - {timestamp}
                  </span>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
