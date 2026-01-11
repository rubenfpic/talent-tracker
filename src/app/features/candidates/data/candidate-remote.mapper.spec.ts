import { mapReqresUserToCandidate, ReqresUser } from './candidate-remote.mapper';

describe('mapReqresUserToCandidate', () => {
  it('maps basic fields', () => {
    // ARRANGE
    const user: ReqresUser = {
      id: 7,
      email: 'ada@example.com',
      first_name: 'Ada',
      last_name: 'Lovelace',
      avatar: 'https://example.com/avatar.png'
    };
    // ACT
    const candidate = mapReqresUserToCandidate(user);
    // ASSERT
    expect(candidate.id).toBe(user.id);
    expect(candidate.email).toBe(user.email);
    expect(candidate.name).toBe(`${user.first_name} ${user.last_name}`);
    expect(candidate.avatar).toBe(user.avatar);
  });
  it('sets locationKey to "remote" when location is Remote', () => {
    // ARRANGE
    const user: ReqresUser = {
      id: 3,
      email: 'pepe@example.com',
      first_name: 'Pepe',
      last_name: 'Lovelace',
      avatar: 'https://example.com/avatar.png'
    };
    // ACT
    const candidate = mapReqresUserToCandidate(user);
    // ASSERT
    expect(candidate.location).toBe('Remote');
    expect(candidate.locationKey).toBe('remote');
  });
  it('sets locationKey to undefined when location is not Remote', () => {
    // ARRANGE
    const user: ReqresUser = {
      id: 2,
      email: 'pepe@example.com',
      first_name: 'Pepe',
      last_name: 'Lovelace',
      avatar: 'https://example.com/avatar.png'
    };
    // ACT
    const candidate = mapReqresUserToCandidate(user);
    // ASSERT
    expect(candidate.locationKey).toBeUndefined();
  });
  it('maps title and location based on id', () => {
    // ARRANGE
    const user: ReqresUser = {
      id: 1,
      email: 'bob@example.com',
      first_name: 'Bob',
      last_name: 'Lovelace',
      avatar: 'https://example.com/avatar.png'
    };
    // ACT
    const candidate = mapReqresUserToCandidate(user);
    // ASSERT
    expect(candidate.title).toBe('Talent Partner');
    expect(candidate.location).toBe('Barcelona');
  });
});
