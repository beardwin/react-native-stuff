import { Pressable } from "react-native";
import { Row } from "./Row";
import { Link } from "expo-router";
import { LinkProps } from "expo-router/build/link/Link";

interface Props extends Omit<LinkProps, "asChild"> {
  description?: string;
  children: string;
}

export const RowLink = ({ description, children, ...props }: Props) => {
  return (
    <Link {...props} asChild>
      <Pressable>
        {({ pressed }) => (
          <Row title={children} description={description} pressed={pressed} />
        )}
      </Pressable>
    </Link>
  );
};
