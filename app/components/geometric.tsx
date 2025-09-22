import { Link, type LinkProps } from "react-router";
import "./geometric.css";

const container = ({ children }: { children: React.ReactNode }) => (
  <div className="main-timeline-geo">{children}</div>
);

interface ItemProps {
  date: string;
  title: string;
  description: string;
  component?: React.ComponentType<any>;
  to: LinkProps["to"];
}

const item = ({
  date,
  title,
  description,
  component: Component,
  ...other
}: ItemProps) =>
  Component ? (
    <Component className="timeline-geo" {...other}>
      <div className="timeline-geo-icon" />
      <div className="timeline-geo-content">
        <span className="date">{date}</span>
        <h5 className="title">{title}</h5>
        <p className="description">{description}</p>
      </div>
    </Component>
  ) : (
    <Link
      className="timeline-geo"
      key={date || title || description}
      {...other}
    >
      <div className="timeline-geo-icon" />
      <div className="timeline-geo-content">
        <span className="date">{date}</span>
        <h5 className="title">{title}</h5>
        <p className="description">{description}</p>
      </div>
    </Link>
  );

export default {
  Container: container,
  Item: item,
};
