export interface LinkIconProps {
  icon: React.ReactNode;
  text: string;
  link?: string;
  textColor: string;
  bgColor: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
  ) => void;
}
