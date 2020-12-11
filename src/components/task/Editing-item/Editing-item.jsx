import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './editing-item.css';

export default class EditingItem extends Component {
  constructor(props) {
    super(props);
    const { label } = this.props;
    this.state = { stateLabel: label };
  }

  // state = {
  //   label: '',
  // }

    onChange = (event) => {
      this.setState({
        stateLabel: event.target.value,
      });
    }

    onSubmit = (event) => {
      event.preventDefault();
      const { stateLabel } = this.state;
      const { onEditForm, id } = this.props;
      if (stateLabel) {
        onEditForm(id, stateLabel);
      }
    }

    render() {
      const { edit, label } = this.props;
      if (edit) {
        return (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="edit"
              defaultValue={label}
              onChange={this.onChange}
            />
          </form>
        );
      }
      return null;
    }
}
EditingItem.defaultProps = {
  onEditForm: () => {},
};

EditingItem.propTypes = {
  onEditForm: PropTypes.func,
  label: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};
