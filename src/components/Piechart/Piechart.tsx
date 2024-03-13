import { Text } from "react-native";

export interface Segment {
  id: string;
  label: string;
  portion: number;
}

interface Props {
  segments: Segment[];
}

export const Piechart = ({ id, label, portion }: Props) => {
  return <Text>Piechart</Text>;
};
