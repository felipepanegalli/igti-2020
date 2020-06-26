import React from 'react';
import Position from './Position';
import Picture from './Picture';
import Info from './Info';
import Votes from './Votes';
import Name from './Name';
import Percentage from './Percentage';
import Popularity from './Popularity';

export default function Candidate({
  candidate,
  position,
  previousVote,
  previousPercentage,
}) {
  const { id, name, votes, percentage, popularity } = candidate;
  const { flexRowStyle } = styles;
  return (
    <div className="col s12">
      <div className="card">
        <div className="card-content" style={flexRowStyle}>
          <Position>{position}</Position>
          <Picture
            imagesSource={'/assets/img/' + id + '.jpg'}
            description={name}
          />
          <Info>
            <Name>{name}</Name>
            <Votes value={votes} previous={previousVote} />
            <Percentage
              value={percentage}
              previous={previousPercentage}
            ></Percentage>
            <Popularity value={popularity} />
          </Info>
        </div>
      </div>
    </div>
  );
}

const styles = {
  flexRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};
