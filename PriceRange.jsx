import React, { useCallback, useEffect, useState, useRef } from "react";

const cssValues = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  gap: "2px",
  paddingTop: "10px"
};

const PriceRange = ({
  min,
  max,
  trackColor = "#cecece",
  onChange,
  rangeColor = "#ff0303",
  ValueStyle = cssValues,
  width = "200px",
  currencyText = "$",
}) => {
  const [minval, setMinval] = useState(min);
  const [maxval, setMaxval] = useState(max);

  const minvalRef = useRef(min);
  const maxvalRef = useRef(max);
  const range = useRef(null);

  // convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minval);
    const maxPercent = getPercent(maxvalRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minval, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minvalRef.current);
    const maxPercent = getPercent(maxvalRef.current);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxval, getPercent]);

  // onChange callback
  useEffect(() => {
    if (
      minval !== minvalRef.current ||
      maxval !== maxvalRef.current
    ) {
      onChange?.({ min: minval, max: maxval });
      minvalRef.current = minval;
      maxvalRef.current = maxval;
    }
  }, [minval, maxval, onChange]);

  return (
    <div className="border w-60 m-2 border-amber-400 rounded ">
    <div className="w-full   flex items-center justify-center flex-col space-y-4">
      <div className="w-[200px] mr-auto  px-4 flex items-center justify-between gap-x-5">
        <p className="text-xl  text-green-400 font-semibold">
          {currencyText} {minval}
        </p>

        <p className="text-xl text-green-400 font-semibold">
          {currencyText} {maxval}
        </p>
      </div>

      <div className="price_range_slider relative mr-auto m-2" style={{ width }}>
        <input
          type="range"
          min={min}
          max={max}
          value={minval}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxval - 1);
            setMinval(value);
          }}
          className="thumb thumb-left absolute"
          style={{
            width,
            zIndex: minval >= maxval - 1 ? 5 : 3,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={maxval}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minval + 1);
            setMaxval(value);
          }}
          className="thumb thumb-right absolute"
          style={{
            width,
            zIndex: 4,
          }}
        />

        <div className="slider relative w-full h-1 mt-4">
          <div
            className="track-slider absolute h-full rounded"
            style={{ background: trackColor, width: "100%" }}
          ></div>

          <div
            ref={range}
            className="range-slider absolute h-full rounded"
            style={{ background: rangeColor }}
          ></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PriceRange;
