import React from "react";
import Button from './buttons';

const FormSection = ({ handleOnSubmit, handleInputSwitch, showInput, validationErrorMessage }) => {
  if (!showInput) return null;

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" />
      </div>
      <div>
        <label htmlFor="genre">Genre:</label>
        <input type="text" name="genre" />
      </div>
      <Button type="button" handleOnClick={handleInputSwitch} label="X"/>
      <Button type="submit" label="Submit"/>
  {!validationErrorMessage ? null : <p>{validationErrorMessage}</p> }
    </form>
  );
};

export default FormSection;
