import React from 'react';
import AppFooterComponent from './Footer.component';

class AppFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.activeTab,
      result: ''
    };
  }

  changeTab = tab => {
    this.setState({ activeTab: tab });
    const {
      navigation: { replace }
    } = this.props;
    replace(tab);
  };

  render() {
      const { activeTab } = this.state;
    return (
      <AppFooterComponent onChangeTab={this.changeTab} activeTab={activeTab} />
    );
  }
}
export default AppFooter;
