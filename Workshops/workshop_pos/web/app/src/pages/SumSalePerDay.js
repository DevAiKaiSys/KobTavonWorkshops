import React, { useState } from 'react';
import Template from '../components/Template';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../config';

function SumSalePerDay() {
  const [currentYear, setCurrentYear] = useState(0);
  const [arrYear, setArrYear] = useState(() => {
    let arr = [];
    let myDate = new Date();
    let currentYear = myDate.getFullYear();
    setCurrentYear(currentYear);
    let bedoreYear = currentYear - 5;

    for (let i = bedoreYear; i <= currentYear; i++) {
      arr.push(i);
    }

    return arr;
  });
  const [currentMonth, setCurrentMonth] = useState(() => {
    let myDate = new Date();
    return myDate.getMonth() + 1;
  });
  const [arrMonth, setArrMonth] = useState([
    { value: 1, label: 'มกราคม' },
    { value: 2, label: 'กุมภาพันธ์' },
    { value: 3, label: 'มีนาคม' },
    { value: 4, label: 'เมษายน' },
    { value: 5, label: 'พฤษภาคม' },
    { value: 6, label: 'มิถุนายน' },
    { value: 7, label: 'กรกฎาคม' },
    { value: 8, label: 'สิงหาคม' },
    { value: 9, label: 'กันยายน' },
    { value: 10, label: 'ตุลาคม' },
    { value: 11, label: 'พฤศจิกายน' },
    { value: 12, label: 'ธันวาคม' },
  ]);

  const handleShowReport = async (report) => {
    try {
      await axios
        .get(
          `${config.api_path}/billSale/listByYearAndMonth/${currentYear}/${currentMonth}`,
          config.headers()
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.results);
          }
        })
        .catch((err) => {
          throw err.response.data;
        });
    } catch (error) {
      Swal.fire({
        title: 'error',
        text: error.message,
        icon: 'error',
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <Template>
        <div className="card">
          <h5 className="card-header">รายงานสรุปขายรายวัน</h5>
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <label
                      className="input-group-text"
                      for="inputGroupSelectYear"
                    >
                      ปี
                    </label>
                  </div>
                  <select
                    className="form-control"
                    id="inputGroupSelectYear"
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value)}
                  >
                    {arrYear.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <label
                      className="input-group-text"
                      for="inputGroupSelectMonth"
                    >
                      เดือน
                    </label>
                  </div>
                  <select
                    className="form-control"
                    id="inputGroupSelectMonth"
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(e.target.value)}
                  >
                    {arrMonth.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <button className="btn btn-primary" onClick={handleShowReport}>
                  <i className="fa fa-check mr-2"></i>แสดงรายการ
                </button>
              </div>
            </div>
          </div>
        </div>
      </Template>
    </div>
  );
}

export default SumSalePerDay;