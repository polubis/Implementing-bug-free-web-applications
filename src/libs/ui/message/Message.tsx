import css from "./Message.module.scss";

interface MessageProps {
  content: string;
}

export const Message = ({ content }: MessageProps) => {
  return <div className={css.message}>{content}</div>;
};
