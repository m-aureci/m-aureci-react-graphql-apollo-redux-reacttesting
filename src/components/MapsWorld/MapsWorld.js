// Responsável pelo Mapa na página de detalhe do país. Criado a partir do "google-map-react".
// Apresenta o Google Maps com cinco marcações dos países mais próximos do país selecionado.
import GoogleMapReact from "google-map-react";
import { useLazyQuery } from "@apollo/client";
import { SHORTESTS_COUNTRIES_DISTANCE } from '../../queriesservice/queries';
import React, { useEffect, useState } from "react";
import { WorldmapContainer } from './styles';
import Pointer from "../Pointer/Pointer";
import Message from '../Message/Message';


export default function MapsWorld({ selectedCountry }) {

  const [shortestsCountries, setShortestsCountries] = useState([]);

  const [coordinates] = useState([

    selectedCountry.location.latitude,
    selectedCountry.location.longitude
  ]);

  const [loadShortestsCountryLocation, { loading, error, data }] = useLazyQuery(

    SHORTESTS_COUNTRIES_DISTANCE
  );


  useEffect(() => {

    const names = selectedCountry.distanceToOtherCountries.map(country => {

      return country.countryName;
    });

    loadShortestsCountryLocation({ variables: { countries: names } });

  }, [loadShortestsCountryLocation, selectedCountry.distanceToOtherCountries]);


  useEffect(() => {

    if (data) {

      const countriesWithDistance = data.countries.map(

        countryWithoutDistance => {

          const country = selectedCountry.distanceToOtherCountries.find(

            countryDistance =>
              countryWithoutDistance.name === countryDistance.countryName
          );

          return Object.assign({}, countryWithoutDistance, {

            distanceInKm: country ? country.distanceInKm : 0
          });
        }
      );

      setShortestsCountries(countriesWithDistance);
    }

  }, [data, selectedCountry.distanceToOtherCountries]);


  // Tratamento de menssagens de usuário para os estados da página.
  if (error) return <Message>Falha :(</Message>;
  if (loading) return <Message>Carregando...</Message>;
 
  //if (loading) return <p>Loading</p>;
  //if (error) return <p role="alert">Error</p>;


  return (

    <WorldmapContainer data-testid="MapsWorld">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
        defaultCenter={coordinates}
        defaultZoom={4}
        yesIWantToUseGoogleMapApiInternals
      >
        {shortestsCountries.map((country, index) => {
          return (
            <Pointer
              key={index}
              lat={country.location.latitude}
              lng={country.location.longitude}
              text={country.distanceInKm}
            />
          );
        })}
      </GoogleMapReact>
    </WorldmapContainer>

  );

}
