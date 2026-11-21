import { render } from '@testing-library/react-native';

import { PlaceholderScreen } from './placeholder-screen';

describe('PlaceholderScreen', () => {
  it('renders the title and description', async () => {
    const { getByText } = await render(
      <PlaceholderScreen title="Tasks" description="Coming soon" />
    );

    expect(getByText('Tasks')).toBeTruthy();
    expect(getByText('Coming soon')).toBeTruthy();
  });
});
