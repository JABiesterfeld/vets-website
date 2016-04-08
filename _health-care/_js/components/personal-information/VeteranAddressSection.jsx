import React from 'react';
import { connect } from 'react-redux';

import Address from '../questions/Address';
import Email from '../questions/Email';
import ErrorableCheckbox from '../form-elements/ErrorableCheckbox';
import ErrorableTextInput from '../form-elements/ErrorableTextInput';
import Phone from '../questions/Phone';
import { veteranUpdateField } from '../../actions';

/**
 * Props:
 * `sectionComplete` - Boolean. Marks the section as completed. Provides styles for completed sections.
 * `reviewSection` - Boolean. Hides components that are only needed for ReviewAndSubmitSection.
 */
class VeteranAddressSection extends React.Component {
  constructor() {
    super();
    this.confirmEmail = this.confirmEmail.bind(this);
  }

  confirmEmail() {
    if (this.props.data.email.value !== this.props.data.emailConfirmation.value) {
      return 'Please ensure your entries match';
    }

    return undefined;
  }

  render() {
    return (
      <fieldset >
        <div className={`input-section ${this.props.data.sectionComplete ? 'review-view' : 'edit-view'}`}>
          <h4>Permanent Address</h4>
          <ErrorableCheckbox
              label={`${this.props.data.sectionComplete ? 'Edit' : 'Update'}`}
              checked={this.props.data.sectionComplete}
              className={`edit-checkbox ${this.props.reviewSection ? '' : 'hidden'}`}
              onValueChange={(update) => {this.props.onStateChange('sectionComplete', update);}}/>

          <p>For locations outside the U.S., enter "City,Country" in the City field
            (e.g., "Paris,France"), and select Foreign Country for State.
          </p>

          <Address value={this.props.data.address}
              onUserInput={(update) => {this.props.onStateChange('address', update);}}/>

          <ErrorableTextInput label="County"
              field={this.props.data.county}
              onValueChange={(update) => {this.props.onStateChange('county', update);}}/>

          <Email label="Email address"
              email={this.props.data.email}
              onValueChange={(update) => {this.props.onStateChange('email', update);}}/>

          <Email error={this.confirmEmail()}
              label="Re-enter Email address"
              email={this.props.data.emailConfirmation}
              onValueChange={(update) => {this.props.onStateChange('emailConfirmation', update);}}/>

          <Phone required
              label="Home telephone number"
              value={this.props.data.homePhone}
              onValueChange={(update) => {this.props.onStateChange('homePhone', update);}}/>

          <Phone required
              label="Mobile telephone number"
              value={this.props.data.mobilePhone}
              onValueChange={(update) => {this.props.onStateChange('mobilePhone', update);}}/>
        </div>
      </fieldset>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.veteranAddress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStateChange: (field, update) => {
      dispatch(veteranUpdateField(['veteranAddress', field], update));
    }
  };
}

// TODO(awong): Remove the pure: false once we start using ImmutableJS.
export default connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(VeteranAddressSection);
export { VeteranAddressSection };
