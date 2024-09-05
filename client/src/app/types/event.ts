export interface IEvent {
  uuid: string;
  title: string;
  description?: string;
  category: string;
  membersAmount: number;
  location: string | [number, number];
  date: string;
}
