import { HelperService } from '../HelperService';

test('>>>HelperService.removeNull test', () => {
  // arrange
  const fullData = { data: 'some data' };
  const dataWithNull = { ...fullData, nullField: null };

  // act
  const result = HelperService.removeNull(dataWithNull);

  // assert
  expect(result).toEqual(fullData);
});
