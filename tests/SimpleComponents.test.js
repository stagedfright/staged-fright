import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import HelpHint from '../browser/react/components/HelpHint';
import HelpNote from '../browser/react/components/HelpNote';
import HowTo from '../browser/react/components/HowTo';

describe ('Simple Components:', () => {

	it ('HelpHint renders without issues', () => {
		expect(
			shallow(
				<HelpHint />
			).length
		).toEqual(1);
	});

	it ('HelpNote renders without issues', () => {
		expect(
			shallow(
				<HelpNote />
			).length
		).toEqual(1);
	});
	
	it ('HowTo renders without issues', () => {
		expect(
			shallow(
				<HowTo />
			).length
		).toEqual(1);
	});

});