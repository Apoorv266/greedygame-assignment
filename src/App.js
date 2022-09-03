import React, { useState, useEffect } from "react";
import DateSelector from "./DateSelector";

const App = () => {
  const [data2, setData2] = useState([]);
  const [app, setApp] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: "2021-06-06",
    to: "2021-06-09",
  });
  const getData = async () => {
    let url = `http://go-dev.greedygame.com/v3/dummy/report?startDate=${dateRange.from}&endDate=${dateRange.to}`;
    let url2 = `http://go-dev.greedygame.com/v3/dummy/apps`;

    try {
      const res = await fetch(url);
      const dataset = await res.json();

      const res2 = await fetch(url2);
      const dataset2 = await res2.json();

      setData2(dataset.data);
      setApp(dataset2.data);
    } catch (error) {
      console.log(error);
    }
  };

  function matchID(data2, app) {
    for (let i = 0; i < data2.length; i++) {
      for (let j = 0; j < app.length; j++) {
        if (data2[i].app_id === app[j].app_id) {
          data2[i]["appname"] = app[j].app_name;
          data2[i]["number"] = i + 1
        }
      }
    }
  }

  matchID(data2, app);

  useEffect(() => {
    getData();
  }, []);


  // console.log(data2);

  const DisplayData = data2.map((item, index) => {
    return (
      <tr key={index}>
        {/* <td>{data2.number}</td> */}
        <td>{new Date(item.date).toDateString()}</td>
        <td>{item.appname}</td>
        <td>{item.requests.toLocaleString()}</td>
        <td>{item.responses.toLocaleString()}</td>
        <td>{`$${item.revenue.toFixed(2)}`}</td>
      </tr>
    );
  });

  function handleSubmit(e) {
    console.log(dateRange.from, dateRange.to)
    console.log(data2);
    e.preventDefault();
    getData(dateRange)
  }

  return (
    <>
      <div className="heading">
        <h2 className="title">Analytics</h2>
        <div className="analytics-header-bar">
          <button
            className="date-picker options-button border rounded "
            onClick={() => setShowDatePicker(true)}
          >
            Date Picker
          </button>

          <DateSelector
            handleSubmit={handleSubmit}
            setStartDateRange={(value) =>
              setDateRange({ ...dateRange, from: value })
            }
            setEndDateRange={(value) =>
              setDateRange({ ...dateRange, to: value })
            }
          />

          {/* {showDatePicker && <DateSelector/>} */}
        </div>
      </div>
      <div>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Date</th>
              <th>App</th>
              <th>Clicks</th>
              <th>Requests</th>
              <th>Revenue</th>
              {/* <th>Fill rate</th>
              <th>CTR</th> */}
            </tr>

            <tr>
              {/* <th>S. no</th> */}
              <th>
                {" "}
                <h5>{data2.length}</h5>
              </th>
              <th>
                <h5>{app.length}</h5>
              </th>
              <th>{`${data2
                .reduce((a, v) => (a = a + v.clicks), 0)
                .toString()
                .slice(0, 2)} M`}</th>
              <th>{`${data2
                .reduce((a, v) => (a = a + v.requests), 0)
                .toString()
                .slice(0, 2)} M`}</th>
              <th>{`$${data2
                .reduce((a, v) => (a = a + v.revenue), 0)
                .toFixed(2)}`}</th>
              {/* <th>Fill rate</th>
              <th>CTR</th> */}
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>
      </div>
    </>
  );
};

export default App;
