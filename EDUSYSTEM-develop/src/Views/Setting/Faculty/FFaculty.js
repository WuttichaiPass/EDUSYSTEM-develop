import React, { Component, Fragment } from "react";
import { Formik,ErrorMessage  } from 'formik';
import { SaveFaculty } from "../../../services/faculty.services";
import Swal from "sweetalert2";
class  FFaculty extends Component {

    async Save(data) {
        //console.log("data:" + JSON.stringify(data));
    //     const res = await SaveFaculty(data);
    //     if(res.statusCode === "003"){
    //         Swal.fire({
    //             icon:"success",
    //             title: "บันทึกสำเร็จแล้ว",
    //             showCancelButton: false,
    //             timer: 1500,
    //         });
    //     } else{
    //         Swal.fire({
    //             icon: "warning",
    //             title: "บันทึกสำเร็จแล้ว",
    //             showCancelButton: false,
    //             timer: 1500,
    //         });
    //     }
    }
    render() {
        return(
            <Fragment>
                <Formik
                initialValues={{ facultyName: '', facultyCode: '', isUsed: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.facultyName) {
                        errors.facultyName = 'จำเป็นต้องระบุข้อมูล';
                    } 
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    this.save(values);
                    setSubmitting(false);
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     setSubmitting(false);
                    // }, 400);
                }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <label>รหัสคณะ</label>
                            <input type="text" name="facultyCode"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.facultyCode}
                            />
                            <label>ชื่อคณะ</label>
                            <input type="text" name="facultyName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.facultyName}
                            />
                            <input type="text" name="isUsed"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.isUsed}
                            />

                            <ErrorMessage 
                            name="facultyName" 
                            component="div" 
                            style = {{color:"red"}}
                            />
                            <ErrorMessage 
                            name="facultyCode" 
                            component="div" 
                            style = {{color:"red"}}
                            />
                            {errors.facultyName && touched.facultyName}
                            <button type="submit" disabled={isSubmitting}>บันทึกข้อมูล</button>
                        </form>
                    )}
                </Formik>
            </Fragment>
        )
    }
}

export default FFaculty

