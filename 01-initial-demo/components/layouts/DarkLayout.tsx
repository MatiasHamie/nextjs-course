import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const DarkLayout: FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "gray",
        borderRadius: "5px",
        padding: "100px",
      }}
    >
      <h3>DarkLayout</h3>
      {children}
    </div>
  );
};
