export interface LinkIconProps {
  icon: React.ReactNode;
  text: string;
  link?: string;
  textColor: string;
  bgColor: string;
  handleNavigate?: (e: React.MouseEvent) => void;
}
