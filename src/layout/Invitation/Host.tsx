import styled from '@emotion/styled';
import data from 'data.json';
import { BrideAndGroom } from '@/types/data.ts';

const Host = () => {
  const { groom, bride } = data.greeting.host;
  return (
    <>
      <HostContainer>
        <HostInfo person={groom} />
        <HostInfo person={bride} />
      </HostContainer>
    </>
  );
};

export default Host;

const HostInfo = ({ person }: { person: BrideAndGroom }) => {
  return (
    <HostDetails>
      {person.parents && (
        <>
          {person.parents.map((parent, index) => (
            <ParentName key={index}>
              {index > 0 && '·'}
              {parent.name}
            </ParentName>
          ))}
        </>
      )}
      <RelationText>
        <div>의</div>
        <Relation>{person.relation}</Relation>
      </RelationText>
      <HighlightedName>{person.name}</HighlightedName>
    </HostDetails>
  );
};

const HighlightedName = styled.span`
  font-weight: 600;
  font-size: 17px;
  color: #4f4f4f;
  margin: 5px;
`;

const HostContainer = styled.div`
  gap: 8px;
  font-family: RIDIBatang, sans-serif;
`;

const ParentName = styled.span`
  font-size: 14px;
`;

const HostDetails = styled.div`
  padding: 0 55px;
  justify-content: center;
  white-space: nowrap;
  display: flex;
  text-align: center;
  align-items: center;

  color: #9d7e5f;
  font-size: 12px;
`;

const RelationText = styled.div`
  font-style: normal;
  line-height: 26px;
  display: flex;
  gap: 6px;
`;

const Relation = styled.div`
  width: inherit;
`;
