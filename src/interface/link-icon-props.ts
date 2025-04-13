export interface LinkIconProps {
  icon: React.ReactNode;
  text: string;
  link?: string;
  textColor: string;
  bgColor: string;
  onClick?: () => void;
}
