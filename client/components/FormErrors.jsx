import React from 'react';

import './FormErrors.less';

const FormErrors = React.createClass({
    getInitialState() {
        return {
            
        };
    },


    render() {
        return (
            <div className='formErrors'>
              {Object.keys(this.props.formErrors).map((fieldName, i) => {
                if(this.props.formErrors[fieldName].error.length > 0){
                  return (
                    <p key={i} className="formErrors__p"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> {this.props.formErrors[fieldName].title} {this.props.formErrors[fieldName].error}</p>
                  )        
                } else {
                  return '';
                }
              })}
            </div>
        );
    }
});

export default FormErrors;
