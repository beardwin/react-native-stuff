import { Pressable } from "react-native";
import { Row } from "./Row";
import { Link } from "expo-router";
import { LinkProps } from "expo-router/build/link/Link";

interface Props extends Omit<LinkProps, "asChild"> {
  children: string;
}

export const RowLink = ({ children, ...props }: Props) => {
  return (
    <Link {...props} asChild>
      <Pressable>
        {({ pressed }) => <Row description={children} pressed={pressed} />}
      </Pressable>
    </Link>
  );
};
