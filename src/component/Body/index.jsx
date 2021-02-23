import React, { useEffect, useState } from 'react';
import './Body.scss';
import Chart from './Chart';
import Search from './Search';

import DATA from '../../constants/data.json';
import DATE from '../../constants/DateTime';

Body.propTypes = {

};

function Body(_props) {
  const [change, setChange] = useState(false);

  const [data, setData] = useState(DATA.data);
  const [data1, setData1] = useState(DATA.data1);
  const [data2, setData2] = useState(DATA.data2);

  function randomDate() {
    const week = DATE;
    const date = week[data.length % week.length];
    return date;
  }

  function randomData() {
    return Math.trunc(Math.random() * 100);
  }

  const handleAddData = () => {
    let newData = [...data];
    let newData1 = [...data1]
    let newData2 = [...data2]

    const newPoint = {
      date: randomDate(),
      quantity: randomData(),
    }
    newData.push(newPoint);
    setData(newData);

    const newPoint1 = {
      date: randomDate(),
      quantity: randomData(),
    }
    newData1.push(newPoint1);
    setData1(newData1);

    const newPoint2 = {
      date: randomDate(),
      quantity: randomData(),
    }
    newData2.push(newPoint2);
    setData2(newData2);
  }

  const handleRemoveData = () => {
    const newData = [...data];
    newData.pop();
    setData(newData);

    const newData1 = [...data1];
    newData1.pop();
    setData1(newData1);

    const newData2 = [...data2];
    newData2.pop();
    setData2(newData2);
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
        <Chart data={data} data1={data1} data2={data2} />
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
