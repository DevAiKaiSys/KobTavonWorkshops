import React, { useEffect, useState } from 'react';
import Template from './Template';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../config';
import dayjs from 'dayjs';
import Modal from '../components/Modal';

function ReportSumSalePerMonth() {
  const [years, setYears] = useState(() => {
    let arr = [];
    let d = new Date();
    let currentYear = d.getFullYear();
    let lastYear = currentYear - 5;

    for (let i = lastYear; i <= currentYear; i++) {
      arr.push(i);
    }

    return arr;
  });
  const [selectedYear, setSelectedYear] = useState(() => {
    return new Date().getFullYear();
  });
  const [arrMonths, setArrMonths] = useState([
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ]);
  const [results, setResults] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const payload = {
        year: selectedYear,
      };
      await axios
        .post(
          `${config.api_path}/changePackage/reportSumSalePerMonth`,
          payload,
          config.headers()
        )
        .then((res) => {
          if (res.status === 200) {
            setResults(res.data.results);
          }
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
    <>
      <Template>
        <div className="card">
          <h5 className="card-header">รายงานสรุปยอดขายรายเดือน</h5>
          <div className="card-body">
            <div className="input-group">
              <span className="input-group-text">ปี</span>
              <select
                name=""
                id=""
                className="form-control"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary" onClick={fetchData}>
                <i className="fa fa-check me-2"></i>แสดงรายการ
              </button>
            </div>

            <table className="mt-3 table table-bordered table-striped">
              <thead>
                <tr>
                  <th width="200px">เดือน</th>
                  <th className="text-end">ยอดขาย</th>
                  <th width="200px"></th>
                </tr>
              </thead>
              <tbody>
                {results.length > 0 &&
                  arrMonths &&
                  results.map((item, index) => (
                    <tr key={index}>
                      <td>{arrMonths[item.month - 1]}</td>
                      <td className="text-end">
                        {parseInt(item.sum).toLocaleString('th-TH')}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-success"
                          data-bs-toggle="modal"
                          data-bs-target="#modalInfo"
                          onClick={() => setSelectedMonth(item)}
                        >
                          <i className="fa fa-file-alt me-2"></i>แสดงรายการ
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Template>

      <Modal id="modalInfo" title="แสดงรายการ" modalSize="modal-lg">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>วันที่สมัคร</th>
              <th>วันที่ชำระเงิน</th>
              <th>ผู้สมัคร</th>
              <th>package</th>
              <th>ค่าบริการรายเดือน</th>
            </tr>
          </thead>
          <tbody>
            {selectedMonth?.results?.length > 0 &&
              selectedMonth.results.map((item, index) => (
                <tr key={index}>
                  <td>{dayjs(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                  <td>
                    {dayjs(item.payDate).format('DD/MM/YYYY')} {item.payHour}:
                    {item.payMinute}
                  </td>
                  <td>{item.member.name}</td>
                  <td>{item.package.name}</td>
                  <td className="text-end">
                    {parseInt(item.package.price).toLocaleString('th-TH')}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
}

export default ReportSumSalePerMonth;
