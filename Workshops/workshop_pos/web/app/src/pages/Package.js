import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function Package() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios
        .get(config.api_path + '/package/list')
        .then((res) => {
          setPackages(res.data.results);
        })
        .catch((err) => {
          throw err.response.data;
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="container mt-2">
        <div className="h2 text-secondary">KobPOS : Point of Sale on Cloud</div>
        <div className="h5">Package for You</div>
        <div className="row">
          {packages.map((item, index) => (
            <div className="col-4" key={index}>
              {/* <div>name</div>
              <div>bill per month</div>
              <div>price</div>
              <div className="mt-3">
                <button className="btn btn-primary">สมัคร</button>
              </div> */}
              <div className="card">
                <div className="card-body text-center">
                  <div className="h4 text-success">{item.name}</div>
                  <div className="h5">
                    {parseInt(item.bill_amount).toLocaleString('th-TH')} &nbsp;
                    บิลต่อเดือน
                  </div>
                  <div className="h5 text-secodary">
                    {parseInt(item.price).toLocaleString('th-TH', {
                      style: 'currency',
                      currency: 'THB',
                    })}
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary">สมัคร</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>{' '}
      </div>
    </div>
  );
}

export default Package;