import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import moment from "moment";

const initialFValues = {
  date: new Date(),
  address: "",
  vehicleNumber: "",
  price: "",
  name: "",
  contactNumber: "",
  vehicleType: "",
};

export default function VehicleForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("date" in fieldValues)
      temp.date = fieldValues.date ? "" : "Date field is required.";
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "Name field is required.";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Address field is required.";
    if ("vehicalNumber" in fieldValues)
      temp.vehicleNumber = fieldValues.vehicleNumber
        ? ""
        : "Vehical Number field is required.";
    if ("price" in fieldValues)
      temp.price = fieldValues.price ? "" : "Trip Price field is required.";
    if ("vehicleType" in fieldValues)
      temp.vehicleType = fieldValues.price
        ? ""
        : "Vehicle Type Price field is required.";
    // if ("contactNumber" in fieldValues)
    //   temp.contactNumber = fieldValues.contactNumber
    //     ? ""
    //     : "Contact Number Price field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x == "");
  };

  var { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      values.date = moment(values.date).format("YYYY/MM/DD");
      values.price = parseInt(values.price);
      addOrEdit(values, resetForm);
    }
  };

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
          <Controls.DatePicker
            name="date"
            label="Date"
            value={values.date}
            onChange={handleInputChange}
            error={errors.date}
          />
          <Controls.Input
            label="Name"
            name="name"
            type="string"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Input
            label="Address"
            name="address"
            type="string"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
          />
          <Controls.Input
            label="Vehicle Type"
            name="vehicleType"
            type="string"
            value={values.vehicleType}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Vehicle Number"
            name="vehicleNumber"
            type="string"
            value={values.vehicleNumber}
            onChange={handleInputChange}
            error={errors.vehicleNumber}
          />
          <Controls.Input
            label="Trip Price"
            name="price"
            type="number"
            value={values.price}
            onChange={handleInputChange}
            error={errors.price}
          />
          <Controls.Input
            label="Contact Number"
            name="contactNumber"
            type="number"
            value={values.contactNumber}
            onChange={handleInputChange}
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
