import City0 from "@/components/maps/City0";
import City1 from "@/components/maps/City1";
import City2 from "@/components/maps/City2";
import City3 from "@/components/maps/City3";
export const CITY_NAMES = {
  CITY_0: "Washington, D.C.",
  CITY_1: "Akron",
  CITY_2: "Houston",
  CITY_3: "Blacksburg",
};

export const cities = [
  { id: "city0", label: CITY_NAMES.CITY_0, component: City0 },
  { id: "city1", label: CITY_NAMES.CITY_1, component: City1 },
  { id: "city2", label: CITY_NAMES.CITY_2, component: City2 },
  { id: "city3", label: CITY_NAMES.CITY_3, component: City3 },
];
