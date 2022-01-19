import { useState } from 'react';

let url =
  'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
let cb = '&callback=JSON_CALLBACK';

// 'https://en.wikipedia.org/wiki/Special:Random'

function App() {
  const [wiki, setWiki] = useState('');
  const [articles, setArticles] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(wiki);
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
    </main>
  );
}

export default App;
