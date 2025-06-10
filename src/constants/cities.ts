import City1 from "@/components/maps/City1";
import City2 from "@/components/maps/City2";
import City3 from "@/components/maps/City3";
export const CITY_NAMES = {
  CITY_1: "Akron",
  CITY_2: "Houston",
  CITY_3: "Wichita",
};

export const cities = [
  { id: "city1", label: CITY_NAMES.CITY_1, component: City1 },
  { id: "city2", label: CITY_NAMES.CITY_2, component: City2 },
  { id: "city3", label: CITY_NAMES.CITY_3, component: City3 },
];
