import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { getDomain } from '../../utils';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { FirebaseContext } from '../../firebase';

function LinkItemComponent({ showCount, link, index, history }) {
  const { firebase, user } = React.useContext(FirebaseContext);

  async function handleVote() {
    if (!user) {
      history.push('/login');
    } else {
      const voteRef = firebase.db.collection('links').doc(link.id);
      const vote = await voteRef.get();

      if (vote.exists) {
        const previousVotes = vote.data().votes;
        const newVote = { votedBy: { id: user.uid, name: user.displayName } };
        const updatedVote = [...previousVotes, newVote];

        voteRef.update({ votes: updatedVote });
      }
    }
  }

  async function handleDeleteLink() {
    const linkRef = firebase.db.collection('links').doc(link.id);

    await linkRef.delete();
  }

  const postedByAuthUser = user && user.uid === link.postedBy.id;

  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button" onClick={handleVote}>
          VOTE
        </div>
      </div>
      <div className="ml1">
        <div>
          {link.description} <span className="link">({getDomain(link.url)})</span>
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes by {link.postedBy.name} {distanceInWordsToNow(link.created)}
          {' | '}
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0 ? `${link.comments.length} comments` : 'discuss'}
          </Link>
          {postedByAuthUser && (
            <>
              {' | '}
              <span className="delete-button" onClick={handleDeleteLink}>
                delete
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const LinkItem = withRouter(LinkItemComponent);

export { LinkItem };
