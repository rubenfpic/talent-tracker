import { mapReqresUserToCandidate, ReqresUser } from './candidate-remote.mapper';

describe('mapReqresUserToCandidate', () => {
  it('maps basic fields', () => {
    // Arrange
    const user: ReqresUser = {
      id: 7,
      email: 'ada@example.com',
      first_name: 'Ada',
      last_name: 'Lovelace',
      avatar: 'https://example.com/avatar.png'
    };
    // Act
    const candidate = mapReqresUserToCandidate(user);
    // Assert
    expect(candidate.id).toBe(user.id);
    expect(candidate.email).toBe(user.email);
    expect(candidate.name).toBe(`${user.first_name} ${user.last_name}`);
    expect(candidate.avatar).toBe(user.avatar);
  });
});
