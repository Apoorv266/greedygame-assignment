import React from 'react'

const DateSelector = (props) => {
    return (
        <form
          className="inputs-wrapper border rounded"
          onSubmit={props.handleSubmit}
        >
          <div className="w-100">
            <div className="label-container w-100">
              <label htmlFor="from">From Date</label>
            </div>
            <input
              type="date"
              id="datemax"
              className="w-100"
              name="datemax"
              min="2021-06-01"
              max="2021-06-30"
              onChange={(e) => props.setStartDateRange(e.target.value)}
            />
          </div>
          <div className="w-100">
            <div className="label-container w-100">
              <label htmlFor="to">To Date</label>
            </div>
    
            <input
              type="date"
              id="datemax"
              name="datemax"
              min="2021-06-01"
              max="2021-06-30"
              className="w-100"
              onChange={(e) => props.setEndDateRange(e.target.value)}
            />
          </div>
          <div className="filter-footer">
            <button
              className="secondary-button"
              onClick={() => props.setShowDatePicker(false)}
            >
              Cancel
            </button>
            <button className="primary-button">Search</button>
          </div>
        </form>
      );
}

export default DateSelector