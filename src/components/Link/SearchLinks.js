import React from 'react';

import { FirebaseContext } from '../../firebase/context';
import { LinkItem } from '../Link/LinkItem';

function SearchLinks() {
  const { firebase } = React.useContext(FirebaseContext);
  const [filter, setFilter] = React.useState('');
  const [filteredLinks, setFilteredLinks] = React.useState([]);
  const [links, setLinks] = React.useState([]);

  React.useEffect(() => {
    getInitialLinks();
  }, []);

  async function getInitialLinks() {
    const snapshot = await firebase.db.collection('links').get();
    const links = snapshot.docs.map((document) => {
      return { id: document.id, ...document.data() };
    });

    setLinks(links);
  }

  function handleSearch(event) {
    event.preventDefault();

    const query = filter.toLowerCase();
    const matchedLinks = links.filter((link) => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });

    setFilteredLinks(matchedLinks);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          Search <input onChange={(event) => setFilter(event.target.value)} />
          <button>OK</button>
        </div>
      </form>
      {filteredLinks.map((filteredLink, index) => (
        <LinkItem key={filteredLink.id} showCount={false} link={filteredLink} index={index} />
      ))}
    </div>
  );
}

export { SearchLinks };
