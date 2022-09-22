import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import moment from 'moment';

const initialFValues = {
    date: new Date(),
    quantity: 0,
}

export default function ProductionForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('date' in fieldValues)
            temp.date = fieldValues.date ? "" : "This field is required."
        if ('brickType' in fieldValues)
            temp.brickType = fieldValues.brickType ? "" : "This field is required."
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity ? "" : "This field is required."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            values.quantity = parseInt(values.quantity)
            values.date = moment(values.date).format('YYYY/MM/DD');
            addOrEdit(values, resetForm);
        }
    }
    const getProductionBrickTypeCollection = () => ([
        { id: '4 Inch Brick', title: '4 Inch Brick' },
        { id: '6 Inch Brick', title: '6 Inch Brick' },
    ])


    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.DatePicker
                        name="date"
                        label="Date"
                        value={values.date}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={values.quantity}
                        onChange={handleInputChange}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="type"
                        label="Brick Type"
                        value={values.type}
                        onChange={handleInputChange}
                        options={getProductionBrickTypeCollection()}
                        error={errors.type}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
