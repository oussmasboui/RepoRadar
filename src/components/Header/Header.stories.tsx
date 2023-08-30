import { StoryObj, Meta } from '@storybook/react';
import Header from './Header';

const meta : Meta<typeof Header>= {
  title: 'Header',
  component: Header,
 
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
    task: {
      state: 'SearchForm',
    },
  },
};

