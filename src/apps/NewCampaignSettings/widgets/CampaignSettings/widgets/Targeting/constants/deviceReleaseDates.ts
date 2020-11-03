export const deviceReleaseDates: Array<{
  value: number;
  label: string;
  isDefault: boolean;
}> = [
  {
    value: 0,
    label: 'Any',
    isDefault: true,
  },
  {
    value: 3,
    label: '3 months',
    isDefault: false,
  },
  {
    value: 6,
    label: '6 months',
    isDefault: false,
  },
  {
    value: 12,
    label: '12 months',
    isDefault: false,
  },
  {
    value: 24,
    label: '24 months',
    isDefault: false,
  },
];
