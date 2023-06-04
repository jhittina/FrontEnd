import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import moment from "moment";

const initialFValues = {
  price: "",
  address: "",
};

export default function CustomerAddressForm(props) {
  const { addOrEditAdress, recordForEdit, addressEvent } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("price" in fieldValues)
      temp.price = fieldValues.price ? "" : "Price field is required.";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Address field is required.";

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
      values.price = parseInt(values.price);
      addOrEditAdress(values, resetForm);
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
            name="address"
            label="Address"
            disabled={addressEvent === "update" ? true : false}
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Price"
            name="price"
            type="string"
            value={values.price}
            onChange={handleInputChange}
            error={errors.price}
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
