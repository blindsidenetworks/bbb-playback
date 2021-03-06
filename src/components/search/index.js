import React, { PureComponent } from 'react';
import Button from 'components/utils/button';
import Modal from 'components/utils/modal';
import { search } from 'utils/data';
import './index.scss';

const MIN_LENGTH = 3;
const MAX_LENGTH = 32;

export default class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      result: 0,
    };

    this.search = [];
  }

  handleOnChange(event) {
    if (!event || !event.target) return null;

    const { value } = event.target;
    if (value) {
      const disabled = value.length < MIN_LENGTH;
      if (!disabled) {
        const { data } = this.props;
        this.search = search(value, data);

        if (this.state.result !== this.search.length) {
          this.setState({ result: this.search.length });
        }
      } else {
        if (this.state.result !== 0) {
          this.setState({ result: 0 });
        }
      }

      if (this.state.disabled !== disabled) {
        this.setState({ disabled });
      }
    }
  }

  handleOnClick(event) {
    const {
      toggleModal,
      video,
    } = this.props;

    video.marker().add(this.search);
    toggleModal();
  }

  renderBody() {
    const { disabled } = this.state;

    return (
      <div className="search-body">
        <input
          maxLength={MAX_LENGTH}
          minLength={MIN_LENGTH}
          onChange={(event) => this.handleOnChange(event)}
          type="text"
        />
        <Button
          disabled={disabled}
          handleOnClick={(event) => this.handleOnClick(event)}
          icon="promote"
          type="solid"
        />
      </div>
    );
  }

  renderFooter() {
    const { result } = this.state;

    return (
      <div className="search-footer">
        <div className="result">
          {result}
        </div>
      </div>
    );
  }

  render() {
    const { toggleModal } = this.props;

    return (
      <Modal onClose={toggleModal}>
        {this.renderBody()}
        {this.renderFooter()}
      </Modal>
    );
  }
}
