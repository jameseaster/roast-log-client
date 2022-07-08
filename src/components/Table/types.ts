export interface ITableProps {
  rows: IRoast[];
}

export interface IRoast {
  id: number;
  date: string;
  time: string;
  region: string;
  process: string;
  country: string;
  cool_down: string;
  vac_to_250: number;
  user_email: string;
  first_crack: string;
  green_weight: number;
  roast_number: number;
  roasted_weight: number;
}
