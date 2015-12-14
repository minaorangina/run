import { shallow } from 'enzyme';
import { AppContainer } from '../src/app-container.jsx';

const testAppContainer = () => {

    describe('<AppContainer />', () => {

        it('should render one div with className "bus"', () => {

            const wrapper = shallow(<AppContainer />);
            console.log(wrapper);
        });
    })
};

export { testAppContainer };
