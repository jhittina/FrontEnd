import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import moment from "moment";

const initialFValues = {
  name: "",
  brickType: "FourInch",
  poNumber: "",
  contactNumber: "",
};

export default function CustomerForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "Name field is required.";
    if ("brickType" in fieldValues)
      temp.brickType = fieldValues.brickType ? "" : "This field is required.";
    if ("poNumber" in fieldValues)
      temp.poNumber = fieldValues.poNumber
        ? ""
        : "Po Number field is required.";
    if ("contactNumber" in fieldValues)
      temp.contactNumber = fieldValues.contactNumber
        ? ""
        : "Conatct Number field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  var { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };
  const getCustomerBrickTypeCollection = () => [
    { id: "FourInch", title: "FourInch" },
    { id: "SixInch", title: "SixInch" },
    { id: "both", title: "Both" },
  ];

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Input
            label="Po Number"
            name="poNumber"
            type="string"
            value={values.poNumber}
            onChange={handleInputChange}
            error={errors.poNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="brickType"
            label="Brick Type"
            value={values.brickType}
            onChange={handleInputChange}
            options={getCustomerBrickTypeCollection()}
            error={errors.brickType}
          />
          <Controls.Input
            label="Conatct Number"
            name="contactNumber"
            type="string"
            value={values.contactNumber}
            onChange={handleInputChange}
            error={errors.contactNumber}
          />
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
