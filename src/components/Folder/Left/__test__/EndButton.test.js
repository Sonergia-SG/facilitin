import React from 'react';
import { shallow } from 'enzyme';

import { EndButtonComponent as EndButton } from '../EndButton';

describe('EndButton', () => {
  it('not render EndButton if dossierprimefile is missing', () => {
    const data = {};
    const wrapper = shallow(<EndButton data={data} locked={false} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render EndButton if one dpfile is rejected', () => {
    const data = {
      dossierprimefile: [
        {
          statut: 10,
        },
        {
          statut: 0,
        },
      ],
    };
    const wrapper = shallow(<EndButton data={data} locked={false} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render EndButton if all dpfile is validated', () => {
    const data = {
      dossierprimefile: [
        {
          statut: 15,
        },
        {
          statut: 15,
        },
      ],
    };
    const wrapper = shallow(<EndButton data={data} locked={false} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('not render EndButton if one dpfile is validated', () => {
    const data = {
      dossierprimefile: [
        {
          statut: 15,
        },
        {
          statut: 0,
        },
      ],
    };
    const wrapper = shallow(<EndButton data={data} locked={false} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render EndButton enabled if operation status has code "0"', () => {
    const data = {
      statut: {
        code_statut: 0,
      },
      dossierprimefile: [
        {
          statut: 10,
        },
        {
          statut: 0,
        },
      ],
    };
    const wrapper = shallow(<EndButton data={data} locked={false} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render EndButton disabled if operation status has code "15"', () => {
    const data = {
      statut: {
        code_statut: 15,
      },
      dossierprimefile: [
        {
          statut: 10,
        },
        {
          statut: 0,
        },
      ],
    };
    const wrapper = shallow(<EndButton data={data} locked={false} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render EndButton disabled if operation status missing "code_statut"', () => {
    const data = {
      statut: {},
      dossierprimefile: [
        {
          statut: 10,
        },
        {
          statut: 0,
        },
      ],
    };
    const wrapper = shallow(<EndButton data={data} locked={false} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render EndButton loading for pending endingLoading "true"', () => {
    const data = {
      dossierprimefile: [
        {
          statut: 10,
        },
        {
          statut: 0,
        },
      ],
    };
    const wrapper = shallow(
      <EndButton
        data={data}
        pending={{
          endingLoading: true,
        }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render EndButton not loading for pending endingLoading "false"', () => {
    const data = {
      dossierprimefile: [
        {
          statut: 10,
        },
        {
          statut: 0,
        },
      ],
    };
    const wrapper = shallow(
      <EndButton
        data={data}
        locked={false}
        pending={{
          endingLoading: false,
        }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render EndButton locked', () => {
    const data = {
      dossierprimefile: [
        {
          statut: 15,
        },
        {
          statut: 15,
        },
      ],
    };
    const wrapper = shallow(<EndButton data={data} locked />);

    expect(wrapper).toMatchSnapshot();
  });
});
