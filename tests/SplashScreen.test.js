import React from 'react';
import chai, { expect } from 'chai';                                     
chai.use(require('chai-enzyme')());
import { shallow, mount, spyLifecycle } from 'enzyme';
import { spy } from 'sinon';
chai.use(require('sinon-chai'));

import SplashScreen, { 
  OverlayText1, 
  OverlayText2, 
  toggleShowMe
} from '../browser/react/components/SplashScreen';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// necessary so child material-ui components can be rendered properly; 
// cf. https://github.com/callemall/material-ui/issues/5330
const mountWithContext = (node) => mount(node, {
  context: {
    muiTheme: getMuiTheme(),
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  }
});

describe('<OverlayText1 />', () => {

  let root;
  beforeEach('render the root', () => 
    root = shallow(<OverlayText1 />));

  it('renders without exploding', () =>
    expect(root).to.have.length.of(1));
});

describe('<OverlayText2 />', () => {
  const sessionKey = 'potato';

  let root;
  beforeEach('render the root', () => 
    root = shallow(<OverlayText2 sessionKey={sessionKey}/>));

  it('renders without exploding', () =>
    expect(root).to.have.length(1));

  it('creates a <Link> to route based on the sessionKey prop passed in', () => 
    expect(root.find('Link')).to.have.prop('to').eql(`/${sessionKey}/select`));

  it('has a button that proceeds to the next page', () =>
    expect(root.find('VRButton')).to.have.length(1));
});

describe('<SplashScreen/>', () => {

  describe('the component', () => {

    const params = {
      sessionKey: 'potato',
    };
    let wrapper;
    const spyCompWillMount = spy();
    const spyOnClick = spy();

    before('mount the component', () => 
      wrapper = mountWithContext(
        <SplashScreen params={params} onClick={spyOnClick} compWillMount={spyCompWillMount}/>
      )
    );

    it('renders without exploding', () => 
      expect(wrapper).to.have.length(1));

    it('calls componentWillMount', () => 
      expect(spyCompWillMount).to.have.been.called
    );

    it('renders a video element', () => {
      const videoElement = wrapper.find('video');
      expect(videoElement).to.have.length(1);
      expect(videoElement.find('source')).to.have.prop('src').eql('/assets/videos/openingvid.mp4');
    });

    describe('overlay div that changes based on the state', () => {

      it('renders OverlayText1 initially', () => 
        expect(wrapper.find(OverlayText1)).to.have.length(1));

      it("doesn't show OverlayText2 when state.showMe=false", () =>
        expect(wrapper.find(OverlayText2)).to.have.length(0));

      // ignore warning about passing a null/undefined state obj into setState; it's only coming up because we've passed in sinon.spy to props.onClick
      it('calls props.onClick when tapped', () => {
        wrapper.find('#overlay').simulate('click');
        expect(spyOnClick).to.have.been.called;
      });

      // ignore warning about unknown prop 'onTouchTap' on <button> tag; it's because we're missing injectTapEventPlugin here 
      it('renders OverlayText2 when state.showMe=true', () => {
        wrapper.setState({ showMe: true });
        expect(wrapper.find(OverlayText2)).to.have.length(1);
      });

      it("doesn't show OverlayText1 when state.showMe=true", () =>
        expect(wrapper.find(OverlayText1)).to.have.length(0));
    });

    describe('methods', () => {
      let newWrapper;

      before('mount the component with the correct props', () => {
        newWrapper = mountWithContext(
          <SplashScreen params={params} />
        )
      });

      xdescribe('appendVideoResizeScript (called in componentWillMount)', () => {
        // unsure how to write this test without bringing in jsdom-mocha or sth; perhaps best to leave until browser/integration testing phase

        it('appends a script element to the DOM', () => {
          const scriptElement = document.find('script');
          expect(scriptElement).to.have.length(1);
          expect(scriptElement).to.have.prop('src').eql('/scripts/video-resize.js');
        });
      });

      describe('toggleShowMe', () => {

        it('is a pure function that takes in a state and returns a state object with showMe set to true', () => {
          const myDummyState = { showMe: false };
          const newState = toggleShowMe(myDummyState);

          expect(newState).to.be.an('object');
          expect(newState).to.have.ownProperty('showMe', true);
        });

        it('sets state.showMe to true when overlay is tapped', () => {
          newWrapper.find('#overlay').simulate('click');
          expect(newWrapper.state().showMe).to.be.true;
        });
      });
    });
  });
});
