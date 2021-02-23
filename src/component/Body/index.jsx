import React, { useEffect, useState } from 'react';
import './Body.scss';
import Chart from './Chart';
import Search from './Search';

import DATA from '../../constants/data.json';
import { nextDate } from '../../constants/DateTime';

Body.propTypes = {
};

function Body(_props) {
  const [change, setChange] = useState(false);

  const [dataQuantity, setDataQuantity] = useState(DATA.dataQuantity);

  function randomData() {
    return Math.trunc(Math.random() * 100);
  }

  const handleAddData = () => {
    const dataSample = dataQuantity[0];
    const lastDate = dataSample.data[dataSample.data.length - 1].date;
    setDataQuantity(
      dataQuantity.map((item) =>
        ({
          name: item.name,
          data: [
            ...item.data,
            {
              date: nextDate(lastDate),
              quantity: randomData(),
            }
          ]
        })
      )
    );
  }

  const handleRemoveData = () => {
    setDataQuantity(
      dataQuantity.map((item) => {
        const newData = [...item.data];
        newData.pop();
        return {
          name: item.name,
          data: newData
        };
      })
    );
  }

  useEffect(() => {
    const useInterval = setInterval(() => {
      if (change) {
        handleAddData();
      }
      else {
        clearInterval(useInterval);
      }
    }, 1000);

    return () => {
      clearInterval(useInterval);
    }
  });

  return (
    <div className="s__body">
      <div className="body">
        <Search />
        <Chart
          data={dataQuantity}
        />
      </div>
      <div className="footer">
        <button className={`btn ${change ? 'disabled' : ''}`} onClick={handleAddData}>Add</button>
        <button className="btn" onClick={() => setChange(prevChange => !prevChange)}>{change ? 'Stop' : 'Add Interval'}</button>
        <button className={`btn ${change ? 'disabled' : ''}`} onClick={handleRemoveData} color="danger">Remove</button>
      </div>
    </div>
  );
}

export default Body;
