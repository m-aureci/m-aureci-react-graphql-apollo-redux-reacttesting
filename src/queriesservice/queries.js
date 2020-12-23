import { gql } from '@apollo/client';

// Mapa mostrando a distância entre o país e os 5 países mais próximos.
export const SHORTESTS_COUNTRIES_DISTANCE = gql`
  query ShortetsCountries($countries: [String!]!) {
    countries: Country(filter:{ name_in: $countries}) {
      _id,
      name,
      location {
        longitude,
        latitude
      }
    }
    }
`;

export const GETDATA = gql`
  query {
    Country {
       _id,
      capital,
      nameTranslations(filter: { languageCode_in: ["pt"]}) {
        value
      },
      flag {
        svgFile
      },
      area,
      population,
      topLevelDomains {
        name
      },
      location {
        longitude,
        latitude,
        x,
        y
      },
      distanceToOtherCountries(first: 5) {
        countryName,
        distanceInKm
      }
    }
  }
`;

// Lista de países.
export const LIST = gql`
  query {
    list @client
  }
`;

// Detalhes dos países.
export const DETAILS = gql`
  query {
    details
  }
`;
