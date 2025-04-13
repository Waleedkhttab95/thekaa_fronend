import { getCountries, getGradeLevels, getSubjects } from "@/services/content";
import { Locales } from "@/types/locales.enum";
import { useQuery } from "@tanstack/react-query";

const SUBJECTS_QUERY = "subjects";
const GRADE_QUERY = "grade-levels";
const COUNTRIES_QUERY = "countries";

export const useSubjects = (locale: Locales) => {
  return useQuery({
    queryKey: [SUBJECTS_QUERY, locale],
    queryFn: () => getSubjects(locale),
    staleTime: 1000 * 60 * 15,
  });
};
export const useGradeLevels = (locale: Locales) => {
  return useQuery({
    queryKey: [GRADE_QUERY, locale],
    queryFn: () => getGradeLevels(locale),
    staleTime: 1000 * 60 * 15,
  });
};
export const useCountries = (locale: Locales) => {
  return useQuery({
    queryKey: [COUNTRIES_QUERY, locale],
    queryFn: () => getCountries(locale),
    staleTime: 1000 * 60 * 15,
  });
};
