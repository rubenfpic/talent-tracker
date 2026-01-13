import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  let pipe: InitialsPipe;
  beforeEach( () => {
    pipe = new InitialsPipe();
  });
  it('applies initials pipe to a name', () => {
    // ARRANGE
    const name = 'John Doe';
    // ACT
    const initials = pipe.transform(name);
    // ASSERT
    expect(initials).toBe('JD');
  });
  it('applies initials pipe to a name with spaces', () => {
    // ARRANGE
    const name = ' John Doe ';
    // ACT
    // const pipe = new InitialsPipe();
    const initials = pipe.transform(name);
    // ASSERT
    expect(initials).toBe('JD');
  });
});
