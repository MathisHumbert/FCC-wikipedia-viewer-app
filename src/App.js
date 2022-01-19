import axios from 'axios';
import { useState } from 'react';

let url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=';

// 'https://en.wikipedia.org/wiki/Special:Random'

function App() {
  const [loading, setLoading] = useState(false);
  const [wiki, setWiki] = useState('');
  const [articles, setArticles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!wiki) return;

    axios(`${url}${wiki}`)
      .then((response) => {
        const data = response.data.query.search;
        setArticles(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <main>
      <header>
        <h1>Free Code Camp</h1>
        <h1>Wikipedia Viewer</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={wiki}
          onChange={(e) => setWiki(e.target.value)}
        />
      </form>
      <article>
        {articles.map((item, index) => {
          console.log(item);
        })}
      </article>
    </main>
  );
}

export default App;
