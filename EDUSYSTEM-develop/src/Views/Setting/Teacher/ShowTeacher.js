import React, { Fragment, useState, useEffect } from "react";
import { GetAllTeacher } from "../../../services/teacher.services";
import Pagination from "@material-ui/lab/Pagination";

export default function ShowTeacher() {
   const [data, setData] = useState([]);
   const [page, setPage] = useState({
     currentPage: 0,
     lastPage: 1,
     totaRow: 0,
   });
   const [pageNo, setPageNo] = useState(1);
   const [pageSize, setPageSize] = useState(10);

   useEffect(fetchData, [pageNo,pageSize]);

    async function fetchData() {
        const res = await GetAllTeacher(pageSize, pageNo,"Wuttichai");
        if (res.statusCode == "002") {
        let paginaton = res.pagin;
        if (paginaton.totaRow > 0) {
          setData(res.data);
          setPage({
          currentPage: paginaton.currentPage,
          lastPage: paginaton.totalPage,
          totaRow: paginaton.totaRow,
        });
      }
    }
    console.log("res:" + res);
  }

  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPageNo(newPage);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>ข้อมูลอาจารย์</h4>
            </div>
            <div className="card-body">
              {/** สำหรับแสดงรายการข้อมูล */}
              <div className="form-group row">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รหัสอาจารย์</th>
                      <th>ชื่ออาจารย์</th>
                      <th>คณะ</th>
                      <th>สาขาวิชา</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => (
                      <tr ker = {value.TeacherCode}>
                        <td>{(page.currentPage - 1) * pageSize + (index + 1)}</td>
                        <td>{value.TeacherCode}</td>
                        <td>{value.Name + " " + value.Lastname}</td>
                        <td>{value.FacultyName}</td>
                        <td>{value.MajorName}</td>
                        <td>
                          {" "}
                          <button className="btn btn-warning">
                            แก้ไข
                          </button>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between">
                <div>จำนวนทั้งหมด {page.totaRow} รายการ </div>
                <Pagination
                  count={parseInt(page.lastPage)}
                  page={pageNo}
                  color="primary"
                  size="small"
                  defaultPage={6}
                  siblingCount={1}
                  onChange = {handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}