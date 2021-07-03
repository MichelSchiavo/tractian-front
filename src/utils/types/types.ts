export type AssetsProps = {
  id: number;
  sensors: [
    string
  ];
  model: string;
  status: string;
  healthscore: number;
  name: string;
  image: string;
  specifications: {
    power: number;
    maxTemp: number;
    rpm?: number;
  };
  metrics: {
    totalCollectsUptime: number;
    totalUptime: number;
    lastUptimeAt: string;
  };
  unitId: number;
  companyId: number;
}

export type CompanyProps = {
  id: number;
  name: string;
}

export type UnitProps = {
  id: number;
  name: string;
  companyId: number;
}

export type userProps = {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
}