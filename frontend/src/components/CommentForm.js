import React from 'react'
import { Field, reduxForm } from 'redux-form'



const required = value => value ? undefined : 'Required'
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(5)
const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength2 = minLength(2)
const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Only alphanumeric characters'
        : undefined


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const CommentForm = props => {
    console.log(props)
    const { handleSubmit, onSubmit, pristine, reset, submitting } = props
    return (
        <div className="App">

            <form className="comment-form" onSubmit={handleSubmit(props.onSubmit)}>
                <div>

                    <Field
                        label="Author"
                        name="author"
                        component={renderField}
                        type="text"
                        placeholder="Author"
                        validate={[required, minValue18]}
                        warn={alphaNumeric}

                    />
                </div>
                <div>
                    <Field
                        label="body"
                        name="body"
                        component={renderField}
                        type="text"
                        placeholder="comment"
                        validate={[required, minValue18]}
                        warn={alphaNumeric}

                    />
                </div>

                <button className='btn btn-primary'type="submit" disabled={pristine || submitting}  > ADD </button>
            </form>



        </div >
    )
}

export default reduxForm({
    form: 'commentForm' 
})(CommentForm)