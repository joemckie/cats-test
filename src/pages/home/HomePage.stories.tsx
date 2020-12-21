import { Meta, Story } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HomePage } from './HomePage';

export default {
  title: 'Pages/Home',
  component: HomePage,
} as Meta;

const Template: Story = (args) => (
  <Router>
    <HomePage {...args} />
  </Router>
);

export const Primary = Template.bind({});
Primary.args = {};
