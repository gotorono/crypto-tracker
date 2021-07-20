import React from "react";

const HourChangeContext = React.createContext();

function HourChange(props) {
  const up = props.change < 0;

  const value = React.useMemo(() => ({ up }), [up]);

  return (
    <div className="hourChange">
      <HourChangeContext.Provider value={value}>
        {props.children}
      </HourChangeContext.Provider>
    </div>
  );
}

function useHourChangeContext() {
  const context = React.useContext(HourChangeContext);
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`
    );
  }
  return context;
}

function Up({ children }) {
  const { up } = useHourChangeContext();
  return up ? children : null;
}

function Down({ children }) {
  const { up } = useHourChangeContext();
  return up ? null : children;
}

HourChange.Up = Up;
HourChange.Down = Down;

export default HourChange;
