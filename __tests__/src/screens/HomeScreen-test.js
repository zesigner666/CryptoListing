import 'react-native';
import React from 'react';
import HomeScreen from '../../../src/screens/HomeScreen/HomeScreen';
import renderer from 'react-test-renderer';


describe('HomeScreen renders correctly', () => {

  it('renders correctly', async () => {
    renderer.create(<HomeScreen />);
  });

});